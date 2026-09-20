import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { categoriesForPkg, effectivePkg } from "./entitlements";
import { FRENCH_RECIPES } from "./recipeDataFr";
import { NATURAL_FORMULAS } from "./recipeDataNatural";

/**
 * Recipes scoped to the caller's subscription package. Returns null when
 * signed out, [] when signed in without any entitlement, and the filtered
 * (ordered) list otherwise.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null; // signed-out users see nothing

    const pkg = await effectivePkg(ctx);
    if (pkg === null) return []; // signed in but no entitlement

    const allowed = new Set(categoriesForPkg(pkg));
    const all = await ctx.db.query("recipes").withIndex("by_category").collect();
    return all.filter((r) => allowed.has(r.category));
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
    order: 33,
  },
  {
    title: "ملمع طلاء السيارة (Wax)",
    category: "cars",
    percentages: "شمع كارنوبا: 30%\nسيليكون سائل: 40%\nمذيب بيترولي: 30%",
    steps: "1. اخلط الشمع مع المذيب على حمام مائي دافئ (60 درجة).\n2. أضف السيليكون السائل تدريجياً مع التحريك المستمر.\n3. اترك الخليط يبرد تماماً قبل الاستخدام.",
    warnings: "استخدم في مكان جيد التهوية. تجنب استنشاق الأبخرة.",
    order: 34,
  },
];

/**
 * Backfill French localization onto every recipe that matches the canonical
 * catalog and is still missing its `titleFr`. Idempotent: after the first run
 * it only scans (no writes). Safe to call on every load.
 */
export const backfillFrench = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("recipes").collect();
    let patched = 0;
    for (const r of all) {
      if (r.titleFr) continue;
      const fr = FRENCH_RECIPES[r.title];
      if (!fr) continue;
      await ctx.db.patch(r._id, {
        titleFr: fr.titleFr,
        percentagesFr: fr.percentagesFr,
        stepsFr: fr.stepsFr,
        warningsFr: fr.warningsFr,
      });
      patched++;
    }
    return { patched, total: all.length };
  },
});

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

/**
 * One-time import of the client's complete natural-formulation collection
 * (49 unique formulas). Guarded by meta flag — no-op after the first run.
 */
function naturalDoc(f: (typeof NATURAL_FORMULAS)[number]) {
  return {
    title: f.title,
    category: "natural" as const,
    percentages: f.percentages,
    steps: f.steps,
    ...(f.warnings ? { warnings: f.warnings } : {}),
    order: f.order,
    titleFr: f.titleFr,
    percentagesFr: f.percentagesFr,
    stepsFr: f.stepsFr,
    warningsFr: f.warningsFr,
  };
}

export const importNaturalFormulas = mutation({
  args: {},
  handler: async (ctx) => {
    const marker = await ctx.db
      .query("meta")
      .withIndex("by_key", (q) => q.eq("key", "natural_formulas_v1"))
      .first();
    if (marker) return { skipped: true };
    await ctx.db.insert("meta", { key: "natural_formulas_v1", value: "1" });
    const all = await ctx.db.query("recipes").collect();
    const titles = new Set(all.map((r) => r.title));
    let inserted = 0;
    for (const f of NATURAL_FORMULAS) {
      if (titles.has(f.title)) continue;
      await ctx.db.insert("recipes", naturalDoc(f));
      inserted++;
    }
    return { skipped: false, inserted };
  },
});

/** One-time import: natural home detergents (guarded by meta flag, no-op after first run). */
export const importNaturalBatch = mutation({
  args: {},
  handler: async (ctx) => {
    const marker = await ctx.db
      .query("meta")
      .withIndex("by_key", (q) => q.eq("key", "natural_batch_imported"))
      .first();
    if (marker) return { skipped: true };
    await ctx.db.insert("meta", { key: "natural_batch_imported", value: "1" });
    for (const r of naturalBatch) {
      await ctx.db.insert("recipes", r);
    }
    return { skipped: false };
  },
});

const naturalBatch: {
  title: string;
  category: "natural";
  percentages: string;
  steps: string;
  warnings?: string;
  order: number;
  titleFr?: string;
  percentagesFr?: string;
  stepsFr?: string;
  warningsFr?: string;
}[] = [
  {
    title: "سائل غسيل طبيعي (صابون مرسيليا)",
    category: "natural",
    percentages: "صابون مرسيليا مبشور: 10%\nبيكربونات الصوديوم: 2%\nماء: 88%",
    steps:
      "1. سخّن نصف كمية الماء في وعاء كبير (دون الغليان).\n2. أضف الصابون المبشور وحرّك حتى الذوبان الكامل.\n3. أذب البيكربونات في قليل من الماء الدافئ وأضفها للخليط.\n4. أكمل الماء المتبقي وحرّك جيداً.\n5. اترك الخليط يبرد ويتماسك ثم عبّئ في عبوات.\n6. حرّك قبل كل استعمال.",
    warnings:
      "طبيعي ولطيف على الجلد.\nلا تستخدمه على الصوف والحرير (الصابون قلوي).",
    order: 35,
    titleFr: "Lessive liquide naturelle (savon de Marseille)",
    percentagesFr: "Savon de Marseille râpé : 10%\nBicarbonate de soude : 2%\nEau : 88%",
    stepsFr:
      "1. Faites chauffer la moitié de l'eau dans un grand récipient (sans bouillir).\n2. Ajoutez le savon râpé et remuez jusqu'à dissolution complète.\n3. Dissolvez le bicarbonate dans un peu d'eau tiède et ajoutez-le.\n4. Complétez avec le reste d'eau et mélangez bien.\n5. Laissez refroidir et gélifier puis conditionnez en flacons.\n6. Agitez avant chaque utilisation.",
    warningsFr:
      "Naturel et doux pour la peau.\nNe pas utiliser sur la laine ni la soie (savon alcalin).",
  },
  {
    title: "سائل جلي طبيعي (صابون أسود)",
    category: "natural",
    percentages: "صابون أسود سائل: 12%\nبيكربونات الصوديوم: 1.5%\nخل أبيض: 2%\nماء: 84.5%",
    steps:
      "1. ضع الماء الدافئ في وعاء.\n2. أضف الصابون الأسود وحرّك حتى التجانس.\n3. أضف البيكربونات المذابة في قليل من الماء.\n4. أضف الخل تدريجياً في النهاية (قد تتكوّن رغوة خفيفة).\n5. حرّك واتركه يبرد ثم عبّئ في زجاجة مضخة.",
    warnings: "أضف الخل في النهاية وببطء.\nتجنّب ملامسة العين.",
    order: 36,
    titleFr: "Liquide vaisselle naturel (savon noir)",
    percentagesFr:
      "Savon noir liquide : 12%\nBicarbonate de soude : 1.5%\nVinaigre blanc : 2%\nEau : 84.5%",
    stepsFr:
      "1. Versez l'eau tiède dans un récipient.\n2. Ajoutez le savon noir et remuez jusqu'à homogénéité.\n3. Ajoutez le bicarbonate dissous dans un peu d'eau.\n4. Ajoutez le vinaigre progressivement à la fin (une légère mousse peut se former).\n5. Mélangez, laissez refroidir puis conditionnez en flacon pompe.",
    warningsFr:
      "Ajoutez le vinaigre lentement à la fin.\nÉviter le contact avec les yeux.",
  },
  {
    title: "منظف متعدد الأسطح بالخل والليمون",
    category: "natural",
    percentages: "خل أبيض: 25%\nماء: 74%\nزيت ليمون عطري: 1%",
    steps:
      "1. اخلط الماء مع الخل في وعاء.\n2. أضف الزيت العطري وحرّك.\n3. انقل الخليط إلى زجاجة بخاخ.\n4. رجّ قبل الاستخدام وامسح الأسطح بقطعة قماش.",
    warnings:
      "لا تستخدمه على الرخام أو الحجر الطبيعي أو الخشب غير المعالج.\nلا تخلط أبداً مع الجافيل (غاز كلور سام).",
    order: 37,
    titleFr: "Nettoyant multi-surfaces vinaigre-citron",
    percentagesFr: "Vinaigre blanc : 25%\nEau : 74%\nHuile essentielle de citron : 1%",
    stepsFr:
      "1. Mélangez l'eau avec le vinaigre.\n2. Ajoutez l'huile essentielle et remuez.\n3. Transvasez dans un flacon spray.\n4. Secouez avant usage et essuyez les surfaces avec un chiffon.",
    warningsFr:
      "Ne pas utiliser sur le marbre, la pierre naturelle ou le bois non traité.\nNe jamais mélanger avec l'eau de Javel (gaz chlore toxique).",
  },
  {
    title: "مسحوق غسيل طبيعي (صابون + بيكربونات)",
    category: "natural",
    percentages: "صابون مرسيليا مبشور: 50%\nبيكربونات الصوديوم: 30%\nكريستالات الصودا: 20%",
    steps:
      "1. ابشر الصابون على مبشرة ناعمة.\n2. اخلط الصابون مع البيكربونات وكريستالات الصودا جيداً.\n3. خزن المسحوق في وعاء محكم الإغلاق.\n4. استخدم ملعقتين كبيرتين لكل غسلة (توضع مباشرة في الأسطوانة).",
    warnings: "خزن بعيداً عن الرطوبة (يتكتّل).\nمناسب خاصة للملابس القطنية.",
    order: 38,
    titleFr: "Lessive en poudre naturelle (savon + bicarbonate)",
    percentagesFr:
      "Savon de Marseille râpé : 50%\nBicarbonate de soude : 30%\nCristaux de soude : 20%",
    stepsFr:
      "1. Râpez le savon finement.\n2. Mélangez le savon avec le bicarbonate et les cristaux de soude.\n3. Conservez la poudre dans un récipient hermétique.\n4. Utilisez 2 cuillères à soupe par lavage (directement dans le tambour).",
    warningsFr:
      "Conserver au sec (risque de grumelage).\nParticulièrement adapté au coton.",
  },
  {
    title: "معطر أرضيات طبيعي (صابون أسود)",
    category: "natural",
    percentages: "صابون أسود سائل: 5%\nخل أبيض: 5%\nزيت لافندر عطري: 0.5%\nماء: 89.5%",
    steps:
      "1. ضع الماء في دلو.\n2. أضف الصابون الأسود وحرّك.\n3. أضف الخل ثم الزيت العطري.\n4. امسح الأرضية كالمعتاد — لا حاجة للشطف.",
    warnings:
      "مناسب للبلاط والسيراميك.\nتجنّبه على الرخام والأخشاب غير المعالجة.",
    order: 39,
    titleFr: "Nettoyant sols naturel (savon noir)",
    percentagesFr:
      "Savon noir liquide : 5%\nVinaigre blanc : 5%\nHuile essentielle de lavande : 0.5%\nEau : 89.5%",
    stepsFr:
      "1. Versez l'eau dans un seau.\n2. Ajoutez le savon noir et remuez.\n3. Ajoutez le vinaigre puis l'huile essentielle.\n4. Lavez le sol normalement — sans rinçage nécessaire.",
    warningsFr:
      "Adapté au carrelage et à la céramique.\nÉviter le marbre et le bois non traité.",
  },
  {
    title: "جل حمام طبيعي (حمض الستريك)",
    category: "natural",
    percentages: "حمض الستريك: 4%\nصمغ الزانثان: 0.6%\nزيت أوكالبتوس عطري: 0.4%\nماء: 95%",
    steps:
      "1. أذب حمض الستريك في نصف الماء.\n2. وزّع صمغ الزانثان في قليل من الماء البارد (أو اخلطه أولاً مع الزيت العطري) لتجنّب التكتّل.\n3. أضف المزيج للماء مع التحريك المستمر حتى يتماسك كالجل.\n4. أضف الزيت العطري في النهاية.\n5. عبّئ في زجاجة مضخة ضيقة الفوهة.",
    warnings: "ارتدِ قفازات عند التحضير.\nلا تخلط مع منتجات الكلور.",
    order: 40,
    titleFr: "Gel WC naturel (acide citrique)",
    percentagesFr:
      "Acide citrique : 4%\nGomme xanthane : 0.6%\nHuile essentielle d'eucalyptus : 0.4%\nEau : 95%",
    stepsFr:
      "1. Dissolvez l'acide citrique dans la moitié de l'eau.\n2. Dispersez la gomme xanthane dans un peu d'eau froide (ou prémélangez-la avec l'huile essentielle) pour éviter les grumeaux.\n3. Ajoutez le mélange en remuant constamment jusqu'à obtenir un gel.\n4. Ajoutez l'huile essentielle à la fin.\n5. Conditionnez dans un flacon à bec étroit.",
    warningsFr:
      "Portez des gants lors de la préparation.\nNe jamais mélanger avec les produits chlorés.",
  },
  {
    title: "منظف زجاج طبيعي (خل وليمون)",
    category: "natural",
    percentages: "خل أبيض: 20%\nماء: 79.5%\nزيت ليمون عطري: 0.5%",
    steps:
      "1. اخلط الماء مع الخل في زجاجة بخاخ.\n2. أضف الزيت العطري.\n3. رجّ بخفة قبل الاستخدام.\n4. رشّ على الزجاج وامسح بقطعة قماش ميكروفايبر.",
    warnings:
      "تجنّب الأسطح المطلية بالكروم أو الحساسة للأحماض.\nلا تخلط مع الكلور.",
    order: 41,
    titleFr: "Nettoyant vitres naturel (vinaigre-citron)",
    percentagesFr:
      "Vinaigre blanc : 20%\nEau : 79.5%\nHuile essentielle de citron : 0.5%",
    stepsFr:
      "1. Mélangez l'eau avec le vinaigre dans un flacon spray.\n2. Ajoutez l'huile essentielle.\n3. Secouez légèrement avant usage.\n4. Vaporisez sur le vitrage et essuyez avec un chiffon microfibre.",
    warningsFr:
      "Éviter les surfaces chromées ou sensibles aux acides.\nNe jamais mélanger avec le chlore.",
  },
  {
    title: "صابون يدين طبيعي (كاستيل)",
    category: "natural",
    percentages: "صابون كاستيل سائل: 25%\nجليسرين نباتي: 2%\nزيت عطري (لافندر أو ليمون): 0.5%\nماء مقطّر: 72.5%",
    steps:
      "1. ضع الماء المقطّر في وعاء.\n2. أضف صابون الكاستيل بحركة هادئة لتجنّب الرغوة الزائدة.\n3. أضف الجليسرين النباتي.\n4. أضف الزيت العطري وحرّك بلطف.\n5. اتركه يهدأ بضع ساعات ثم عبّئ في مضخة.",
    warnings:
      "لطيف على الجلد ومناسب للاستخدام اليومي.\nتجنّب ملامسة العين.",
    order: 42,
    titleFr: "Savon liquide mains naturel (Castille)",
    percentagesFr:
      "Savon de Castille liquide : 25%\nGlycérine végétale : 2%\nHuile essentielle (lavande ou citron) : 0.5%\nEau distillée : 72.5%",
    stepsFr:
      "1. Versez l'eau distillée dans un récipient.\n2. Ajoutez le savon de Castille doucement pour éviter la mousse.\n3. Ajoutez la glycérine végétale.\n4. Ajoutez l'huile essentielle et remuez délicatement.\n5. Laissez reposer quelques heures puis conditionnez en pompe.",
    warningsFr:
      "Doux pour la peau, adapté à un usage quotidien.\nÉviter le contact avec les yeux.",
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

/**
 * Idempotent catalog finalizer: renumbers imported batches to their canonical
 * order (home 1–22, cars 23–32), inserts prototype recipes if missing, and
 * returns totals. Safe to run multiple times.
 */
export const finalizeCatalog = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("recipes").collect();

    // Renumber by title match (canonical numbering from the source lists)
    const homeTitles = new Map(homeCareBatch.map((r) => [r.title, r]));
    const carTitles = new Map(carCareBatch.map((r) => [r.title, r]));

    let homeN = 0;
    let carN = 22;
    for (const r of all) {
      if (homeTitles.has(r.title)) {
        homeN++;
        if (r.order !== homeN) await ctx.db.patch(r._id, { order: homeN });
      } else if (carTitles.has(r.title)) {
        carN++;
        if (r.order !== carN) await ctx.db.patch(r._id, { order: carN });
      }
    }

    // Insert prototype extras (مطهر أسطح + ملمع Wax) if absent
    const titles = new Set(all.map((r) => r.title));
    let inserted = 0;
    for (const r of seedRecipes) {
      if (!titles.has(r.title)) {
        await ctx.db.insert("recipes", r);
        inserted++;
      }
    }

    const fresh = await ctx.db.query("recipes").collect();
    return {
      total: fresh.length,
      home: fresh.filter((r) => r.category === "cleaners").length,
      cars: fresh.filter((r) => r.category === "cars").length,
      inserted,
    }; // prototype recipes already carry orders 33/34
  },
});

/**
 * Repair the catalog in place: dedupe by title (keep oldest), insert any
 * missing canonical recipes, renumber, and set the batch-import markers so
 * the one-shot import mutations never double-insert again. Safe to run
 * repeatedly at any time.
 */
export const repairCatalog = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("recipes").collect();

    // 1) Dedupe by title — keep the first-created copy
    const seen = new Set<string>();
    const toDelete: string[] = [];
    for (const r of all.slice().sort((a, b) => a._creationTime - b._creationTime)) {
      if (seen.has(r.title)) toDelete.push(r._id);
      else seen.add(r.title);
    }
    for (const id of toDelete) await ctx.db.delete(id as never);

    // 2) Insert missing canonical recipes
    const canonical = [
      ...homeCareBatch,
      ...carCareBatch,
      ...naturalBatch,
      ...NATURAL_FORMULAS.map(naturalDoc),
      ...seedRecipes,
    ];
    let inserted = 0;
    for (const r of canonical) {
      if (!seen.has(r.title)) {
        await ctx.db.insert("recipes", r);
        inserted++;
      }
    }

    // 3) Guard the one-shot import mutations permanently
    for (const key of [
      "home_care_batch_imported",
      "car_care_batch_imported",
      "natural_batch_imported",
      "natural_formulas_v1",
    ]) {
      const marker = await ctx.db
        .query("meta")
        .withIndex("by_key", (q) => q.eq("key", key))
        .first();
      if (!marker) await ctx.db.insert("meta", { key, value: "1" });
    }

    // 4) Renumber canonical recipes (home 1–22, cars 23–32; prototypes 33/34)
    const homeTitles = new Set(homeCareBatch.map((r) => r.title));
    const carTitles = new Set(carCareBatch.map((r) => r.title));
    const fresh = await ctx.db.query("recipes").collect();
    let h = 0;
    let c = 22;
    for (const r of fresh) {
      if (homeTitles.has(r.title)) {
        h++;
        if (r.order !== h) await ctx.db.patch(r._id, { order: h });
      } else if (carTitles.has(r.title)) {
        c++;
        if (r.order !== c) await ctx.db.patch(r._id, { order: c });
      }
    }

    return {
      ok: true,
      removed: toDelete.length,
      inserted,
      home: fresh.filter((r) => r.category === "cleaners").length,
      cars: fresh.filter((r) => r.category === "cars").length,
      total: fresh.length,
    };
  },
});

/**
 * Idempotent catalog sync (runs once, guarded by meta flag):
 * 1. Removes duplicate recipes (same title) keeping the oldest copy.
 * 2. Inserts any missing canonical recipes (home 1–22, cars 23–32, prototypes 33–34).
 * 3. Renumbers canonical recipes to their canonical order.
 */
export const ensureSeed = mutation({
  args: {},
  handler: async (ctx) => {
    // No auth required: idempotent and guarded by the marker below — it only
    // dedupes/inserts the canonical catalog, so it is safe to trigger anytime.
    const marker = await ctx.db
      .query("meta")
      .withIndex("by_key", (q) => q.eq("key", "catalog_synced_v1"))
      .first();
    if (marker) return { ok: true, skipped: true };
    await ctx.db.insert("meta", { key: "catalog_synced_v1", value: "1" });

    const all = await ctx.db.query("recipes").collect();

    // 1) Dedupe by title — keep the first-created copy
    const seen = new Set<string>();
    const toDelete: string[] = [];
    for (const r of all.slice().sort((a, b) => a._creationTime - b._creationTime)) {
      if (seen.has(r.title)) toDelete.push(r._id);
      else seen.add(r.title);
    }
    for (const id of toDelete) await ctx.db.delete(id as never);

    // 2) Insert missing canonical recipes
    const canonical = [
      ...homeCareBatch,
      ...carCareBatch,
      ...naturalBatch,
      ...NATURAL_FORMULAS.map(naturalDoc),
      ...seedRecipes,
    ];
    let inserted = 0;
    for (const r of canonical) {
      if (!seen.has(r.title)) {
        await ctx.db.insert("recipes", r);
        inserted++;
      }
    }

    // 3) Renumber canonical recipes (home 1–22, cars 23–32; prototypes carry 33/34)
    const homeTitles = new Set(homeCareBatch.map((r) => r.title));
    const carTitles = new Set(carCareBatch.map((r) => r.title));
    const fresh = await ctx.db.query("recipes").collect();
    let h = 0;
    let c = 22;
    for (const r of fresh) {
      if (homeTitles.has(r.title)) {
        h++;
        if (r.order !== h) await ctx.db.patch(r._id, { order: h });
      } else if (carTitles.has(r.title)) {
        c++;
        if (r.order !== c) await ctx.db.patch(r._id, { order: c });
      }
    }

    return { ok: true, inserted, removed: toDelete.length, total: fresh.length };
  },
});
