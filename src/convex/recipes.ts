import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { ADMIN_EMAIL } from "./admin";

/**
 * All recipes, ordered. Only for registered subscribers who redeemed a
 * valid access code (the admin account bypasses the code check).
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null; // signed-out users see nothing

    const user = await ctx.db.get(userId);
    const email = user?.email?.trim().toLowerCase();

    // Admin sees everything without a code
    if (!email || email !== ADMIN_EMAIL) {
      const redeemed = await ctx.db
        .query("accessCodes")
        .withIndex("by_used_email", (q) => q.eq("usedByEmail", email ?? ""))
        .first();
      if (!redeemed) return []; // signed in but no valid access code
    }

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

/** One-time import: car-care recipes 23–32 (guarded by meta flag, no-op after first run). */
export const importCarCareBatch = mutation({
  args: {},
  handler: async (ctx) => {
    const marker = await ctx.db
      .query("meta")
      .withIndex("by_key", (q) => q.eq("key", "car_care_batch_imported"))
      .first();
    if (marker) return { skipped: true };
    await ctx.db.insert("meta", { key: "car_care_batch_imported", value: "1" });
    for (const r of carCareBatch) {
      await ctx.db.insert("recipes", r);
    }
    return { skipped: false };
  },
});

const carCareBatch: {
  title: string;
  category: "cars";
  percentages: string;
  steps: string;
  warnings?: string;
  order: number;
}[] = [
  {
    title: "شامبو السيارات",
    category: "cars",
    percentages:
      "Texapon N70: 8.0%\nCDE: 2.0%\nPropylene Glycol: 2.0%\nحمض الستريك: 0.5%\nFormol: 0.2%\nعطر: 0.5%\nماء: 86.8%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف Texapon N70 مع التحريك حتى الذوبان.\n3. أضف CDE وحرك.\n4. أضف Propylene Glycol.\n5. أذب حمض الستريك في قليل من الماء وأضفه لضبط pH.\n6. أضف Formol ثم العطر.\n7. أكمل الماء إلى 100%.\n8. عبّئ في عبوات.",
    warnings:
      "ارتدِ قفازات ونظارات عند التعامل مع المواد الكيميائية.\nتجنب ملامسة العين والابتلاع.",
    order: 23,
  },
  {
    title: "منتج تنظيف زجاج السيارات",
    category: "cars",
    percentages:
      "Isopropanol: 10.0%\nPropylene Glycol: 5.0%\nTexapon N70: 2.0%\nحمض الستريك: 0.3%\nFormol: 0.2%\nماء: 82.5%",
    steps:
      "1. اخلط الماء مع Isopropanol.\n2. أضف Texapon N70 وحرك.\n3. أضف Propylene Glycol.\n4. أذب حمض الستريك في قليل من الماء وأضفه.\n5. أضف Formol.\n6. أكمل الماء إلى 100%.\n7. عبّئ في بخاخ.",
    warnings:
      "قابل للاشتعال (Isopropanol) — ابتعد عن اللهب.\nاستخدم في مكان جيد التهوية.",
    order: 24,
  },
  {
    title: "منتج تلميع لوحة القيادة (تابلوه)",
    category: "cars",
    percentages:
      "Propylene Glycol: 5.0%\nCétiol C5: 10.0%\nIsopropanol: 7.0%\nGlycerine: 3.0%\nFormol: 0.5%\nماء: 74.5%",
    steps:
      "1. اخلط الماء مع Isopropanol.\n2. أضف Cétiol C5 وحرك.\n3. أضف Propylene Glycol ثم Glycerine.\n4. أضف Formol.\n5. أكمل الماء إلى 100%.\n6. عبّئ في بخاخ.",
    warnings: "استخدم في مكان جيد التهوية. تجنب ملامسة العين.",
    order: 25,
  },
  {
    title: "منتج تنظيف المحرك من الزيوت والشحوم",
    category: "cars",
    percentages:
      "Butyl Glycol: 10.0%\nTexapon N70: 8.0%\nPropylene Glycol: 5.0%\nCétiol C5: 3.0%\nFormol: 0.2%\nماء: 73.8%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف Texapon N70 مع التحريك.\n3. أضف Butyl Glycol ثم Propylene Glycol.\n4. أضف Cétiol C5.\n5. أضف Formol.\n6. أكمل الماء إلى 100%.\n7. عبّئ في عبوات.",
    warnings:
      "ارتدِ قفازات ونظارات واقية.\nبعّد عن مصادر الشرر واللهب أثناء الاستخدام.",
    order: 26,
  },
  {
    title: "منتج La Mousse لتنظيف السيارات",
    category: "cars",
    percentages:
      "Texapon N70: 10.0%\nCDE: 3.0%\nPropylene Glycol: 2.0%\nحمض الستريك: 0.5%\nFormol: 0.3%\nعطر: 0.1%\nماء: 83.9%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف Texapon N70 مع التحريك.\n3. أضف CDE ثم Propylene Glycol.\n4. أذب حمض الستريك في قليل من الماء وأضفه.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في عبوات رغوية.",
    warnings: "تجنب ملامسة العين.\nخزن بعيداً عن الشمس والحرارة.",
    order: 27,
  },
  {
    title: "منتج مبرد محرك السيارة",
    category: "cars",
    percentages:
      "Mono Ethylene Glycol (MEG): 50.0%\nماء مقطر: 48.0%\nInhibiteur de Corrosion: 1.5%\nAnti-Foaming Agent: 0.3%\nملون: 0.2%",
    steps:
      "1. اخلط MEG مع الماء المقطر.\n2. أضف Inhibiteur de Corrosion مع التحريك.\n3. أضف Anti-Foaming Agent.\n4. أضف الملون.\n5. حرك جيداً حتى التجانس.\n6. عبّئ في عبوات مناسبة.",
    warnings:
      "سام إذا ابتُلع — حافظ بعيداً عن متناول الأطفال والحيوانات.\nتجنب ملامسة الجلد والعين.",
    order: 28,
  },
  {
    title: "منتج مزيل الضباب من الزجاج الداخلي",
    category: "cars",
    percentages:
      "Isopropanol: 20.0%\nPropylene Glycol: 5.0%\nماء مقطر: 73.0%\nFormol: 0.5%\nملون: 0.2%",
    steps:
      "1. اخلط الماء مع Isopropanol.\n2. أضف Propylene Glycol.\n3. أضف Formol.\n4. أضف الملون.\n5. أكمل الماء إلى 100%.\n6. عبّئ في بخاخ.",
    warnings:
      "قابل للاشتعال — ابتعد عن اللهب والشرر.\nرشّ في مكان جيد التهوية.",
    order: 29,
  },
  {
    title: "منتج عطر السيارات",
    category: "cars",
    percentages:
      "Propylene Glycol: 10.0%\nزيت عطري: 5.0%\nماء مقطر: 85.0%\nFormol: 0.5%",
    steps:
      "1. اخلط Propylene Glycol مع الزيت العطري.\n2. أضف الماء المقطر تدريجياً مع التحريك.\n3. أضف Formol.\n4. حرك جيداً.\n5. عبّئ في بخاخ.",
    warnings: "تجنب ملامسة العين والجلد الحساس.\nخزن بعيداً عن الحرارة.",
    order: 30,
  },
  {
    title: "منتج تنظيف وتجديد عجلات السيارة",
    category: "cars",
    percentages:
      "Texapon N70: 7.0%\nPropylene Glycol: 3.0%\nC.O.D: 5.0%\nحمض الستريك: 1.0%\nFormol: 0.3%\nماء: 83.7%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف Texapon N70 مع التحريك.\n3. أضف Propylene Glycol ثم C.O.D.\n4. أذب حمض الستريك في قليل من الماء وأضفه.\n5. أضف Formol.\n6. أكمل الماء إلى 100%.\n7. عبّئ في بخاخ.",
    warnings:
      "ارتدِ قفازات عند الاستخدام.\nتجنب الرش على الفرامل أو الأجزاء الكهربائية.",
    order: 31,
  },
  {
    title: "سائل مساحات الزجاج",
    category: "cars",
    percentages:
      "ماء مقطر: 70.0%\nIsopropanol: 20.0%\nمادة فعالة سطحياً: 1.0%\nPropylene Glycol: 5.0%\nFormol: 0.2%\nعطر: 0.2%",
    steps:
      "1. اخلط الماء مع Isopropanol.\n2. أضف المادة الفعالة سطحياً وحرك.\n3. أضف Propylene Glycol.\n4. أضف Formol ثم العطر.\n5. أكمل الماء إلى 100%.\n6. عبّئ في عبوات.",
    warnings:
      "قابل للاشتعال — ابتعد عن اللهب.\nلا تستخدمه في درجات التجمد الشديد دون تعديل النسب.",
    order: 32,
  },
];

/** One-time import: household recipes 1–22 (guarded by meta flag, no-op after first run). */
export const importHomeCareBatch = mutation({
  args: {},
  handler: async (ctx) => {
    const marker = await ctx.db
      .query("meta")
      .withIndex("by_key", (q) => q.eq("key", "home_care_batch_imported"))
      .first();
    if (marker) return { skipped: true };
    await ctx.db.insert("meta", { key: "home_care_batch_imported", value: "1" });
    for (const r of homeCareBatch) {
      await ctx.db.insert("recipes", r);
    }
    return { skipped: false };
  },
});

const homeCareBatch: {
  title: string;
  category: "cleaners";
  percentages: string;
  steps: string;
  warnings?: string;
  order: number;
}[] = [
  {
    title: "سائل غسل الأواني (اقتصادي)",
    category: "cleaners",
    percentages:
      "SLES أو Texapon: 7.0%\nCocamide DEA: 2.0%\nملح طعام NaCl: 2.0%\nFormol: 0.2%\nعطر: 0.3%\nماء: 88.4%",
    steps:
      "1. ضع كمية الماء في وعاء نظيف.\n2. أضف SLES أو Texapon مع التحريك المستمر حتى الذوبان التام.\n3. أضف Cocamide DEA وحرك جيداً.\n4. أضف ملح الطعام تدريجياً مع التحريك حتى الحصول على القوام المطلوب.\n5. أضف Formol ثم العطر واللون (اختياري).\n6. أكمل الماء إلى 100% وحرك حتى التجانس.\n7. عبّئ في عبوات مناسبة.",
    warnings: "تجنب ملامسة العين.\nحافظ بعيداً عن متناول الأطفال.",
    order: 1,
  },
  {
    title: "سائل غسل الأواني (جودة أعلى)",
    category: "cleaners",
    percentages:
      "SLES أو Texapon: 10.0%\nBetaine: 3.0%\nCocamide DEA: 2.0%\nملح NaCl: 1.5%\nFormol: 0.2%\nعطر: 0.3%\nماء: 82.9%",
    steps:
      "1. ضع الماء في وعاء نظيف.\n2. أضف SLES أو Texapon مع التحريك المستمر.\n3. أضف Betaine ثم Cocamide DEA مع التحريك.\n4. أضف ملح الطعام تدريجياً مع التحريك حتى الحصول على اللزوجة المطلوبة.\n5. أضف Formol ثم العطر واللون.\n6. أكمل الماء إلى 100% وحرك جيداً.\n7. عبّئ في عبوات محكمة.",
    warnings: "تجنب ملامسة العين.\nحافظ بعيداً عن متناول الأطفال.",
    order: 2,
  },
  {
    title: "صابون سائل لليدين (اقتصادي)",
    category: "cleaners",
    percentages:
      "SLES أو Texapon: 8.0%\nBetaine: 2.0%\nملح NaCl: 1.0%\nFormol: 0.2%\nعطر: 0.3%\nماء: 88.4%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف SLES أو Texapon وحرك حتى الذوبان.\n3. أضف Betaine وحرك جيداً.\n4. أضف الملح تدريجياً لضبط اللزوجة.\n5. أضف Formol ثم العطر واللون.\n6. أكمل الماء إلى 100% وحرك.\n7. عبّئ في عبوات.",
    warnings: "مناسب للاستخدام اليومي على اليدين.\nتجنب ملامسة العين.",
    order: 3,
  },
  {
    title: "مزيل دهون الفرن",
    category: "cleaners",
    percentages:
      "هيدروكسيد الصوديوم NaOH: 2.0%\nSLES أو Texapon: 3.0%\nBetaine: 1.0%\nButyl Glycol: 2.0%\nFormol: 0.2%\nعطر: 0.2%\nماء: 91.5%",
    steps:
      "1. تحذير: ارتدِ قفازات ونظارات واقية، وتأكد من التهوية الجيدة.\n2. ضع الماء في وعاء مقاوم للقلويات.\n3. أذب NaOH في الماء بحذر شديد (يحدث تفاعل طارد للحرارة).\n4. أضف SLES أو Texapon مع التحريك.\n5. أضف Betaine ثم Butyl Glycol.\n6. أضف Formol ثم العطر.\n7. أكمل الماء إلى 100% وحرك.\n8. عبّئ في عبوات بلاستيكية محكمة.",
    warnings:
      "محرق للجلد والعين — ارتدِ قفازات ونظارات واقية دائماً.\nحافظ بعيداً عن متناول الأطفال.\nلا تخلط مع الأحماض.",
    order: 4,
  },
  {
    title: "مبيض ومطهر (جافيل اقتصادي)",
    category: "cleaners",
    percentages: "هيبوكلوريت الصوديوم NaOCl: 15-16%\nماء: 84.0%",
    steps:
      "1. تحذير: لا تخلط مع الأحماض أو العطور.\n2. ضع الماء في وعاء بلاستيكي.\n3. أضف NaOCl تدريجياً مع التحريك الهادئ.\n4. أكمل الماء إلى 100%.\n5. عبّئ في عبوات معتمة محكمة الإغلاق.\n6. خزن بعيداً عن الضوء والحرارة.",
    warnings:
      "خطر: أبخرة الكلور سامة — لا تخلط أبداً مع الأحماض أو الأمونيا.\nاستخدم في مكان جيد التهوية وارتدِ قفازات.",
    order: 5,
  },
  {
    title: "سائل غسل الملابس (مرسيليا)",
    category: "cleaners",
    percentages:
      "SLES: 8.0%\nBetaine: 1.5%\nCocamide DEA: 1.5%\nملح NaCl: 1.0%\nFormol: 0.2%\nعطر مرسيليا: 0.3%\nماء: 87.4%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف SLES وحرك حتى الذوبان.\n3. أضف Betaine ثم Cocamide DEA مع التحريك.\n4. أضف الملح تدريجياً لضبط اللزوجة.\n5. أضف Formol ثم عطر مرسيليا.\n6. أكمل الماء إلى 100% وحرك.\n7. عبّئ في عبوات.",
    warnings: "تجنب ملامسة العين.\nحافظ بعيداً عن متناول الأطفال.",
    order: 6,
  },
  {
    title: "معطر الأرضيات \"صانيبو\"",
    category: "cleaners",
    percentages:
      "SLES أو Texapon: 3.0%\nBetaine: 1.0%\nملح NaCl: 1.0%\nFormol: 0.2%\nعطر: 0.5%\nماء: 94.2%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف SLES أو Texapon وحرك.\n3. أضف Betaine وحرك.\n4. أضف الملح تدريجياً.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في عبوات.",
    warnings: "تجنب ملامسة العين.\nلا تخلط مع منتجات الكلور.",
    order: 7,
  },
  {
    title: "منظف الأرضيات متعدد الاستعمالات",
    category: "cleaners",
    percentages:
      "SLES: 6.0%\nBetaine: 1.0%\nButyl Glycol: 1.0%\nملح NaCl: 0.5%\nFormol: 0.2%\nعطر: 0.3%\nماء: 90.9%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف SLES وحرك.\n3. أضف Betaine ثم Butyl Glycol.\n4. أضف الملح تدريجياً.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في عبوات.",
    warnings: "تجنب ملامسة العين.\nحافظ بعيداً عن متناول الأطفال.",
    order: 8,
  },
  {
    title: "منظف الزجاج والمرايا",
    category: "cleaners",
    percentages:
      "ماء: 80.0%\nإيثانول أو إيزوبروبانول: 15.0%\nSLES أو Betaine: 0.5%\nButyl Glycol: 1.0%\nFormol: 0.2%\nعطر: 0.2%\nملون: 0.1%",
    steps:
      "1. اخلط الماء مع الكحول في وعاء.\n2. أضف SLES أو Betaine وحرك.\n3. أضف Butyl Glycol.\n4. أضف Formol ثم العطر واللون.\n5. أكمل الماء إلى 100%.\n6. عبّئ في بخاخ.",
    warnings: "قابل للاشتعال — ابتعد عن اللهب والشرر.\nاستخدم في مكان جيد التهوية.",
    order: 9,
  },
  {
    title: "منظف الحمام والمراحيض (مزيل تكلسات)",
    category: "cleaners",
    percentages:
      "حمض الستريك: 3.0%\nSLES: 2.0%\nBetaine: 1.0%\nButyl Glycol: 1.0%\nFormol: 0.2%\nعطر: 0.3%\nماء: 92.4%",
    steps:
      "1. أذب حمض الستريك في قليل من الماء.\n2. أضف SLES وحرك.\n3. أضف Betaine ثم Butyl Glycol.\n4. أضف Formol ثم العطر.\n5. أكمل الماء إلى 100%.\n6. عبّئ في بخاخ.",
    warnings:
      "ارتدِ قفازات عند الاستخدام.\nلا تخلط مع منتجات الكلور (يشكّل غازاً ساماً).",
    order: 10,
  },
  {
    title: "سائل غسيل الأواني بدون حمض السلفونيك",
    category: "cleaners",
    percentages:
      "SLES: 2.0%\nCocamide DEA: 0.5%\nButyl Glycol: 1.0%\nملح NaCl: 0.5%\nFormol: 0.2%\nعطر: 0.3%\nماء: 95.4%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف SLES وحرك.\n3. أضف Cocamide DEA ثم Butyl Glycol.\n4. أضف الملح تدريجياً.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في عبوات.",
    warnings: "تجنب ملامسة العين.\nحافظ بعيداً عن متناول الأطفال.",
    order: 11,
  },
  {
    title: "منظف قوي للإسمنت والشوائب",
    category: "cleaners",
    percentages: "حمض الهيدروكلوريك (HCl): 15.0%\nSLES أو Texapon: 1.5%",
    steps:
      "1. تحذير شديد: ارتدِ معدات وقاية كاملة، وتأكد من التهوية.\n2. ضع الماء في وعاء مقاوم للأحماض.\n3. أضف HCl بحذر شديد (يحدث تفاعل طارد للحرارة).\n4. أضف SLES أو Texapon مع التحريك.\n5. أكمل الماء إلى 100%.\n6. عبّئ في عبوات بلاستيكية محكمة.\n7. لا تخلط مع الكلور.",
    warnings:
      "حمض قوي ومحرق — معدات وقاية كاملة إلزامية (قفازات، نظارات، كمامة).\nأبخرة خانقة: استخدم في الهواء الطلق أو بتهوية قصوى.\nلا تخلط أبداً مع الكلور أو القلوات.",
    order: 12,
  },
  {
    title: "جل تنظيف المراحيض",
    category: "cleaners",
    percentages:
      "حمض اللاكتيك أو الستريك: 3.0%\nSLES: 2.0%\nBetaine: 1.0%\nمادة مثخنة (Xanthan Gum أو CMC): 0.5%\nButyl Glycol: 1.0%\nFormol: 0.2%\nعطر: 0.2%\nماء: 92.0%",
    steps:
      "1. أذب الحمض في قليل من الماء.\n2. أضف SLES وحرك.\n3. أضف Betaine ثم Butyl Glycol.\n4. أذب المادة المثخنة في قليل من الماء وأضفها للخليط مع التحريك المستمر حتى الحصول على قوام الجل.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في عبوات مناسبة.",
    warnings:
      "ارتدِ قفازات عند الاستخدام.\nلا تخلط مع منتجات الكلور.",
    order: 13,
  },
  {
    title: "مزيل بقع قبل الغسيل",
    category: "cleaners",
    percentages:
      "SLES أو Texapon: 5.0%\nBetaine: 1.0%\nButyl Glycol: 2.0%\nإيثانول: 5.0%\nFormol: 0.2%\nعطر: 0.3%\nماء: 86.3%",
    steps:
      "1. اخلط الماء مع الإيثانول.\n2. أضف SLES أو Texapon وحرك.\n3. أضف Betaine ثم Butyl Glycol.\n4. أضف Formol ثم العطر.\n5. أكمل الماء إلى 100%.\n6. عبّئ في بخاخ.",
    warnings: "قابل للاشتعال جزئياً — ابتعد عن اللهب.\nجرّب على منطقة غير ظاهرة من القماش أولاً.",
    order: 14,
  },
  {
    title: "ملمع الخشب",
    category: "cleaners",
    percentages:
      "زيت البرافين الخفيف: 60.0%\nشمع العسل أو شمع الكرنوبا: 10.0%\nتربنتين: 20.0%\nعطر خشبي: 0.5%\nمضاد أكسدة: 0.5%",
    steps:
      "1. أذب الشمع في زيت البرافين على حمام مائي دافئ.\n2. أضف التربنتين تدريجياً مع التحريك.\n3. أضف العطر ومضاد الأكسدة.\n4. اترك المزيج ليبرد ثم عبّئ في عبوات مناسبة.",
    warnings:
      "التربنتين قابل للاشتعال — ابتعد عن اللهب والشرر.\nاستخدم في مكان جيد التهوية.",
    order: 15,
  },
  {
    title: "منظف الأحذية الجلدية",
    category: "cleaners",
    percentages:
      "SLES: 2.0%\nملح NaCl: 0.5%\nButyl Glycol: 1.0%\nFormol: 0.2%\nعطر: 0.3%\nماء: 96.0%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف SLES وحرك.\n3. أضف الملح ثم Butyl Glycol.\n4. أضف Formol ثم العطر.\n5. أكمل الماء إلى 100%.\n6. عبّئ في بخاخ.",
    warnings: "جرّب على منطقة غير ظاهرة أولاً.\nتجنب ملامسة العين.",
    order: 16,
  },
  {
    title: "منظف الحمام اليومي",
    category: "cleaners",
    percentages:
      "SLES أو Texapon: 3.0%\nBetaine: 1.0%\nButyl Glycol: 1.0%\nملح NaCl: 0.5%\nعطر: 0.3%\nFormol: 0.2%\nماء: 93.9%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف SLES أو Texapon وحرك.\n3. أضف Betaine ثم Butyl Glycol.\n4. أضف الملح تدريجياً.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في بخاخ.",
    warnings: "تجنب ملامسة العين.\nلا تخلط مع منتجات الكلور.",
    order: 17,
  },
  {
    title: "بخاخ طارد الحشرات المنزلية",
    category: "cleaners",
    percentages:
      "SLES: 1.0%\nماء: 88.8%\nإيثانول: 8.0%\nزيت طارد (سترونيلا أو ليمون جراس): 1.5%\nFormol: 0.2%\nعطر: 0.4%",
    steps:
      "1. اخلط الماء مع الإيثانول.\n2. أضف SLES وحرك.\n3. أضف الزيت الطارد.\n4. أضف Formol ثم العطر.\n5. أكمل الماء إلى 100%.\n6. عبّئ في بخاخ.",
    warnings:
      "قابل للاشتعال — ابتعد عن اللهب.\nتجنب الرش على الوجه أو الجلد الحساس، وبعيداً عن الأطفال.",
    order: 18,
  },
  {
    title: "مزيل الروائح للقمامة",
    category: "cleaners",
    percentages:
      "SLES: 1.0%\nBetaine: 0.5%\nماء: 93.0%\nإيثانول: 5.0%\nزيت عطري (ليمون أو برتقال): 0.8%\nمادة حافظة: 0.2%",
    steps:
      "1. اخلط الماء مع الإيثانول.\n2. أضف SLES و Betaine.\n3. أضف الزيت العطري.\n4. أضف المادة الحافظة.\n5. أكمل الماء إلى 100%.\n6. عبّئ في بخاخ.",
    warnings: "قابل للاشتعال جزئياً.\nتجنب ملامسة العين.",
    order: 19,
  },
  {
    title: "منظف الأحواض والمغاسل",
    category: "cleaners",
    percentages:
      "SLES: 4.0%\nBetaine: 1.0%\nملح NaCl: 1.0%\nButyl Glycol: 1.0%\nFormol: 0.2%\nعطر: 0.3%\nماء: 92.4%",
    steps:
      "1. ضع الماء في وعاء.\n2. أضف SLES وحرك.\n3. أضف Betaine ثم Butyl Glycol.\n4. أضف الملح تدريجياً.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في عبوات.",
    warnings: "تجنب ملامسة العين.\nحافظ بعيداً عن متناول الأطفال.",
    order: 20,
  },
  {
    title: "منظف الأحذية الرياضية والقماشية",
    category: "cleaners",
    percentages:
      "SLES: 3.0%\nBetaine: 1.0%\nإيثانول: 5.0%\nButyl Glycol: 1.0%\nملح NaCl: 0.5%\nFormol: 0.2%\nعطر: 0.3%\nماء: 88.9%",
    steps:
      "1. اخلط الماء مع الإيثانول.\n2. أضف SLES وحرك.\n3. أضف Betaine ثم Butyl Glycol.\n4. أضف الملح تدريجياً.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في بخاخ.",
    warnings: "جرّب على منطقة غير ظاهرة أولاً.\nقابل للاشتعال جزئياً — ابتعد عن اللهب.",
    order: 21,
  },
  {
    title: "منظف المعادن والتلميع",
    category: "cleaners",
    percentages:
      "حمض الستريك أو اللاكتيك: 2.0%\nSLES: 2.0%\nBetaine: 1.0%\nButyl Glycol: 1.0%\nملح NaCl: 0.5%\nFormol: 0.2%\nعطر: 0.2%\nماء: 93.0%",
    steps:
      "1. أذب الحمض في قليل من الماء.\n2. أضف SLES وحرك.\n3. أضف Betaine ثم Butyl Glycol.\n4. أضف الملح تدريجياً.\n5. أضف Formol ثم العطر.\n6. أكمل الماء إلى 100%.\n7. عبّئ في عبوات.",
    warnings: "ارتدِ قفازات عند الاستخدام.\nلا تستخدمه على معادن حساسة دون اختبار مسبق.",
    order: 22,
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
