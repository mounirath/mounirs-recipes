import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { effectivePkg } from "./entitlements";

/**
 * Access gating combines: admin-set subscriptions (package + duration) and
 * legacy redeemed access codes (full access).
 */

/** Whether the current user has any active entitlement (and its package). */
export const status = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return { hasAccess: false, signedIn: false, pkg: null };
    const pkg = await effectivePkg(ctx);
    return { hasAccess: pkg !== null, signedIn: true, pkg };
  },
});

/** Check a code without redeeming it. */
export const validate = mutation({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("سجّل الدخول أولاً");
    const user = await ctx.db.get(userId);
    const email = user?.email;
    if (!email) throw new Error("تعذّر التحقق من حسابك");

    // Already redeemed by this account?
    const already = await ctx.db
      .query("accessCodes")
      .withIndex("by_used_email", (q) => q.eq("usedByEmail", email))
      .first();
    if (already) return { ok: true as const, message: "لديك وصول بالفعل" };

    const normalized = args.code.trim().toUpperCase();
    const record = await ctx.db
      .query("accessCodes")
      .withIndex("by_code", (q) => q.eq("code", normalized))
      .first();

    if (!record) return { ok: false as const, message: "الكود غير صحيح" };
    if (record.usedByEmail && record.usedByEmail !== email) {
      return { ok: false as const, message: "هذا الكود مستخدم من قبل حساب آخر" };
    }
    return { ok: true as const, message: "الكود صحيح — يمكنك المتابعة" };
  },
});

/** Redeem a valid code for the current account (one code per account). */
export const redeem = mutation({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("سجّل الدخول أولاً");
    const user = await ctx.db.get(userId);
    const email = user?.email;
    if (!email) throw new Error("تعذّر التحقق من حسابك");

    // Already has access?
    const already = await ctx.db
      .query("accessCodes")
      .withIndex("by_used_email", (q) => q.eq("usedByEmail", email))
      .first();
    if (already) return { ok: true as const, message: "لديك وصول بالفعل" };

    const normalized = args.code.trim().toUpperCase();
    const record = await ctx.db
      .query("accessCodes")
      .withIndex("by_code", (q) => q.eq("code", normalized))
      .first();

    if (!record) return { ok: false as const, message: "الكود غير صحيح" };
    if (record.usedByEmail && record.usedByEmail !== email) {
      return { ok: false as const, message: "هذا الكود مستخدم من قبل حساب آخر" };
    }

    await ctx.db.patch(record._id, {
      usedAt: Date.now(),
      usedByEmail: email,
    });
    return { ok: true as const, message: "تم تنشيط اشتراكك بنجاح" };
  },
});
