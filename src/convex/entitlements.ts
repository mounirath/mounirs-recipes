import type { QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { ADMIN_EMAIL } from "./admin";

export type Pkg = "home" | "cars" | "all";

/** Map subscription package → allowed recipe categories. */
export function categoriesForPkg(pkg: Pkg): string[] {
  if (pkg === "home") return ["cleaners", "natural"];
  if (pkg === "cars") return ["cars"];
  return ["cleaners", "cars", "natural"]; // "all"
}

/**
 * Returns the effective package for a signed-in user:
 * - admin: always "all"
 * - active subscription: its package
 * - redeemed access code (legacy/simple access): "all"
 * - otherwise: null (no access)
 */
export async function effectivePkg(ctx: QueryCtx): Promise<Pkg | null> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) return null;
  const user = await ctx.db.get(userId);
  const email = user?.email?.trim().toLowerCase();
  if (!email) return null;

  // Admin bypasses everything
  if (email === ADMIN_EMAIL) return "all";

  // Admin-set subscription wins
  const sub = await ctx.db
    .query("subscriptions")
    .withIndex("by_email", (q) => q.eq("email", email))
    .first();
  if (sub && (sub.expiresAt === undefined || sub.expiresAt > Date.now())) {
    return sub.pkg;
  }

  // Legacy: redeemed access code grants full access
  const redeemed = await ctx.db
    .query("accessCodes")
    .withIndex("by_used_email", (q) => q.eq("usedByEmail", email))
    .first();
  if (redeemed) return "all";

  return null;
}
