/**
 * COLLECTION COMPLÈTE — formules de produits d'entretien d'origine naturelle
 * (base glucosides / potasse) fournies par le client.
 *
 * Notes d'intégration :
 * - La recette source n°31 (Nettoyant vitres sans parfum) est strictement
 *   identique à la n°16 : elle a été fusionnée → 49 formules uniques.
 * - Les formules sources n°7 et n°25 totalisaient plus de 100 % ; l'eau a été
 *   recalculée pour atteindre exactement 100 %, conformément à la note de la
 *   collection (« recalcules pour obtenir exactement 100 % »).
 * - Les ingrédients « q.s. » (conservateur selon fournisseur, acide citrique
 *   pour le pH, sel pour la viscosité) restent en « q.s. » : le calculateur
 *   les affiche sans barre et les exclut du total.
 */

export interface NaturalFormula {
  title: string;
  titleFr: string;
  percentages: string;
  percentagesFr: string;
  steps: string;
  stepsFr: string;
  warnings?: string;
  warningsFr?: string;
  order: number;
}

export const NATURAL_FORMULAS: NaturalFormula[] = [
  {
    title: "سائل جلي لطيف بالجلوكوزيدات",
    titleFr: "Liquide vaisselle doux naturel (glucosides)",
    order: 43,
    percentages:
      "ماء منزوع الأيونات: 66.5%\nDecyl Glucoside: 15%\nCoco-Glucoside: 10%\nجليسرين نباتية: 2%\nسترات الصوديوم: 1%\nصمغ الزانثان: 0.5%\nعطر طبيعي: 0.3%\nحمض الستريك: حسب الحاجة (ضبط pH)\nمواد حافظة: حسب المورّد\nملح: حسب الحاجة (اللزوجة)",
    percentagesFr:
      "Eau déminéralisée : 66.5%\nDecyl glucoside : 15%\nCoco-glucoside : 10%\nGlycérine végétale : 2%\nCitrate de sodium : 1%\nGomme xanthane : 0.5%\nParfum naturel : 0.3%\nAcide citrique : q.s. (pH)\nConservateur : selon fournisseur\nSel : q.s. (viscosité)",
    steps:
      "1. ضع الماء في وعاء نظيف.\n2. وزّع صمغ الزانثان في الجليسرين ثم أضف التوزيعة للماء مع التحريك.\n3. أضف سترات الصوديوم حتى الذوبان.\n4. أضف Decyl Glucoside ثم Coco-Glucoside ببطء مع تحريك لطيف لتجنب الرغوة الزائدة.\n5. أضف العطر والمواد الحافظة.\n6. اضبط pH بحمض الستريك المخفف (المستهدف 5.5–6) ثم اضبط اللزوجة بمحلول الملح عند الحاجة.\n7. اترك المنتج يرتاح ثم تحقق من الشكل وpH واللزوجة وعبّئ.",
    stepsFr:
      "1. Versez l'eau dans un récipient propre.\n2. Prédisperez la gomme xanthane dans la glycérine puis incorporez à l'eau sous agitation.\n3. Ajoutez le citrate de sodium jusqu'à dissolution.\n4. Incorporez lentement le Decyl glucoside puis le Coco-glucoside en mélangeant doucement pour limiter la mousse.\n5. Ajoutez le parfum et le conservateur.\n6. Ajustez le pH avec l'acide citrique dilué (cible 5,5–6) puis la viscosité au sel si besoin.\n7. Laissez reposer, contrôlez aspect, pH et viscosité puis conditionnez.",
  },
  {
    title: "سائل جلي نازع للدهون بالجلوكوزيدات",
    titleFr: "Liquide vaisselle dégraissant naturel",
    order: 44,
    percentages:
      "ماء منزوع الأيونات: 66.2%\nDecyl Glucoside: 15%\nCoco-Glucoside: 8%\nSodium Cocoamphoacetate: 5%\nسترات الصوديوم: 2%\nجليسرين نباتية: 1.5%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.3%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 66.2%\nDecyl glucoside : 15%\nCoco-glucoside : 8%\nSodium cocoamphoacetate : 5%\nCitrate de sodium : 2%\nGlycérine : 1.5%\nGomme xanthane : 0.3%\nParfum : 0.3%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. ضع الماء في الوعاء.\n2. أضف الجليسرين ثم صمغ الزانثان الموزّع مسبقاً فيها.\n3. أضف سترات الصوديوم حتى الذوبان.\n4. أضف مواد التنظيف (Decyl ثم Coco-Glucoside وSodium Cocoamphoacetate) تدريجياً مع التحريك اللطيف.\n5. أضف العطر والمواد الحافظة.\n6. اضبط pH بحمض الستريك (المستهدف 5.5–6.5) وأكمل بالماء إلى 100%.\n7. حرّك بلطف واتركه يتخلص من الهواء قبل التعبئة.",
    stepsFr:
      "1. Versez l'eau dans le récipient.\n2. Ajoutez la glycérine puis la gomme xanthane prédispersée.\n3. Ajoutez le citrate de sodium jusqu'à dissolution.\n4. Incorporez progressivement les tensioactifs (Decyl, Coco-glucoside, Sodium cocoamphoacetate).\n5. Ajoutez le parfum et le conservateur.\n6. Ajustez le pH avec l'acide citrique (cible 5,5–6,5) et complétez à 100 % avec l'eau.\n7. Mélangez doucement et laissez désaérer avant conditionnement.",
  },
  {
    title: "سائل جلي فائق اللطف",
    titleFr: "Liquide vaisselle ultra-doux naturel",
    order: 45,
    percentages:
      "ماء منزوع الأيونات: 69.2%\nDecyl Glucoside: 10%\nCoco-Glucoside: 7%\nSodium Cocoamphoacetate: 8%\nجليسرين نباتية: 3%\nسترات الصوديوم: 1.5%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 69.2%\nDecyl glucoside : 10%\nCoco-glucoside : 7%\nSodium cocoamphoacetate : 8%\nGlycérine : 3%\nCitrate de sodium : 1.5%\nGomme xanthane : 0.3%\nParfum : 0.2%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب سترات الصوديوم في الماء.\n2. رطّب صمغ الزانثان بالجليسرين ثم أضفه للماء مع التحريك.\n3. أضف مواد التنظيف ببطء مع التحريك اللطيف.\n4. أضف العطر والمواد الحافظة.\n5. اضبط pH بحمض الستريك (حوالي 5.5–6) ثم اتركه يرتاح وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate de sodium dans l'eau.\n2. Hydratez la gomme xanthane avec la glycérine puis incorporez-la à l'eau.\n3. Ajoutez les tensioactifs lentement en mélangeant doucement.\n4. Ajoutez le parfum et le conservateur.\n5. Ajustez le pH avec l'acide citrique (environ 5,5–6), laissez reposer puis conditionnez.",
  },
  {
    title: "منظف متعدد الاستعمالات طبيعي",
    titleFr: "Nettoyant multi-usages naturel",
    order: 46,
    percentages:
      "ماء منزوع الأيونات: 80.2%\nDecyl Glucoside: 5%\nCaprylyl/Capryl Glucoside: 4%\nإيثانول: 5%\nسترات الصوديوم: 2%\nجليسرين نباتية: 1%\nبيكربونات الصوديوم: 1%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 80.2%\nDecyl glucoside : 5%\nCaprylyl/Capryl glucoside : 4%\nÉthanol : 5%\nCitrate de sodium : 2%\nGlycérine : 1%\nBicarbonate de sodium : 1%\nParfum : 0.2%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب سترات الصوديوم والبيكربونات في الماء.\n2. أضف مواد التنظيف ببطء مع التحريك.\n3. أضف الإيثانول ثم العطر والمواد الحافظة.\n4. اضبط pH (6–8) واتركه يرتاح ثم عبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez les tensioactifs lentement.\n3. Ajoutez l'éthanol, puis le parfum et le conservateur.\n4. Ajustez le pH (6–8), laissez reposer puis conditionnez.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب والشرر.",
    warningsFr:
      "L'éthanol est inflammable — tenir éloigné des flammes et des étincelles.",
  },
  {
    title: "منظف أرضيات طبيعي (جلوكوزيدات)",
    titleFr: "Nettoyant sols naturel (glucosides)",
    order: 47,
    percentages:
      "ماء منزوع الأيونات: 86.2%\nDecyl Glucoside: 4%\nCaprylyl/Capryl Glucoside: 2%\nإيثانول: 4%\nسترات الصوديوم: 1.5%\nجليسرين نباتية: 1%\nعطر طبيعي: 0.3%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 86.2%\nDecyl glucoside : 4%\nCaprylyl/Capryl glucoside : 2%\nÉthanol : 4%\nCitrate de sodium : 1.5%\nGlycérine : 1%\nParfum : 0.3%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب سترات الصوديوم في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول.\n3. أضف الجليسرين والعطر والمواد الحافظة.\n4. اضبط pH (6–8) وعبّئ بعد الراحة.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Incorporez les tensioactifs puis l'éthanol.\n3. Ajoutez la glycérine, le parfum et le conservateur.\n4. Ajustez le pH (6–8) et conditionnez après repos.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "منظف زجاج ومرايا طبيعي",
    titleFr: "Nettoyant vitres et miroirs naturel",
    order: 48,
    percentages:
      "ماء منزوع الأيونات: 88.2%\nإيثانول: 8%\nDecyl Glucoside: 1.5%\nسترات الصوديوم: 0.5%\nجليسرين نباتية: 0.3%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 88.2%\nÉthanol : 8%\nDecyl glucoside : 1.5%\nCitrate de sodium : 0.5%\nGlycérine : 0.3%\nParfum : 0.2%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب سترات الصوديوم في الماء.\n2. أضف Decyl Glucoside ببطء دون إحداث رغوة زائدة.\n3. أضف الإيثانول ثم الجليسرين والعطر.\n4. أضف المواد الحافظة ثم اضبط pH (5–6) وعبّئ في بخاخ.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez le Decyl glucoside sans créer trop de mousse.\n3. Ajoutez l'éthanol, la glycérine puis le parfum.\n4. Ajoutez le conservateur, ajustez le pH (5–6) puis conditionnez en spray.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "منظف حمّام حمضي طبيعي",
    titleFr: "Nettoyant salle de bain acide naturel",
    order: 49,
    percentages:
      "ماء منزوع الأيونات: 86.5%\nحمض الستريك: 3%\nحمض اللاكتيك: 3%\nDecyl Glucoside: 4%\nسترات الصوديوم: 1%\nإيثانول: 2%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد",
    percentagesFr:
      "Eau : 86.5%\nAcide citrique : 3%\nAcide lactique : 3%\nDecyl glucoside : 4%\nCitrate de sodium : 1%\nÉthanol : 2%\nGomme xanthane : 0.3%\nParfum : 0.2%\nConservateur : selon fournisseur",
    steps:
      "1. رطّب صمغ الزانثان في قليل من الماء أو الجليسرين.\n2. أذب الحمضين (الستريك واللاكتيك) وسترات الصوديوم في الماء.\n3. أضف Decyl Glucoside ببطء مع التحريك.\n4. أضف الإيثانول والعطر والمواد الحافظة.\n5. تحقق من pH (2.5–3.5) واللزوجة ثم عبّئ.",
    stepsFr:
      "1. Hydratez la gomme xanthane dans un peu d'eau ou de glycérine.\n2. Dissolvez les acides (citrique et lactique) et le citrate dans l'eau.\n3. Incorporez doucement le Decyl glucoside.\n4. Ajoutez l'éthanol, le parfum et le conservateur.\n5. Contrôlez le pH (2,5–3,5) et la viscosité puis conditionnez.",
    warnings:
      "لا تخلط أبداً مع الجافيل أو أي منتج كلوري (غاز كلور سام). لا تستخدمه على الرخام أو الحجر الكلسي أو الأسطح الحساسة للأحماض.",
    warningsFr:
      "Ne jamais mélanger avec de l'eau de Javel ou un produit chloré (gaz toxique). Ne pas utiliser sur marbre, pierre calcaire ou surfaces sensibles aux acides.",
  },
  {
    title: "نازع دهون المطبخ الطبيعي",
    titleFr: "Dégraissant cuisine naturel",
    order: 50,
    percentages:
      "ماء منزوع الأيونات: 80.8%\nDecyl Glucoside: 6%\nCaprylyl/Capryl Glucoside: 5%\nإيثانول: 5%\nسترات الصوديوم: 2%\nبيكربونات الصوديوم: 1%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 80.8%\nDecyl glucoside : 6%\nCaprylyl/Capryl glucoside : 5%\nÉthanol : 5%\nCitrate de sodium : 2%\nBicarbonate : 1%\nParfum : 0.2%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب سترات الصوديوم والبيكربونات في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول.\n3. أضف العطر والمواد الحافظة واضبط pH.\n4. حرّك بلطف واتركه يرتاح ثم عبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez les tensioactifs puis l'éthanol.\n3. Ajoutez le parfum et le conservateur, ajustez le pH.\n4. Mélangez doucement, laissez reposer puis conditionnez.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "جل مراحيض بالجلوكوزيدات",
    titleFr: "Gel WC naturel (glucosides)",
    order: 51,
    percentages:
      "ماء منزوع الأيونات: 88.3%\nحمض الستريك: 5%\nحمض اللاكتيك: 3%\nDecyl Glucoside: 2%\nصمغ الزانثان: 1%\nسترات الصوديوم: 0.5%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد",
    percentagesFr:
      "Eau : 88.3%\nAcide citrique : 5%\nAcide lactique : 3%\nDecyl glucoside : 2%\nGomme xanthane : 1%\nCitrate de sodium : 0.5%\nParfum : 0.2%\nConservateur : selon fournisseur",
    steps:
      "1. رطّب صمغ الزانثان جيداً في قليل من الماء البارد.\n2. أذب الحمضين وسترات الصوديوم في الماء.\n3. أضف Decyl Glucoside تدريجياً.\n4. أضف العطر والمواد الحافظة.\n5. اضبط اللزوجة وpH (حوالي 2–3) ثم عبّئ في زجاجة ضيقة الفوهة.",
    stepsFr:
      "1. Hydratez correctement la gomme xanthane dans un peu d'eau froide.\n2. Dissolvez les acides et le citrate dans l'eau.\n3. Ajoutez progressivement le Decyl glucoside.\n4. Incorporez le parfum et le conservateur.\n5. Ajustez la viscosité et le pH (environ 2–3) puis conditionnez en flacon à bec.",
    warnings:
      "لا تخلط أبداً مع الجافيل أو أي منتج كلوري (غاز كلور سام).",
    warningsFr:
      "Ne jamais mélanger avec de la Javel ou un produit chloré (gaz toxique).",
  },
  {
    title: "سائل غسيل ملابس طبيعي شامل",
    titleFr: "Lessive liquide naturelle",
    order: 52,
    percentages:
      "ماء منزوع الأيونات: 76.2%\nDecyl Glucoside: 7%\nCoco-Glucoside: 5%\nصابون بوتاسي سائل: 4%\nسترات الصوديوم: 4%\nجليسرين نباتية: 1.5%\nبيكربونات الصوديوم: 1%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 76.2%\nDecyl glucoside : 7%\nCoco-glucoside : 5%\nSavon liquide de potassium : 4%\nCitrate de sodium : 4%\nGlycérine : 1.5%\nBicarbonate : 1%\nXanthane : 0.3%\nParfum : 0.2%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب سترات الصوديوم والبيكربونات في الماء.\n2. أضف الجليسرين وصمغ الزانثان الموزّع مسبقاً.\n3. أضف مواد التنظيف والصابون البوتاسي ببطء مع التحريك.\n4. أضف العطر والمواد الحافظة واضبط pH (7.5–8.5).\n5. تحقق من الثبات ثم عبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez la glycérine et la gomme xanthane prédispersée.\n3. Incorporez les tensioactifs et le savon de potassium lentement.\n4. Ajoutez le parfum et le conservateur, ajustez le pH (7,5–8,5).\n5. Contrôlez la stabilité puis conditionnez.",
    warnings:
      "تحقق من ثبات الصابون البوتاسي مع باقي المكونات قبل التعميم.",
    warningsFr:
      "Contrôler la stabilité du savon de potassium avec les autres matières avant industrialisation.",
  },
  {
    title: "سائل غسيل ملابس مركّز طبيعي",
    titleFr: "Lessive liquide concentrée naturelle",
    order: 53,
    percentages:
      "ماء منزوع الأيونات: 65.7%\nDecyl Glucoside: 10%\nCoco-Glucoside: 7%\nصابون بوتاسي سائل: 6%\nسترات الصوديوم: 5%\nجليسرين نباتية: 2%\nبيكربونات الصوديوم: 2%\nصمغ الزانثان: 0.5%\nعطر طبيعي: 0.3%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 65.7%\nDecyl glucoside : 10%\nCoco-glucoside : 7%\nSavon de potassium : 6%\nCitrate de sodium : 5%\nGlycérine : 2%\nBicarbonate : 2%\nXanthane : 0.5%\nParfum : 0.3%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف الجليسرين ثم الزانثان الموزّع مسبقاً.\n3. أضف مواد التنظيف والصابون البوتاسي ببطء مع التحريك المستمر.\n4. أضف العطر والمواد الحافظة واضبط pH (7.5–8.5).\n5. راقب ثبات المنتج بعد 24–48 ساعة ثم عبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez la glycérine puis la xanthane prédispersée.\n3. Incorporez les tensioactifs et le savon de potassium lentement sous agitation.\n4. Ajoutez le parfum et le conservateur, ajustez le pH (7,5–8,5).\n5. Surveillez la stabilité après 24–48 h puis conditionnez.",
    warnings:
      "ثبات الصابون البوتاسي يجب التحقق منه تجريبياً خاصة في التركيزات العالية.",
    warningsFr:
      "Vérifier expérimentalement la stabilité du savon de potassium, surtout à forte concentration.",
  },
  {
    title: "سائل غسيل للملابس شديدة الاتساخ",
    titleFr: "Lessive linge très sale naturelle",
    order: 54,
    percentages:
      "ماء منزوع الأيونات: 65.5%\nDecyl Glucoside: 10%\nCoco-Glucoside: 7%\nصابون بوتاسي سائل: 6%\nسترات الصوديوم: 5%\nبيكربونات الصوديوم: 3%\nجليسرين نباتية: 2%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 65.5%\nDecyl glucoside : 10%\nCoco-glucoside : 7%\nSavon de potassium : 6%\nCitrate de sodium : 5%\nBicarbonate : 3%\nGlycérine : 2%\nXanthane : 0.3%\nParfum : 0.2%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف الجليسرين ثم الزانثان الموزّع مسبقاً.\n3. أضف مواد التنظيف والصابون البوتاسي ببطء مع التحريك.\n4. أضف العطر والمواد الحافظة واضبط pH (8–9).\n5. تحقق من الثبات والتوافق مع الأنسجة ثم عبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez la glycérine puis la xanthane prédispersée.\n3. Incorporez les tensioactifs et le savon de potassium lentement.\n4. Ajoutez le parfum et le conservateur, ajustez le pH (8–9).\n5. Contrôlez stabilité et compatibilité textiles puis conditionnez.",
    warnings:
      "تحقق من الثبات والتوافق مع الأنسجة قبل التعميم.",
    warningsFr:
      "Contrôler la stabilité et la compatibilité avec les textiles avant commercialisation.",
  },
  {
    title: "صابون أسود سائل بوتاسي",
    titleFr: "Savon noir liquide potassique",
    order: 55,
    percentages:
      "ماء منزوع الأيونات: 68%\nصابون بوتاسي من زيت الزيتون: 25%\nصابون بوتاسي من زيت جوز الهند: 5%\nجليسرين نباتية: 1.5%\nسترات الصوديوم: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 68%\nSavon potassique d'huile d'olive : 25%\nSavon potassique d'huile de coco : 5%\nGlycérine : 1.5%\nCitrate de sodium : 0.3%\nParfum : 0.2%",
    steps:
      "1. سخّن الماء قليلاً عند الحاجة.\n2. أذب سترات الصوديوم.\n3. أضف الصابون البوتاسي (الزيتون ثم جوز الهند) تدريجياً مع التحريك.\n4. أضف الجليسرين وحرّك حتى التجانس.\n5. أضف العطر بالحرارة المناسبة ثم تحقق من pH والشكل واللزوجة.",
    stepsFr:
      "1. Chauffez légèrement l'eau si nécessaire.\n2. Dissolvez le citrate de sodium.\n3. Ajoutez progressivement les savons potassiques (olive puis coco).\n4. Ajoutez la glycérine et mélangez jusqu'à homogénéité.\n5. Ajoutez le parfum à la température appropriée puis contrôlez pH, aspect et viscosité.",
    warnings:
      "التركيز الفعلي يعتمد على نسبة المادة الفعالة في الصابون البوتاسي المشترى.",
    warningsFr:
      "La concentration réelle dépend de la matière active des savons potassiques achetés.",
  },
  {
    title: "منظف حمّام لطيف طبيعي",
    titleFr: "Nettoyant salle de bain doux naturel",
    order: 56,
    percentages:
      "ماء منزوع الأيونات: 88.3%\nDecyl Glucoside: 4%\nCaprylyl/Capryl Glucoside: 3%\nإيثانول: 2%\nسترات الصوديوم: 1.5%\nبيكربونات الصوديوم: 0.5%\nجليسرين نباتية: 0.3%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد\nحمض الستريك: حسب الحاجة (ضبط pH)",
    percentagesFr:
      "Eau : 88.3%\nDecyl glucoside : 4%\nCaprylyl/Capryl glucoside : 3%\nÉthanol : 2%\nCitrate de sodium : 1.5%\nBicarbonate : 0.5%\nGlycérine : 0.3%\nParfum : 0.2%\nConservateur : selon fournisseur\nAcide citrique : q.s. (pH)",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول والجليسرين.\n3. أضف العطر والمواد الحافظة واضبط pH (6–7).\n4. عبّئ بعد الراحة.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez les tensioactifs puis l'éthanol et la glycérine.\n3. Ajoutez le parfum et le conservateur, ajustez le pH (6–7).\n4. Conditionnez après repos.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "مزيل تكلسات بحمض الستريك",
    titleFr: "Détartrant à l'acide citrique",
    order: 57,
    percentages:
      "ماء منزوع الأيونات: 91.5%\nحمض الستريك: 6%\nسترات الصوديوم: 1%\nDecyl Glucoside: 1%\nإيثانول: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 91.5%\nAcide citrique : 6%\nCitrate de sodium : 1%\nDecyl glucoside : 1%\nÉthanol : 0.3%\nParfum : 0.2%",
    steps:
      "1. أذب حمض الستريك وسترات الصوديوم في الماء.\n2. أضف Decyl Glucoside ببطء.\n3. أضف الإيثانول ثم العطر.\n4. تحقق من pH الحمضي وعبّئ.",
    stepsFr:
      "1. Dissolvez l'acide citrique et le citrate dans l'eau.\n2. Ajoutez le Decyl glucoside lentement.\n3. Ajoutez l'éthanol puis le parfum.\n4. Contrôlez le pH (acide) et conditionnez.",
    warnings:
      "لا تخلط أبداً مع الجافيل أو أي منتج كلوري. تجنّب الرخام والحجر الكلسي.",
    warningsFr:
      "Ne jamais mélanger avec la Javel ou un produit chloré. Éviter marbre et calcaire.",
  },
  {
    title: "منظف زجاج بدون عطر",
    titleFr: "Nettoyant vitres sans parfum",
    order: 58,
    percentages:
      "ماء منزوع الأيونات: 91.5%\nإيثانول: 7%\nDecyl Glucoside: 1%\nسترات الصوديوم: 0.3%\nحمض الستريك: 0.2%",
    percentagesFr:
      "Eau : 91.5%\nÉthanol : 7%\nDecyl glucoside : 1%\nCitrate de sodium : 0.3%\nAcide citrique : 0.2%",
    steps:
      "1. أذب سترات الصوديوم وحمض الستريك في الماء.\n2. أضف Decyl Glucoside ببطء دون رغوة زائدة.\n3. أضف الإيثانول وحرّك بلطف ثم عبّئ في بخاخ.",
    stepsFr:
      "1. Dissolvez le citrate et l'acide citrique dans l'eau.\n2. Ajoutez le Decyl glucoside doucement, sans mousse excessive.\n3. Ajoutez l'éthanol, mélangez doucement puis conditionnez en spray.",
    warnings:
      "بدون عطر — مناسب للأشخاص الحساسين للروائح. الإيثانول قابل للاشتعال.",
    warningsFr:
      "Sans parfum — adapté aux personnes sensibles aux odeurs. L'éthanol est inflammable.",
  },
  {
    title: "منظف ستانلس ستيل",
    titleFr: "Nettoyant inox",
    order: 59,
    percentages:
      "ماء منزوع الأيونات: 91.5%\nإيثانول: 5%\nDecyl Glucoside: 2%\nسترات الصوديوم: 1%\nجليسرين نباتية: 0.3%\nحمض الستريك: 0.2%",
    percentagesFr:
      "Eau : 91.5%\nÉthanol : 5%\nDecyl glucoside : 2%\nCitrate de sodium : 1%\nGlycérine : 0.3%\nAcide citrique : 0.2%",
    steps:
      "1. أذب سترات الصوديوم وحمض الستريك في الماء.\n2. أضف Decyl Glucoside ثم الإيثانول والجليسرين.\n3. حرّك بلطف حتى التجانس ثم عبّئ.\n4. استخدمه بقطعة ميكروفايبر.",
    stepsFr:
      "1. Dissolvez le citrate et l'acide citrique dans l'eau.\n2. Ajoutez le Decyl glucoside puis l'éthanol et la glycérine.\n3. Mélangez doucement jusqu'à homogénéité puis conditionnez.\n4. Appliquer avec une microfibre.",
    warnings:
      "جرّب على منطقة غير ظاهرة قبل الاستخدام. الإيثانول قابل للاشتعال.",
    warningsFr:
      "Tester la compatibilité sur une zone discrète. L'éthanol est inflammable.",
  },
  {
    title: "منظف أرضيات قوي طبيعي",
    titleFr: "Nettoyant sols puissant naturel",
    order: 60,
    percentages:
      "ماء منزوع الأيونات: 80.5%\nDecyl Glucoside: 6%\nCaprylyl/Capryl Glucoside: 4%\nصابون بوتاسي سائل: 3%\nإيثانول: 4%\nسترات الصوديوم: 2%\nبيكربونات الصوديوم: 0.5%\nعطر طبيعي: حسب الحاجة\nمواد حافظة: حسب المورّد",
    percentagesFr:
      "Eau : 80.5%\nDecyl glucoside : 6%\nCaprylyl/Capryl glucoside : 4%\nSavon potassique : 3%\nÉthanol : 4%\nCitrate : 2%\nBicarbonate : 0.5%\nParfum : q.s.\nConservateur : selon fournisseur",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف مواد التنظيف ببطء ثم الصابون البوتاسي.\n3. أضف الإيثانول ثم العطر والمواد الحافظة.\n4. اضبط pH وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez les tensioactifs puis le savon potassique.\n3. Ajoutez l'éthanol, le parfum et le conservateur.\n4. Ajustez le pH et conditionnez.",
    warnings:
      "أعد حساب النسب مع جرعة العطر والمحافظ الفعلية قبل التصنيع. الإيثانول قابل للاشتعال.",
    warningsFr:
      "Recalculer avec le dosage exact du parfum et du conservateur avant fabrication. L'éthanol est inflammable.",
  },
  {
    title: "منظف خشب مطليّ",
    titleFr: "Nettoyant bois vernis",
    order: 61,
    percentages:
      "ماء منزوع الأيونات: 94.3%\nإيثانول: 3%\nDecyl Glucoside: 1%\nسترات الصوديوم: 0.5%\nجليسرين نباتية: 1%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 94.3%\nÉthanol : 3%\nDecyl glucoside : 1%\nCitrate : 0.5%\nGlycérine : 1%\nParfum : 0.2%",
    steps:
      "1. أذب السترات والجليسرين في الماء.\n2. أضف Decyl Glucoside ببطء ثم الإيثانول والعطر.\n3. حرّك بلطف وعبّئ.\n4. استخدم كمية قليلة بقطعة ميكروفايبر مبللة قليلاً.",
    stepsFr:
      "1. Dissolvez le citrate et la glycérine dans l'eau.\n2. Ajoutez le Decyl glucoside puis l'éthanol et le parfum.\n3. Mélangez doucement et conditionnez.\n4. Appliquer peu de produit avec une microfibre légèrement humide.",
    warnings:
      "جرّب على منطقة مخفية أولاً. تجنّب إغراق الخشب بالماء.",
    warningsFr:
      "Tester préalablement sur une zone cachée. Ne pas détremper le bois.",
  },
  {
    title: "منظف بلاستيك وأسطح متنوعة",
    titleFr: "Nettoyant plastiques et surfaces diverses",
    order: 62,
    percentages:
      "ماء منزوع الأيونات: 91.5%\nDecyl Glucoside: 3%\nCaprylyl/Capryl Glucoside: 2%\nإيثانول: 2%\nسترات الصوديوم: 1%\nجليسرين نباتية: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 91.5%\nDecyl glucoside : 3%\nCaprylyl/Capryl glucoside : 2%\nÉthanol : 2%\nCitrate : 1%\nGlycérine : 0.3%\nParfum : 0.2%",
    steps:
      "1. أذب سترات الصوديوم في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول.\n3. أضف الجليسرين والعطر واضبط pH (6–7.5).\n4. عبّئ بعد الراحة.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez les tensioactifs puis l'éthanol.\n3. Ajoutez la glycérine et le parfum, ajustez le pH (6–7,5).\n4. Conditionnez après repos.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "نازع دهون قوي طبيعي",
    titleFr: "Dégraissant puissant naturel",
    order: 63,
    percentages:
      "ماء منزوع الأيونات: 76.5%\nDecyl Glucoside: 8%\nCaprylyl/Capryl Glucoside: 6%\nإيثانول: 5%\nسترات الصوديوم: 3%\nبيكربونات الصوديوم: 1%\nجليسرين نباتية: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 76.5%\nDecyl glucoside : 8%\nCaprylyl/Capryl glucoside : 6%\nÉthanol : 5%\nCitrate : 3%\nBicarbonate : 1%\nGlycérine : 0.3%\nParfum : 0.2%",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول والجليسرين.\n3. أضف العطر واضبط pH (8–9).\n4. عبّئ بعد الراحة.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez les tensioactifs puis l'éthanol et la glycérine.\n3. Ajoutez le parfum et ajustez le pH (8–9).\n4. Conditionnez après repos.",
    warnings:
      "تجنّب الأسطح الحساسة للقلويات وجرّب على الألومنيوم أولاً. الإيثانول قابل للاشتعال.",
    warningsFr:
      "Éviter les surfaces sensibles aux alcalins et tester sur aluminium. L'éthanol est inflammable.",
  },
  {
    title: "منظف حمّام مضاد للتكلس لطيف",
    titleFr: "Nettoyant salle de bain anti-calcaire doux",
    order: 64,
    percentages:
      "ماء منزوع الأيونات: 89.5%\nحمض الستريك: 4%\nحمض اللاكتيك: 2%\nDecyl Glucoside: 3%\nسترات الصوديوم: 1%\nعطر طبيعي: 0.3%\nمواد حافظة: حسب المورّد",
    percentagesFr:
      "Eau : 89.5%\nAcide citrique : 4%\nAcide lactique : 2%\nDecyl glucoside : 3%\nCitrate : 1%\nParfum : 0.3%\nConservateur : selon fournisseur",
    steps:
      "1. أذب الحمضين وسترات الصوديوم في الماء.\n2. أضف Decyl Glucoside ببطء.\n3. أضف العطر والمواد الحافظة وأكمل بالماء إلى 100%.\n4. تحقق من pH الحمضي وعبّئ.",
    stepsFr:
      "1. Dissolvez les acides et le citrate dans l'eau.\n2. Ajoutez le Decyl glucoside lentement.\n3. Ajoutez le parfum et le conservateur, complétez à 100 % avec l'eau.\n4. Contrôlez le pH acide et conditionnez.",
    warnings:
      "لا تستخدمه على الرخام أو الحجر الكلسي الطبيعي. لا تخلط مع الكلور.",
    warningsFr:
      "Ne pas utiliser sur marbre ou calcaire naturel. Ne jamais mélanger avec le chlore.",
  },
  {
    title: "منظف مراحيض رغوي طبيعي",
    titleFr: "Nettoyant WC moussant naturel",
    order: 65,
    percentages:
      "ماء منزوع الأيونات: 89.3%\nحمض الستريك: 4%\nDecyl Glucoside: 3%\nCoco-Glucoside: 2%\nسترات الصوديوم: 1%\nصمغ الزانثان: 0.5%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 89.3%\nAcide citrique : 4%\nDecyl glucoside : 3%\nCoco-glucoside : 2%\nCitrate : 1%\nXanthane : 0.5%\nParfum : 0.2%",
    steps:
      "1. وزّع صمغ الزانثان في قليل من الماء وأضفه للماء مع التحريك.\n2. أذب حمض الستريك وسترات الصوديوم.\n3. أضف Decyl ثم Coco-Glucoside ببطء.\n4. أضف العطر، تحقق من pH (2.5–3.5) واللزوجة ثم عبّئ.",
    stepsFr:
      "1. Dispersez la xanthane dans un peu d'eau puis incorporez-la sous agitation.\n2. Dissolvez l'acide citrique et le citrate.\n3. Ajoutez doucement le Decyl puis le Coco-glucoside.\n4. Ajoutez le parfum, contrôlez pH (2,5–3,5) et viscosité puis conditionnez.",
    warnings:
      "لا تخلط أبداً مع منتج كلوري (غاز سام).",
    warningsFr:
      "Ne jamais mélanger avec un produit chloré (gaz toxique).",
  },
  {
    title: "منظف دُش وحيطات زجاجية",
    titleFr: "Nettoyant douche et parois vitrées",
    order: 66,
    percentages:
      "ماء منزوع الأيونات: 89.3%\nحمض الستريك: 4%\nDecyl Glucoside: 3%\nإيثانول: 2%\nسترات الصوديوم: 1%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد",
    percentagesFr:
      "Eau : 89.3%\nAcide citrique : 4%\nDecyl glucoside : 3%\nÉthanol : 2%\nCitrate : 1%\nParfum : 0.2%\nConservateur : selon fournisseur",
    steps:
      "1. أذب حمض الستريك وسترات الصوديوم في الماء.\n2. أضف Decyl Glucoside ببطء ثم الإيثانول.\n3. أضف العطر والمواد الحافظة وأكمل بالماء إلى 100%.\n4. تحقق من pH (2.5–3.5) وعبّئ في بخاخ.",
    stepsFr:
      "1. Dissolvez l'acide citrique et le citrate dans l'eau.\n2. Ajoutez le Decyl glucoside puis l'éthanol.\n3. Ajoutez le parfum et le conservateur, complétez à 100 %.\n4. Contrôlez le pH (2,5–3,5) et conditionnez en spray.",
    warnings:
      "تجنّب الرخام والحجر الكلسي. الإيثانول قابل للاشتعال. لا تخلط مع الكلور.",
    warningsFr:
      "Éviter marbre et pierre calcaire. L'éthanol est inflammable. Ne jamais mélanger avec le chlore.",
  },
  {
    title: "منظف مطبخ وأسطح غذائية",
    titleFr: "Nettoyant cuisine et surfaces alimentaires",
    order: 67,
    percentages:
      "ماء منزوع الأيونات: 87.8%\nDecyl Glucoside: 4%\nCaprylyl/Capryl Glucoside: 2%\nإيثانول: 3%\nسترات الصوديوم: 1.5%\nبيكربونات الصوديوم: 1%\nجليسرين نباتية: 0.5%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد",
    percentagesFr:
      "Eau : 87.8%\nDecyl glucoside : 4%\nCaprylyl/Capryl glucoside : 2%\nÉthanol : 3%\nCitrate : 1.5%\nBicarbonate : 1%\nGlycérine : 0.5%\nParfum : 0.2%\nConservateur : selon fournisseur",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول والجليسرين.\n3. أضف العطر والمواد الحافظة واضبط pH (6–8).\n4. عبّئ بعد الراحة.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez les tensioactifs puis l'éthanol et la glycérine.\n3. Ajoutez le parfum et le conservateur, ajustez le pH (6–8).\n4. Conditionnez après repos.",
    warnings:
      "هذا المنتج يُنظّف ولا يُعقّم — للأسطح الملامسة للأغذية اشطف بماء صالح للشرب عند الحاجة. الإيثانول قابل للاشتعال.",
    warningsFr:
      "Ce produit nettoie mais n'est pas un désinfectant — pour les surfaces en contact avec les aliments, rincer à l'eau potable si requis. L'éthanol est inflammable.",
  },
  {
    title: "نازع دهون مطبخ قوي",
    titleFr: "Dégraissant cuisine puissant",
    order: 68,
    percentages:
      "ماء منزوع الأيونات: 75.5%\nDecyl Glucoside: 8%\nCaprylyl/Capryl Glucoside: 6%\nإيثانول: 5%\nسترات الصوديوم: 3%\nبيكربونات الصوديوم: 2%\nجليسرين نباتية: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 75.5%\nDecyl glucoside : 8%\nCaprylyl/Capryl glucoside : 6%\nÉthanol : 5%\nCitrate : 3%\nBicarbonate : 2%\nGlycérine : 0.3%\nParfum : 0.2%",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول والجليسرين.\n3. أضف العطر واضبط pH (8–9).\n4. عبّئ بعد الراحة.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez les tensioactifs puis l'éthanol et la glycérine.\n3. Ajoutez le parfum et ajustez le pH (8–9).\n4. Conditionnez après repos.",
    warnings:
      "احذر الأسطح المصنوعة من الألومنيوم. الإيثانول قابل للاشتعال.",
    warningsFr:
      "Attention aux surfaces en aluminium. L'éthanol est inflammable.",
  },
  {
    title: "منظف أرضيات حسّاسة",
    titleFr: "Nettoyant sols délicats",
    order: 69,
    percentages:
      "ماء منزوع الأيونات: 94.5%\nإيثانول: 3%\nDecyl Glucoside: 1%\nسترات الصوديوم: 0.5%\nجليسرين نباتية: 0.8%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 94.5%\nÉthanol : 3%\nDecyl glucoside : 1%\nCitrate : 0.5%\nGlycérine : 0.8%\nParfum : 0.2%",
    steps:
      "1. أذب السترات والجليسرين في الماء.\n2. أضف Decyl Glucoside ببطء ثم الإيثانول والعطر.\n3. تحقق من pH (6–7.5) وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et la glycérine dans l'eau.\n2. Ajoutez le Decyl glucoside puis l'éthanol et le parfum.\n3. Contrôlez le pH (6–7,5) et conditionnez.",
    warnings:
      "مناسب للأسطح الحساسة المتوافقة مع المنظفات المائية — جرّب قبل الاستخدام.",
    warningsFr:
      "Convient aux surfaces délicates compatibles avec un nettoyant aqueux — tester avant utilisation.",
  },
  {
    title: "منظف أثاث وبلاستيك وأسطح",
    titleFr: "Nettoyant meubles, plastiques et surfaces",
    order: 70,
    percentages:
      "ماء منزوع الأيونات: 91.3%\nDecyl Glucoside: 3%\nCaprylyl/Capryl Glucoside: 2%\nإيثانول: 2%\nسترات الصوديوم: 1%\nجليسرين نباتية: 0.5%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 91.3%\nDecyl glucoside : 3%\nCaprylyl/Capryl glucoside : 2%\nÉthanol : 2%\nCitrate : 1%\nGlycérine : 0.5%\nParfum : 0.2%",
    steps:
      "1. أذب السترات في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول والجليسرين.\n3. أضف العطر واضبط pH (6–7.5).\n4. عبّئ بعد الراحة.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez les tensioactifs puis l'éthanol et la glycérine.\n3. Ajoutez le parfum et ajustez le pH (6–7,5).\n4. Conditionnez après repos.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "منظف إينوكس ومعادن",
    titleFr: "Nettoyant inox et métaux",
    order: 71,
    percentages:
      "ماء منزوع الأيونات: 91.3%\nإيثانول: 5%\nDecyl Glucoside: 2%\nسترات الصوديوم: 1%\nجليسرين نباتية: 0.5%\nحمض الستريك: 0.2%",
    percentagesFr:
      "Eau : 91.3%\nÉthanol : 5%\nDecyl glucoside : 2%\nCitrate : 1%\nGlycérine : 0.5%\nAcide citrique : 0.2%",
    steps:
      "1. أذب السترات وحمض الستريك في الماء.\n2. أضف Decyl Glucoside ثم الإيثانول والجليسرين.\n3. حرّك بلطف وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et l'acide citrique dans l'eau.\n2. Ajoutez le Decyl glucoside puis l'éthanol et la glycérine.\n3. Mélangez doucement et conditionnez.",
    warnings:
      "جرّب على منطقة غير ظاهرة أولاً. الإيثانول قابل للاشتعال.",
    warningsFr:
      "Tester sur une zone discrète avant usage. L'éthanol est inflammable.",
  },
  {
    title: "منظف شامل مركّز طبيعي",
    titleFr: "Nettoyant universel concentré naturel",
    order: 72,
    percentages:
      "ماء منزوع الأيونات: 79.3%\nDecyl Glucoside: 7%\nCoco-Glucoside: 5%\nCaprylyl/Capryl Glucoside: 3%\nإيثانول: 3%\nسترات الصوديوم: 2%\nجليسرين نباتية: 0.5%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 79.3%\nDecyl glucoside : 7%\nCoco-glucoside : 5%\nCaprylyl/Capryl glucoside : 3%\nÉthanol : 3%\nCitrate : 2%\nGlycérine : 0.5%\nParfum : 0.2%",
    steps:
      "1. أذب السترات في الماء.\n2. أضف مواد التنظيف الثلاثة ببطء مع التحريك اللطيف.\n3. أضف الإيثانول والجليسرين ثم العطر.\n4. اضبط pH (6–7.5) وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez les trois tensioactifs lentement en mélangeant doucement.\n3. Ajoutez l'éthanol, la glycérine puis le parfum.\n4. Ajustez le pH (6–7,5) et conditionnez.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "منظف مرايا طبيعي",
    titleFr: "Nettoyant miroirs naturel",
    order: 73,
    percentages:
      "ماء منزوع الأيونات: 92%\nإيثانول: 6%\nDecyl Glucoside: 1%\nسترات الصوديوم: 0.5%\nجليسرين نباتية: 0.3%\nحمض الستريك: 0.2%",
    percentagesFr:
      "Eau : 92%\nÉthanol : 6%\nDecyl glucoside : 1%\nCitrate : 0.5%\nGlycérine : 0.3%\nAcide citrique : 0.2%",
    steps:
      "1. أذب السترات وحمض الستريك في الماء.\n2. أضف Decyl Glucoside ببطء ثم الإيثانول والجليسرين.\n3. حرّك بلطف وعبّئ في بخاخ.",
    stepsFr:
      "1. Dissolvez le citrate et l'acide citrique dans l'eau.\n2. Ajoutez le Decyl glucoside puis l'éthanol et la glycérine.\n3. Mélangez doucement et conditionnez en spray.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "منظف بلاط (كراميك)",
    titleFr: "Nettoyant carrelage",
    order: 74,
    percentages:
      "ماء منزوع الأيونات: 88%\nDecyl Glucoside: 4%\nCoco-Glucoside: 2%\nإيثانول: 3%\nسترات الصوديوم: 2%\nحمض الستريك: 0.5%\nجليسرين نباتية: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 88%\nDecyl glucoside : 4%\nCoco-glucoside : 2%\nÉthanol : 3%\nCitrate : 2%\nAcide citrique : 0.5%\nGlycérine : 0.3%\nParfum : 0.2%",
    steps:
      "1. أذب السترات وحمض الستريك في الماء.\n2. أضف Decyl ثم Coco-Glucoside ببطء.\n3. أضف الإيثانول والجليسرين والعطر.\n4. تحقق من pH (5–6.5) وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et l'acide citrique dans l'eau.\n2. Ajoutez le Decyl puis le Coco-glucoside lentement.\n3. Ajoutez l'éthanol, la glycérine et le parfum.\n4. Contrôlez le pH (5–6,5) et conditionnez.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "مزيل تكلسات طبيعي قوي",
    titleFr: "Détartrant naturel",
    order: 75,
    percentages:
      "ماء منزوع الأيونات: 89%\nحمض الستريك: 5%\nحمض اللاكتيك: 2%\nDecyl Glucoside: 2%\nسترات الصوديوم: 1%\nإيثانول: 0.8%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 89%\nAcide citrique : 5%\nAcide lactique : 2%\nDecyl glucoside : 2%\nCitrate : 1%\nÉthanol : 0.8%\nParfum : 0.2%",
    steps:
      "1. أذب الحمضين وسترات الصوديوم في الماء.\n2. أضف Decyl Glucoside ببطء ثم الإيثانول.\n3. أضف العطر وتحقق من pH (2–3.5).\n4. عبّئ في بخاخ.",
    stepsFr:
      "1. Dissolvez les acides et le citrate dans l'eau.\n2. Ajoutez le Decyl glucoside puis l'éthanol.\n3. Ajoutez le parfum et contrôlez le pH (2–3,5).\n4. Conditionnez en spray.",
    warnings:
      "لا تخلط أبداً مع الجافيل أو أي منتج كلوري (غاز سام). تجنّب الرخام والحجر الكلسي.",
    warningsFr:
      "Ne jamais mélanger avec de la Javel ou un produit chloré (gaz toxique). Éviter marbre et calcaire.",
  },
  {
    title: "جل مراحيض طبيعي مركّز",
    titleFr: "Gel WC naturel concentré",
    order: 76,
    percentages:
      "ماء منزوع الأيونات: 88.3%\nحمض الستريك: 5%\nحمض اللاكتيك: 2%\nDecyl Glucoside: 2%\nصمغ الزانثان: 1%\nسترات الصوديوم: 0.5%\nعطر طبيعي: 0.2%\nمواد حافظة: حسب المورّد",
    percentagesFr:
      "Eau : 88.3%\nAcide citrique : 5%\nAcide lactique : 2%\nDecyl glucoside : 2%\nXanthane : 1%\nCitrate : 0.5%\nParfum : 0.2%\nConservateur : selon fournisseur",
    steps:
      "1. وزّع صمغ الزانثان واتركه يتميّأ تماماً.\n2. أذب الحمضين في الطور المائي ثم أضف السترات.\n3. أضف Decyl Glucoside ببطء.\n4. أضف العطر والمواد الحافظة.\n5. تحقق من pH (2–3) واضبط كمية الماء واللزوجة ثم عبّئ.",
    stepsFr:
      "1. Prédispersez la xanthane et laissez hydrater complètement.\n2. Dissolvez les acides dans la phase aqueuse puis ajoutez le citrate.\n3. Incorporez lentement le Decyl glucoside.\n4. Ajoutez le parfum et le conservateur.\n5. Contrôlez le pH (2–3), ajustez eau et viscosité puis conditionnez.",
    warnings:
      "لا تخلط أبداً مع الجافيل أو أي منتج كلوري (غاز سام).",
    warningsFr:
      "Ne jamais mélanger avec de la Javel ou un produit chloré (gaz toxique).",
  },
  {
    title: "منظف حمّام ومغاسل حمضي",
    titleFr: "Nettoyant salle de bain / lavabo",
    order: 77,
    percentages:
      "ماء منزوع الأيونات: 88.5%\nDecyl Glucoside: 4%\nحمض الستريك: 3%\nحمض اللاكتيك: 2%\nسترات الصوديوم: 1%\nإيثانول: 1%\nعطر طبيعي: 0.3%\nجليسرين نباتية: 0.2%",
    percentagesFr:
      "Eau : 88.5%\nDecyl glucoside : 4%\nAcide citrique : 3%\nAcide lactique : 2%\nCitrate : 1%\nÉthanol : 1%\nParfum : 0.3%\nGlycérine : 0.2%",
    steps:
      "1. أذب الحمضين وسترات الصوديوم في الماء.\n2. أضف Decyl Glucoside ببطء ثم الإيثانول والجليسرين والعطر.\n3. تحقق من pH (2.5–4) وعبّئ.",
    stepsFr:
      "1. Dissolvez les acides et le citrate dans l'eau.\n2. Ajoutez le Decyl glucoside puis l'éthanol, la glycérine et le parfum.\n3. Contrôlez le pH (2,5–4) et conditionnez.",
    warnings:
      "لا تخلط مع الكلور. تجنّب الرخام والحجر الكلسي.",
    warningsFr:
      "Ne jamais mélanger avec le chlore. Éviter marbre et pierre calcaire.",
  },
  {
    title: "منظف الأسطح الدهنية",
    titleFr: "Nettoyant surfaces grasses",
    order: 78,
    percentages:
      "ماء منزوع الأيونات: 78.5%\nDecyl Glucoside: 8%\nCoco-Glucoside: 5%\nCaprylyl/Capryl Glucoside: 4%\nإيثانول: 3%\nسترات الصوديوم: 1.5%",
    percentagesFr:
      "Eau : 78.5%\nDecyl glucoside : 8%\nCoco-glucoside : 5%\nCaprylyl/Capryl glucoside : 4%\nÉthanol : 3%\nCitrate : 1.5%",
    steps:
      "1. أذب سترات الصوديوم في الماء.\n2. أضف مواد التنظيف الثلاثة ببطء ثم الإيثانول.\n3. تحقق من pH (6–8) وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez les trois tensioactifs puis l'éthanol.\n3. Contrôlez le pH (6–8) et conditionnez.",
    warnings: "الإيثانول قابل للاشتعال — ابتعد عن اللهب.",
    warningsFr: "L'éthanol est inflammable — tenir éloigné des flammes.",
  },
  {
    title: "منظف أرضيات شديدة الاتساخ",
    titleFr: "Nettoyant sols très sales",
    order: 79,
    percentages:
      "ماء منزوع الأيونات: 82%\nDecyl Glucoside: 5%\nCoco-Glucoside: 3%\nصابون بوتاسي سائل: 4%\nإيثانول: 3%\nسترات الصوديوم: 2%\nبيكربونات الصوديوم: 1%",
    percentagesFr:
      "Eau : 82%\nDecyl glucoside : 5%\nCoco-glucoside : 3%\nSavon liquide de potassium : 4%\nÉthanol : 3%\nCitrate : 2%\nBicarbonate : 1%",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف مواد التنظيف ببطء ثم الصابون البوتاسي.\n3. أضف الإيثانول وحرّك بلطف.\n4. تحقق من pH (8–9) وثبات الصابون ثم عبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez les tensioactifs puis le savon potassique.\n3. Ajoutez l'éthanol et mélangez doucement.\n4. Contrôlez le pH (8–9) et la stabilité du savon puis conditionnez.",
    warnings:
      "يجب التحقق تجريبياً من ثبات الصابون البوتاسي في التركيبة.",
    warningsFr:
      "La stabilité du savon potassique dans la formule doit être vérifiée expérimentalement.",
  },
  {
    title: "منظف سجاد ومنسوجات",
    titleFr: "Nettoyant tapis et textiles lavables",
    order: 80,
    percentages:
      "ماء منزوع الأيونات: 91.5%\nDecyl Glucoside: 3%\nCoco-Glucoside: 2%\nإيثانول: 2%\nسترات الصوديوم: 1%\nجليسرين نباتية: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 91.5%\nDecyl glucoside : 3%\nCoco-glucoside : 2%\nÉthanol : 2%\nCitrate : 1%\nGlycérine : 0.3%\nParfum : 0.2%",
    steps:
      "1. أذب السترات في الماء.\n2. أضف Decyl ثم Coco-Glucoside ببطء ثم الإيثانول والجليسرين والعطر.\n3. تحقق من pH (6–8) وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez le Decyl puis le Coco-glucoside, l'éthanol, la glycérine et le parfum.\n3. Contrôlez le pH (6–8) et conditionnez.",
    warnings:
      "جرّب دائماً على منطقة صغيرة غير ظاهرة قبل الاستخدام.",
    warningsFr:
      "Toujours tester sur une petite zone discrète avant utilisation.",
  },
  {
    title: "منظف أحذية لطيف طبيعي",
    titleFr: "Nettoyant chaussures doux",
    order: 81,
    percentages:
      "ماء منزوع الأيونات: 91.5%\nDecyl Glucoside: 4%\nCoco-Glucoside: 2%\nإيثانول: 1.5%\nسترات الصوديوم: 0.7%\nجليسرين نباتية: 0.3%",
    percentagesFr:
      "Eau : 91.5%\nDecyl glucoside : 4%\nCoco-glucoside : 2%\nÉthanol : 1.5%\nCitrate : 0.7%\nGlycérine : 0.3%",
    steps:
      "1. أذب السترات في الماء.\n2. أضف مواد التنظيف ببطء ثم الإيثانول والجليسرين.\n3. تحقق من pH (6–7.5) وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez les tensioactifs puis l'éthanol et la glycérine.\n3. Contrôlez le pH (6–7,5) et conditionnez.",
    warnings:
      "انتبه خاصة للجلد والشمواه والنوبك — جرّب على منطقة غير ظاهرة أولاً.",
    warningsFr:
      "Attention particulière au cuir, au daim et au nubuck — tester sur une zone discrète.",
  },
  {
    title: "صابون يدين سائل بالجلوكوزيدات",
    titleFr: "Savon liquide mains (glucosides)",
    order: 82,
    percentages:
      "ماء منزوع الأيونات: 76.5%\nDecyl Glucoside: 10%\nCoco-Glucoside: 6%\nSodium Cocoamphoacetate: 5%\nجليسرين نباتية: 2%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 76.5%\nDecyl glucoside : 10%\nCoco-glucoside : 6%\nSodium cocoamphoacetate : 5%\nGlycérine : 2%\nXanthane : 0.3%\nParfum : 0.2%",
    steps:
      "1. ضع الماء في الوعاء.\n2. رطّب صمغ الزانثان بالجليسرين وأضفه للماء مع التحريك.\n3. أضف مواد التنظيف (Decyl ثم Coco-Glucoside وSodium Cocoamphoacetate) ببطء.\n4. أضف العطر واضبط pH (5–6) بحمض الستريك.\n5. اتركه يرتاح ثم عبّئ.",
    stepsFr:
      "1. Versez l'eau dans le récipient.\n2. Hydratez la xanthane dans la glycérine puis incorporez à l'eau sous agitation.\n3. Ajoutez les tensioactifs (Decyl, Coco-glucoside, Sodium cocoamphoacetate) lentement.\n4. Ajoutez le parfum et ajustez le pH (5–6) avec l'acide citrique.\n5. Laissez reposer puis conditionnez.",
    warnings:
      "للتسويق كمنتج تجميلي يجب الالتزام بالاشتراطات التنظيمية واختبارات السلامة والحفظ المعمول بها.",
    warningsFr:
      "Pour une commercialisation comme produit cosmétique, les exigences réglementaires, la sécurité, la conservation et les essais applicables doivent être vérifiés.",
  },
  {
    title: "صابون يدين فائق اللطف",
    titleFr: "Savon mains ultra-doux",
    order: 83,
    percentages:
      "ماء منزوع الأيونات: 78.5%\nSodium Cocoamphoacetate: 8%\nDecyl Glucoside: 7%\nCoco-Glucoside: 4%\nجليسرين نباتية: 2%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 78.5%\nSodium cocoamphoacetate : 8%\nDecyl glucoside : 7%\nCoco-glucoside : 4%\nGlycérine : 2%\nXanthane : 0.3%\nParfum : 0.2%",
    steps:
      "1. ضع الماء في الوعاء.\n2. رطّب الزانثان بالجليسرين وأضفه للماء.\n3. أضف Sodium Cocoamphoacetate ثم Decyl ثم Coco-Glucoside ببطء مع تحريك لطيف جداً لتقليل الرغوة.\n4. أضف العطر واضبط pH (5–6) ثم اتركه يرتاح وعبّئ.",
    stepsFr:
      "1. Versez l'eau dans le récipient.\n2. Hydratez la xanthane dans la glycérine puis incorporez-la.\n3. Ajoutez le Sodium cocoamphoacetate, le Decyl puis le Coco-glucoside très doucement pour limiter la mousse.\n4. Ajoutez le parfum, ajustez le pH (5–6), laissez reposer puis conditionnez.",
    warnings:
      "للتسويق كمنتج تجميلي يجب الالتزام بالاشتراطات التنظيمية واختبارات السلامة والحفظ المعمول بها.",
    warningsFr:
      "Pour une commercialisation comme produit cosmétique, les exigences réglementaires, la sécurité, la conservation et les essais applicables doivent être vérifiés.",
  },
  {
    title: "منظف حمّام طبيعي شامل",
    titleFr: "Nettoyant salle de bain naturel",
    order: 84,
    percentages:
      "ماء منزوع الأيونات: 87%\nDecyl Glucoside: 4%\nCoco-Glucoside: 2%\nحمض الستريك: 3%\nحمض اللاكتيك: 2%\nسترات الصوديوم: 1%\nإيثانول: 0.8%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 87%\nDecyl glucoside : 4%\nCoco-glucoside : 2%\nAcide citrique : 3%\nAcide lactique : 2%\nCitrate : 1%\nÉthanol : 0.8%\nParfum : 0.2%",
    steps:
      "1. أذب الحمضين والسترات في الماء.\n2. أضف Decyl ثم Coco-Glucoside ببطء.\n3. أضف الإيثانول والعطر.\n4. تحقق من pH (2.5–4) وعبّئ.",
    stepsFr:
      "1. Dissolvez les acides et le citrate dans l'eau.\n2. Ajoutez le Decyl puis le Coco-glucoside lentement.\n3. Ajoutez l'éthanol et le parfum.\n4. Contrôlez le pH (2,5–4) et conditionnez.",
    warnings:
      "لا تستخدمه على الرخام أو الحجر الكلسي. لا تخلط أبداً مع الجافيل.",
    warningsFr:
      "Ne pas utiliser sur marbre ou pierre calcaire. Ne jamais mélanger avec de la Javel.",
  },
  {
    title: "منظف مراحيض بدون عطر",
    titleFr: "Nettoyant WC sans parfum",
    order: 85,
    percentages:
      "ماء منزوع الأيونات: 89%\nحمض الستريك: 5%\nحمض اللاكتيك: 3%\nDecyl Glucoside: 2%\nسترات الصوديوم: 1%",
    percentagesFr:
      "Eau : 89%\nAcide citrique : 5%\nAcide lactique : 3%\nDecyl glucoside : 2%\nCitrate : 1%",
    steps:
      "1. أذب الحمضين وسترات الصوديوم في الماء.\n2. أضف Decyl Glucoside ببطء.\n3. تحقق من pH (2–3.5) وعبّئ.",
    stepsFr:
      "1. Dissolvez les acides et le citrate dans l'eau.\n2. Ajoutez le Decyl glucoside lentement.\n3. Contrôlez le pH (2–3,5) et conditionnez.",
    warnings:
      "بدون عطر — مناسب للحساسيات. لا تخلط أبداً مع الجافيل أو أي منتج كلوري.",
    warningsFr:
      "Sans parfum — adapté aux personnes sensibles. Ne jamais mélanger avec de la Javel ou un produit chloré.",
  },
  {
    title: "منظف مطبخ طبيعي",
    titleFr: "Nettoyant cuisine naturel",
    order: 86,
    percentages:
      "ماء منزوع الأيونات: 84.5%\nDecyl Glucoside: 5%\nCoco-Glucoside: 3%\nCaprylyl/Capryl Glucoside: 3%\nإيثانول: 3%\nسترات الصوديوم: 1.5%",
    percentagesFr:
      "Eau : 84.5%\nDecyl glucoside : 5%\nCoco-glucoside : 3%\nCaprylyl/Capryl glucoside : 3%\nÉthanol : 3%\nCitrate : 1.5%",
    steps:
      "1. أذب سترات الصوديوم في الماء.\n2. أضف مواد التنظيف الثلاثة ببطء ثم الإيثانول.\n3. تحقق من pH (6–8) وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez les trois tensioactifs puis l'éthanol.\n3. Contrôlez le pH (6–8) et conditionnez.",
    warnings:
      "للأسطح الملامسة للأغذية اشطف حسب متطلبات الاستخدام. الإيثانول قابل للاشتعال.",
    warningsFr:
      "Pour les surfaces en contact avec les aliments, rincer selon les exigences d'utilisation. L'éthanol est inflammable.",
  },
  {
    title: "سائل جلي مركّز طبيعي",
    titleFr: "Liquide vaisselle concentré naturel",
    order: 87,
    percentages:
      "ماء منزوع الأيونات: 67.5%\nDecyl Glucoside: 12%\nCoco-Glucoside: 8%\nSodium Cocoamphoacetate: 8%\nجليسرين نباتية: 2%\nسترات الصوديوم: 1.5%\nصمغ الزانثان: 0.5%\nعطر طبيعي: 0.2%\nحمض الستريك: 0.3%",
    percentagesFr:
      "Eau : 67.5%\nDecyl glucoside : 12%\nCoco-glucoside : 8%\nSodium cocoamphoacetate : 8%\nGlycérine : 2%\nCitrate : 1.5%\nXanthane : 0.5%\nParfum : 0.2%\nAcide citrique : 0.3%",
    steps:
      "1. ضع الماء في الوعاء وأذب السترات.\n2. وزّع الزانثان في الجليسرين وأضفه للماء.\n3. أضف مواد التنظيف ببطء مع التحريك اللطيف.\n4. أضف العطر ثم حمض الستريك واضبط pH (5.5–6.5) واللزوجة.\n5. اتركه يرتاح قبل التعبئة.",
    stepsFr:
      "1. Versez l'eau et dissolvez le citrate.\n2. Prédispersez la xanthane dans la glycérine puis incorporez-la.\n3. Ajoutez les tensioactifs lentement sous agitation douce.\n4. Ajoutez le parfum puis l'acide citrique, ajustez pH (5,5–6,5) et viscosité.\n5. Laissez reposer avant conditionnement.",
  },
  {
    title: "سائل جلي فائق نزع الدهون",
    titleFr: "Liquide vaisselle ultra-dégraissant",
    order: 88,
    percentages:
      "ماء منزوع الأيونات: 64.8%\nDecyl Glucoside: 14%\nCoco-Glucoside: 8%\nSodium Cocoamphoacetate: 7%\nCaprylyl/Capryl Glucoside: 4%\nسترات الصوديوم: 1.5%\nجليسرين نباتية: 0.5%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 64.8%\nDecyl glucoside : 14%\nCoco-glucoside : 8%\nSodium cocoamphoacetate : 7%\nCaprylyl/Capryl glucoside : 4%\nCitrate : 1.5%\nGlycérine : 0.5%\nParfum : 0.2%",
    steps:
      "1. أذب السترات في الماء.\n2. أضف مواد التنظيف تدريجياً مع تحريك لطيف للحد من الرغوة.\n3. أضف الجليسرين والعطر.\n4. تحقق من pH (6–7) وعبّئ.",
    stepsFr:
      "1. Dissolvez le citrate dans l'eau.\n2. Ajoutez les tensioactifs progressivement sous agitation douce afin de limiter la mousse.\n3. Ajoutez la glycérine et le parfum.\n4. Contrôlez le pH (6–7) et conditionnez.",
  },
  {
    title: "سائل غسيل طبيعي بالصابون البوتاسي",
    titleFr: "Lessive naturelle (savon potassique)",
    order: 89,
    percentages:
      "ماء منزوع الأيونات: 76%\nDecyl Glucoside: 7%\nCoco-Glucoside: 5%\nصابون بوتاسي سائل: 5%\nسترات الصوديوم: 4%\nبيكربونات الصوديوم: 1.5%\nجليسرين نباتية: 1%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 76%\nDecyl glucoside : 7%\nCoco-glucoside : 5%\nSavon liquide de potassium : 5%\nCitrate : 4%\nBicarbonate : 1.5%\nGlycérine : 1%\nXanthane : 0.3%\nParfum : 0.2%",
    steps:
      "1. أذب السترات والبيكربونات في الماء.\n2. أضف الجليسرين ثم الزانثان الموزّع مسبقاً.\n3. أضف مواد التنظيف ثم الصابون البوتاسي ببطء مع التحريك.\n4. أضف العطر واضبط pH (7.5–9).\n5. تحقق من ثبات الصابون وتوافق المكونات ثم عبّئ.",
    stepsFr:
      "1. Dissolvez le citrate et le bicarbonate dans l'eau.\n2. Ajoutez la glycérine puis la xanthane prédispersée.\n3. Incorporez les tensioactifs puis le savon potassique lentement.\n4. Ajoutez le parfum et ajustez le pH (7,5–9).\n5. Contrôlez stabilité du savon et compatibilité puis conditionnez.",
    warnings:
      "ثبات الصابون البوتاسي وتوافقه مع باقي المكونات يجب التحكم فيهما.",
    warningsFr:
      "La stabilité du savon de potassium et la compatibilité avec les autres matières doivent être contrôlées.",
  },
  {
    title: "سائل غسيل مركّز بالصابون البوتاسي",
    titleFr: "Lessive concentrée (savon potassique)",
    order: 90,
    percentages:
      "ماء منزوع الأيونات: 67.5%\nDecyl Glucoside: 10%\nCoco-Glucoside: 7%\nصابون بوتاسي سائل: 7%\nسترات الصوديوم: 5%\nبيكربونات الصوديوم: 2%\nجليسرين نباتية: 1%\nصمغ الزانثان: 0.3%\nعطر طبيعي: 0.2%",
    percentagesFr:
      "Eau : 67.5%\nDecyl glucoside : 10%\nCoco-glucoside : 7%\nSavon liquide de potassium : 7%\nCitrate : 5%\nBicarbonate : 2%\nGlycérine : 1%\nXanthane : 0.3%\nParfum : 0.2%",
    steps:
      "1. حضّر الطور المائي وأذب السترات والبيكربونات.\n2. أضف الجليسرين ورطّب الزانثان وأضفه.\n3. أضف Decyl ثم Coco-Glucoside تدريجياً.\n4. أضف الصابون البوتاسي ثم العطر والمواد الحافظة عند الحاجة.\n5. تحقق من pH (8–9) واللزوجة والشكل والثبات ثم عبّئ.",
    stepsFr:
      "1. Préparez la phase aqueuse et dissolvez citrate et bicarbonate.\n2. Ajoutez la glycérine, hydratez la xanthane et incorporez-la.\n3. Ajoutez progressivement Decyl puis Coco-glucoside.\n4. Ajoutez le savon potassique puis le parfum et le conservateur si nécessaire.\n5. Contrôlez pH (8–9), viscosité, aspect et stabilité puis conditionnez.",
  },
  {
    title: "منعّم منسوجات نباتي",
    titleFr: "Adoucissant textile d'origine végétale",
    order: 91,
    percentages:
      "ماء منزوع الأيونات: 95.3%\nإستركوات نباتي: 4%\nحمض اللاكتيك: 0.3%\nعطر متوافق: 0.2%\nمواد حافظة: حسب المورّد",
    percentagesFr:
      "Eau déminéralisée : 95.3%\nEsterquat d'origine végétale : 4%\nAcide lactique : 0.3%\nParfum compatible : 0.2%\nConservateur : selon fournisseur",
    steps:
      "1. استخدم ماء منزوع الأيونات وسخّنه حسب تعليمات الإستركوات التقنية.\n2. أضف الإستركوات تدريجياً مع التحريك حتى الحصول على توزيعة متجانسة.\n3. بردّ تدريجياً ثم أضف العطر بالحرارة التي يوصي بها المورّد.\n4. أضف المواد الحافظة المتوافقة واضبط pH بحمض اللاكتيك (3–4).\n5. أكمل بالماء إلى 100% وتحقق من الشكل وpH واللزوجة والثبات.",
    stepsFr:
      "1. Utilisez de l'eau déminéralisée et chauffez selon les instructions techniques de l'esterquat.\n2. Ajoutez l'esterquat progressivement sous agitation jusqu'à dispersion homogène.\n3. Refroidissez puis ajoutez le parfum à la température recommandée par son fournisseur.\n4. Ajoutez le conservateur compatible et ajustez le pH avec l'acide lactique (3–4).\n5. Complétez à 100 % avec l'eau et contrôlez aspect, pH, viscosité et stabilité.",
    warnings:
      "لا تخلط منعّم المنسوجات المركّز مباشرة مع منظف غسيل مركّز.",
    warningsFr:
      "Ne pas mélanger directement l'adoucissant concentré avec une lessive concentrée.",
  },
];
