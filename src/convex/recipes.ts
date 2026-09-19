import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";

/** All recipes, ordered. Only available to registered subscribers. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null; // signed-out users see nothing
    return await ctx.db.query("recipes").withIndex("by_category").collect();
  },
});

const seedRecipes: {
  title: string;
  category: "cleaners" | "cars";
  percentages: string;
  steps: string;
  warnings?: string;
  videoUrl?: string;
  order: number;
}[] = [
  {
    title: "مطهر أسطح متعدد الاستخدامات",
    category: "cleaners",
    percentages: "ماء مقطر: 80%\nكحول إيثيلي: 19%\nزيت شجرة الشاي: 1%",
    steps: "1. أضف الماء المقطر إلى وعاء زجاجي نظيف.\n2. أضف الكحول الإيثيلي وقلّب جيداً.\n3. أضف زيت شجرة الشاي واخلط حتى يتجانس.\n4. انقل الخليط إلى زجاجة بخاخ معقمة.",
    warnings:
      "قابل للاشتعال، ابتعد عن مصادر اللهب والحرارة.\nتجنب ملامسة العين المباشرة.",
    order: 1,
  },
  {
    title: "ملمع طلاء السيارة (Wax)",
    category: "cars",
    percentages: "شمع كارنوبا: 30%\nسيليكون سائل: 40%\nمذيب بيترولي: 30%",
    steps: "1. اخلط الشمع مع المذيب على حمام مائي دافئ (60 درجة).\n2. أضف السيليكون السائل تدريجياً مع التحريك المستمر.\n3. اترك الخليط يبرد تماماً قبل الاستخدام.",
    warnings: "استخدم في مكان جيد التهوية. تجنب استنشاق الأبخرة.",
    order: 2,
  },
];

/** One-time seed: inserts starter recipes exactly once, guarded by meta flag. */
export const ensureSeed = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return;
    const marker = await ctx.db
      .query("meta")
      .withIndex("by_key", (q) => q.eq("key", "recipes_seeded"))
      .first();
    if (marker) return; // already seeded
    await ctx.db.insert("meta", { key: "recipes_seeded", value: "1" });
    for (const r of seedRecipes) {
      await ctx.db.insert("recipes", r);
    }
  },
});
