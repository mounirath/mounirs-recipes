/**
 * Chargily Pay V2 integration — CIB / Edahabia automated payments.
 *
 * Flow:
 *  1. Client calls `createCheckout` (action, node) with pkg + duration.
 *  2. Action creates a Chargily checkout session and returns `checkout_url`.
 *  3. User pays on Chargily's hosted page (CIB or Edahabia card).
 *  4. Chargily calls the HTTP webhook (/webhooks/chargily, see http.ts) —
 *     the signature is verified with HMAC-SHA256 over the raw body using
 *     CHARGILY_WEBHOOK_SECRET (node runtime, see payments-node.ts).
 *  5. Verified "checkout.paid" events call `applyPaidSubscription`, which
 *     upserts the user's subscription (same table the admin uses).
 *
 * Keys are configured through the project's Keys/API keys panel:
 *  - CHARGILY_API_SECRET   (secret key from dev.chargily.com → API keys)
 *  - CHARGILY_WEBHOOK_SECRET (the same secret key, used for HMAC)
 */

import { v } from "convex/values";
import {
  action,
  internalMutation,
  query,
} from "./_generated/server";
import { internal, api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";
import { durationValidator, pkgValidator } from "./schema";

type Pkg = "home" | "cars" | "all";
type Duration = "month" | "year" | "lifetime";

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

function expiryFor(duration: Duration): number | undefined {
  const now = Date.now();
  if (duration === "month") return now + MONTH_MS;
  if (duration === "year") return now + YEAR_MS;
  return undefined; // lifetime
}

/** Public pricing mirror (must match Landing pricingOffers). */
export const pricing = {
  home: { month: 2000, year: 5000, lifetime: 15000 },
  cars: { month: 1500, year: 4000, lifetime: 15000 },
  all: { month: 2000, year: 5000, lifetime: 15000 },
} as const;

/** Product label shown on the Chargily payment page. */
const pkgLabel: Record<Pkg, string> = {
  home: "Formule DZ — Pack Détergents ménagers",
  cars: "Formule DZ — Pack Soins automobiles",
  all: "Formule DZ — Pack Toutes les recettes",
};

const SITE_URL = "https://formuledz.freebuff.app";

/** Which env keys the operator still has to fill in. */
export const configStatus = query({
  args: {},
  handler: async () => {
    return {
      apiSecretSet: !!process.env.CHARGILY_API_SECRET,
      webhookSecretSet: !!process.env.CHARGILY_WEBHOOK_SECRET,
    };
  },
});

/**
 * Creates a Chargily checkout for the signed-in user and returns the hosted
 * payment URL. Pricing is computed server-side (never trusted from client).
 */
export const createCheckout = action({
  args: { pkg: pkgValidator, duration: durationValidator },
  handler: async (ctx, args) => {
    const apiSecret = process.env.CHARGILY_API_SECRET;
    if (!apiSecret) {
      throw new Error(
        "Paiement non configuré : ajoutez CHARGILY_API_SECRET dans les clés du projet.",
      );
    }

    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Connectez-vous d'abord");
    const user = await ctx.runQuery(api.users.currentUser, {});
    const email = user?.email?.trim().toLowerCase();
    if (!email) throw new Error("Compte sans e-mail — contactez le support");

    const amount = pricing[args.pkg][args.duration];
    const lifetime = args.duration === "lifetime";

    // Chargily REST call (kept dependency-free; the official SDK's browser
    // build cannot run inside the Convex action runtime reliably).
    const res = await fetch("https://pay.chargily.net/test/v2/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "dzd",
        success_url: `${SITE_URL}/payment/success`,
        failure_url: `${SITE_URL}/payment/success?failed=1`,
        payment_method: "edahabia",
        locale: "ar",
        metadata: {
          email,
          userId,
          pkg: args.pkg,
          duration: args.duration,
        },
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Chargily error ${res.status}: ${detail.slice(0, 200)}`);
    }
    const data = (await res.json()) as { checkout_url?: string; id?: string };
    if (!data.checkout_url) throw new Error("Chargily: no checkout_url");

    await ctx.runMutation(internal.payments.recordPendingPayment, {
      email,
      pkg: args.pkg,
      duration: args.duration,
      amount,
      lifetime,
      checkoutId: data.id ?? "",
    });

    return data.checkout_url;
  },
});

/** Journal row created when the checkout session is issued. */
export const recordPendingPayment = internalMutation({
  args: {
    email: v.string(),
    pkg: pkgValidator,
    duration: durationValidator,
    amount: v.number(),
    lifetime: v.boolean(),
    checkoutId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("payments", {
      email: args.email,
      pkg: args.pkg,
      duration: args.duration,
      amount: args.amount,
      currency: "dzd",
      checkoutId: args.checkoutId,
      status: "pending",
      paidAt: Date.now(),
    });
  },
});

/** Applies a verified paid checkout: upserts the subscription. */
export const applyPaidSubscription = internalMutation({
  args: {
    email: v.string(),
    pkg: pkgValidator,
    duration: durationValidator,
    checkoutId: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    const expiresAt = expiryFor(args.duration);

    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      // Extend from the later of (now, current expiry) for paid renewals.
      const base =
        existing.expiresAt && existing.expiresAt > Date.now()
          ? existing.expiresAt
          : Date.now();
      const renewed =
        args.duration === "month"
          ? base + MONTH_MS
          : args.duration === "year"
            ? base + YEAR_MS
            : undefined;
      await ctx.db.patch(existing._id, {
        pkg: args.pkg,
        duration: args.duration,
        expiresAt: renewed,
        updatedAt: Date.now(),
        updatedBy: "chargily",
      });
    } else {
      await ctx.db.insert("subscriptions", {
        email,
        pkg: args.pkg,
        duration: args.duration,
        expiresAt,
        updatedAt: Date.now(),
        updatedBy: "chargily",
      });
    }

    await ctx.db.insert("payments", {
      email,
      pkg: args.pkg,
      duration: args.duration,
      amount: args.amount,
      currency: "dzd",
      checkoutId: args.checkoutId,
      status: "paid",
      paidAt: Date.now(),
    });
  },
});


