/**
 * Chargily webhook handler — default V8 runtime.
 * Verifies the HMAC-SHA256 signature over the raw body using the global
 * Web Crypto API (crypto.subtle), then activates the subscription for
 * verified "checkout.paid" events.
 * Registered in http.ts under POST /webhooks/chargily.
 */

import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const encoder = new TextEncoder();

function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

async function isValidSignature(
  payload: string,
  signature: string,
  secretKey: string,
): Promise<boolean> {
  if (!signature || !secretKey) return false;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secretKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const computed = Array.from(new Uint8Array(mac))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return bytesEqual(hexToBytes(computed), hexToBytes(signature));
  } catch {
    return false;
  }
}

type Pkg = "home" | "cars" | "all";
type Duration = "month" | "year" | "lifetime";

export const chargilyWebhook = httpAction(
  async (ctx, request) => {
    const secret = process.env.CHARGILY_WEBHOOK_SECRET;
    if (!secret) {
      return new Response("Webhook not configured", { status: 500 });
    }

    const signature = request.headers.get("signature");
    const rawBody = await request.text();
    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    if (!(await isValidSignature(rawBody, signature, secret))) {
      return new Response("Invalid signature", { status: 403 });
    }

    let event: {
      type?: string;
      data?: {
        id?: string;
        status?: string;
        metadata?: Record<string, string>;
        amount?: number;
        customer?: { email?: string };
      };
    };
    try {
      event = JSON.parse(rawBody);
    } catch {
      return new Response("Bad payload", { status: 400 });
    }

    if (event.type === "checkout.paid" && event.data?.id) {
      const meta = event.data.metadata ?? {};
      const email = meta.email ?? event.data.customer?.email;
      const pkg = meta.pkg as Pkg | undefined;
      const duration = meta.duration as Duration | undefined;
      const validPkg: Pkg[] = ["home", "cars", "all"];
      const validDuration: Duration[] = ["month", "year", "lifetime"];
      if (
        email &&
        pkg &&
        duration &&
        validPkg.includes(pkg) &&
        validDuration.includes(duration)
      ) {
        await ctx.runMutation(internal.payments.applyPaidSubscription, {
          email,
          pkg,
          duration,
          checkoutId: event.data.id,
          amount: event.data.amount ?? 0,
        });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },
);
