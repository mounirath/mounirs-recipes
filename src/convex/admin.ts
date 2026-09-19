import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx, mutation, query } from "./_generated/server";
import { categoryValidator } from "./schema";

/** The single admin account, identified by email. */
export const ADMIN_EMAIL = "mounirathdz@gmail.com";

/** Returns the signed-in user's email, or null. */
async function getCurrentUserEmail(ctx: QueryCtx): Promise<string | null> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) return null;
  const user = await ctx.db.get(userId);
  return user?.email ?? null;
}

/** True only if the signed-in user is the designated admin. */
async function isAdmin(ctx: QueryCtx): Promise<boolean> {
  const email = await getCurrentUserEmail(ctx);
  return email !== null && email.trim().toLowerCase() === ADMIN_EMAIL;
}

/** Whether the current signed-in user is the admin (for the UI). */
export const checkIsAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return false;
    return await isAdmin(ctx);
  },
});

/* ----------------------------- Recipe CRUD ----------------------------- */

export const listAllRecipes = query({
  args: {},
  handler: async (ctx) => {
    if (!(await isAdmin(ctx))) return null;
    return await ctx.db.query("recipes").withIndex("by_category").collect();
  },
});

export const createRecipe = mutation({
  args: {
    title: v.string(),
    category: categoryValidator,
    percentages: v.string(),
    steps: v.string(),
    warnings: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx))) throw new Error("غير مصرح");
    return await ctx.db.insert("recipes", args);
  },
});

export const updateRecipe = mutation({
  args: {
    id: v.id("recipes"),
    title: v.string(),
    category: categoryValidator,
    percentages: v.string(),
    steps: v.string(),
    warnings: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx))) throw new Error("غير مصرح");
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const deleteRecipe = mutation({
  args: { id: v.id("recipes") },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx))) throw new Error("غير مصرح");
    await ctx.db.delete(args.id);
  },
});

/* ----------------------------- Access codes ----------------------------- */

const CODE_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateRandomCode(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let code = "";
  for (const b of bytes) {
    code += CODE_ALPHABET[b % CODE_ALPHABET.length];
  }
  return code;
}

/** Generate a unique 8-character access code (digits + latin letters). */
export const generateAccessCode = mutation({
  args: { note: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx))) throw new Error("غير مصرح");
    let code = generateRandomCode();
    // Ensure uniqueness against existing codes
    for (let i = 0; i < 5; i++) {
      const existing = await ctx.db
        .query("accessCodes")
        .withIndex("by_code", (q) => q.eq("code", code))
        .first();
      if (!existing) break;
      code = generateRandomCode();
    }
    const id = await ctx.db.insert("accessCodes", {
      code,
      note: args.note?.trim() || undefined,
    });

    return code;
  },
});

/** List all access codes, newest first. */
export const listAccessCodes = query({
  args: {},
  handler: async (ctx) => {
    if (!(await isAdmin(ctx))) return null;
    return await ctx.db.query("accessCodes").collect();
  },
});

/** Delete an access code. */
export const deleteAccessCode = mutation({
  args: { id: v.id("accessCodes") },
  handler: async (ctx, args) => {
    if (!(await isAdmin(ctx))) throw new Error("غير مصرح");
    await ctx.db.delete(args.id);
  },
});

/* ----------------------------- Subscribers ----------------------------- */

/** All registered users (subscribers), newest first. */
export const listSubscribers = query({
  args: {},
  handler: async (ctx) => {
    if (!(await isAdmin(ctx))) return null;
    const users = await ctx.db.query("users").collect();
    return users
      .filter((u) => !u.isAnonymous)
      .map((u) => ({
        _id: u._id,
        email: u.email ?? null,
        name: u.name ?? null,
        _creationTime: u._creationTime,
      }))
      .sort((a, b) => b._creationTime - a._creationTime);
  },
});
