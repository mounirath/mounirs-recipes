/**
 * SECTION 4 — Détergents faits maison (DIY)
 *
 * Recettes réalisables avec des ingrédients du quotidien, sans matières
 * techniques : savon de Marseille râpé, bicarbonate, vinaigre blanc,
 * savon noir, cristaux de soude, citron, huiles essentielles...
 *
 * Toutes les formules totalisent 100 % avec les ingrédients dosés ;
 * les ingrédients « au besoin » (citron, huiles essentielles) sont
 * volontairement exclus du calculateur et mentionnés dans les étapes.
 */

export interface HomemadeFormula {
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

export const HOMEMADE_FORMULAS: HomemadeFormula[] = [
  {
    title: "سائل غسيل الملابس بجبار المرسيليا المبروش",
    titleFr: "Lessive liquide au savon de Marseille râpé",
    order: 92,
    percentages:
      "ماء ساخن: 88%\nجبار مرسيليا مبروش: 8%\nبيكربونات الصوديوم: 3%\nجليسرين نباتية: 1%",
    percentagesFr:
      "Eau chaude : 88%\nSavon de Marseille râpé : 8%\nBicarbonate de soude : 3%\nGlycérine végétale : 1%",
    steps:
      "1. اغلي الماء ثم اسكبه في وعاء كبير.\n2. أضف جبار المرسيليا المبروش وحرّك حتى الذوبان الكامل (10 دقائق).\n3. أضف البيكربونات والجليسرين وحرّك جيداً.\n4. اترك الخليط يبرد طوال الليل — يتحول إلى جل.\n5. حرّك الجل قبل كل استعمال (قد يفصل قليلاً: طبيعي).\n6. العبّئ في قارورة وعاء بلاستيكي نظيف.",
    stepsFr:
      "1. Faites bouillir l'eau puis versez-la dans un grand récipient.\n2. Ajoutez le savon de Marseille râpé et remuez jusqu'à dissolution complète (10 min).\n3. Ajoutez le bicarbonate et la glycérine, mélangez bien.\n4. Laissez refroidir toute la nuit — la lessive prend en gel.\n5. Secouez ou remuez avant chaque utilisation (une légère séparation est normale).\n6. Conditionnez dans des bouteilles propres.",
    warnings:
      "الجرعة: كوب واحد لكل غسلة. للحمل بدرجة عالية: استخدم الجل كمرحّئ مباشر على البقع قبل الغسيل. اختبر على ثوب غير مرئي أولاً للأنسجة الحساسة (الصوف والحرير).",
    warningsFr:
      "Dosage : 1 verre par machine. Pour les taches : frottez le gel directement sur la tache avant lavage. Testez sur une zone discrète pour les textiles délicats (laine, soie).",
  },
  {
    title: "مسحوق غسيل بالجبار والصودا",
    titleFr: "Lessive en poudre savon + cristaux de soude",
    order: 93,
    percentages:
      "جبار مرسيليا مبروش: 40%\nبيكربونات الصوديوم: 30%\nكريستالات الصودا: 30%",
    percentagesFr:
      "Savon de Marseille râpé : 40%\nBicarbonate de soude : 30%\nCristaux de soude : 30%",
    steps:
      "1. ابشر جبار المرسيليا ناعماً (الماندرين أو المغرابجية تسهل العمل).\n2. اخلط الجبار المبروش مع البيكربونات وكريستالات الصودا.\n3. حرّك الخليط جيداً حتى التجانس الكامل.\n4. اترك المسحوق يتفتت قليلاً في الهواء لمدة 24 ساعة (يمنع التكتل).\n5. عبّئ في برطمان محكم الغلق مع ملصق عليه طريقة الاستعمال.",
    stepsFr:
      "1. Râpez finement le savon de Marseille (un râpeur de cuisine convient).\n2. Mélangez le savon râpé avec le bicarbonate et les cristaux de soude.\n3. Remuez jusqu'à homogénéité complète.\n4. Laissez sécher la poudre à l'air libre 24 h (évite les grumeaux).\n5. Conditionnez dans un bocal hermétique avec l'étiquette du dosage.",
    warnings:
      "الجرعة: 2 ملاعق كبيرة لكل غسلة عادية، 3 للملابس شديدة الاتساخ. كريستالات الصودا ت irritate الجلد: ارتدِ قفازات. لا تستعمل للصوف.",
    warningsFr:
      "Dosage : 2 c. à soupe par machine normale, 3 pour le linge très sale. Les cristaux de soude irritent la peau : portez des gants. Ne pas utiliser pour la laine.",
  },
  {
    title: "سائل جلي بالجبار والخل",
    titleFr: "Liquide vaisselle au savon noir",
    order: 94,
    percentages:
      "ماء دافئ: 78%\nسائل جلي الصابون الأسود: 15%\nخل أبيض: 5%\nجليسرين نباتية: 2%",
    percentagesFr:
      "Eau tiède : 78%\nSavon noir liquide : 15%\nVinaigre blanc : 5%\nGlycérine végétale : 2%",
    steps:
      "1. ضع الماء الدافئ في وعاء.\n2. أضف الصابون الأسود السائل وحرّك حتى التجانس.\n3. أضف الخل الأبيض ببطء مع التحريك (يمكن أن يخفف قليلاً).\n4. أضف الجليسرين لتنعيم اليدين.\n5. اترك يرتاح ساعتين ثم تحقق من القوام.\n6. عبّئ في قارورة مضخة (dispenser).",
    stepsFr:
      "1. Versez l'eau tiède dans un récipient.\n2. Ajoutez le savon noir liquide et remuez jusqu'à homogénéité.\n3. Incorporez le vinaigre blanc lentement en remuant (le mélange peut légèrement s'éclaircir).\n4. Ajoutez la glycérine pour adoucir les mains.\n5. Laissez reposer 2 h puis vérifiez la consistance.\n6. Conditionnez dans un flacon pompe.",
    warnings:
      "لا تُغلق فوراً إذا كان الخليط ساخناً: اتركه يبرد أولاً. الخل يمنح رائحة تختفي عند الجفاف. يمكن إضافة قطرات من زيت الليمون للرائحة.",
    warningsFr:
      "Ne fermez pas immédiatement si le mélange est encore chaud : laissez refroidir. L'odeur de vinaigre disparaît au séchage. Quelques gouttes d'huile essentielle de citron peuvent parfumer.",
  },
  {
    title: "منظف متعدد الاستعمالات بالخل والليمون",
    titleFr: "Nettoyant multi-surfaces vinaigre-citron",
    order: 95,
    percentages:
      "خل أبيض: 50%\nماء: 45%\nعصير ليمون: 5%",
    percentagesFr:
      "Vinaigre blanc : 50%\nEau : 45%\nJus de citron : 5%",
    steps:
      "1. اخلط الخل والماء في قارورة بخاخ.\n2. أضف عصير الليمون الطازج (أو قشرات ليمون منقوعة في الخل أسبوعين).\n3. رجّ القارورة جيداً قبل الاستعمال.\n4. رشّ على الأسطح وامسح بقطعة قماش.",
    stepsFr:
      "1. Mélangez le vinaigre et l'eau dans un flacon spray.\n2. Ajoutez le jus de citron frais (ou des zestes de citron macérés 2 semaines dans le vinaigre).\n3. Secouez bien avant chaque utilisation.\n4. Vaporisez sur les surfaces et essuyez avec un chiffon.",
    warnings:
      "لا تستعمل على الرخام أو الحجر الجيري أو الأسطح الحساسة للحمض. لا يُخلط أبداً مع جافيل (يُنتج غازات سامة).",
    warningsFr:
      "Ne pas utiliser sur marbre, pierre calcaire ou surfaces sensibles aux acides. Ne jamais mélanger avec de la Javel (gaz toxiques).",
  },
  {
    title: "منظف الأرضيات بالصابون الأسود واللافندر",
    titleFr: "Nettoyant sols au savon noir et lavande",
    order: 96,
    percentages:
      "ماء: 90%\nسائل الصابون الأسود: 6%\nخل أبيض: 3%\nجليسرين نباتية: 1%",
    percentagesFr:
      "Eau : 90%\nSavon noir liquide : 6%\nVinaigre blanc : 3%\nGlycérine végétale : 1%",
    steps:
      "1. سخّن قليلاً من الماء (لا يغلي).\n2. أضف الصابون الأسود وحرّك حتى الذوبان.\n3. أضف الخل ثم الجليسرين.\n4. أكمل بالماء البارد وحرّك.\n5. عبّئ في قارورة، واستعمل كوباً صغيراً لكل دلو ماء (5 لتر).",
    stepsFr:
      "1. Chauffez un peu d'eau (sans ébullition).\n2. Ajoutez le savon noir et remuez jusqu'à dissolution.\n3. Incorporez le vinaigre puis la glycérine.\n4. Complétez avec l'eau froide et mélangez.\n5. Conditionnez en flacon : utilisez 1 bouchon par seau d'eau (5 L).",
    warnings:
      "للأرضيات الخشبية المطلية: استعمل قطعة قماش مبللة جيداً فقط، لا تسكب المحلول مباشرة. اختبر دائماً على مساحة صغيرة أولاً.",
    warningsFr:
      "Pour les parquets vernis : utilisez une serpillière bien essorée, ne versez pas la solution directement. Testez toujours sur une petite zone.",
  },
  {
    title: "جل مraid الحمام بالكريستالات",
    titleFr: "Gel WC aux cristaux de soude",
    order: 97,
    percentages:
      "ماء: 80%\nكريستالات الصودا: 10%\nصمغ الزانثان: 1%\nخل أبيض: 9%",
    percentagesFr:
      "Eau : 80%\nCristaux de soude : 10%\nGomme xanthane : 1%\nVinaigre blanc : 9%",
    steps:
      "1. أذب كريستالات الصودا في الماء الساخن مع التحريك حتى الذوبان الكامل.\n2. اترك المحلول يبرد.\n3. وزّع صمغ الزانثان في قليل من الخل ثم أضفه للمحلول وحرّك بقوة حتى التكاثف.\n4. أضف بقية الخل وحرّك حتى الحصول على جل متجانس.\n5. اتركه يرتاح لمدة ساعة (يثخن أكثر).\n6. عبّئ في قارورة بفوهة عريضة للسهولة في وضع الجل تحت الحافة.",
    stepsFr:
      "1. Dissolvez les cristaux de soude dans l'eau chaude en remuant jusqu'à dissolution complète.\n2. Laissez refroidir la solution.\n3. Prédisposez la gomme xanthane dans un peu de vinaigre puis incorporez-la en fouettant pour épaissir.\n4. Ajoutez le reste du vinaigre et mélangez jusqu'à obtenir un gel homogène.\n5. Laissez reposer 1 h (le gel épaissit encore).\n6. Conditionnez dans un flacon à bec large pour faciliter l'application sous la cuvette.",
    warnings:
      "ارتدِ قفازات عند التحضير: الكريستالات ت irritate الجلد. لا يُخلط أبداً مع جافيل أو منتجات كلورية. للبقع العنيدة: اترك الجل يتصرف لمدة 30 دقيقة قبل التفريش.",
    warningsFr:
      "Portez des gants lors de la préparation : les cristaux irritent la peau. Ne jamais mélanger avec de la Javel ou un produit chloré. Pour les taches tenaces : laissez agir 30 min avant de frotter.",
  },
  {
    title: "منظف الزجاج بالخل والماء",
    titleFr: "Nettoyant vitres au vinaigre",
    order: 98,
    percentages:
      "ماء: 70%\nخل أبيض: 30%",
    percentagesFr:
      "Eau : 70%\nVinaigre blanc : 30%",
    steps:
      "1. اخلط الماء والخل في قارورة بخاخ.\n2. رجّ قبل الاستعمال.\n3. رشّ على الزجاج وامسح بمسحة مطاطية (raclette) أو ورق جريدة مُخَرَّق.\n4. للمسحات العنيدة: استعمل الخل غير المخفف مباشرة.",
    stepsFr:
      "1. Mélangez l'eau et le vinaigre dans un flacon spray.\n2. Secouez avant utilisation.\n3. Vaporisez sur le verre et essuyez avec une raclette ou du papier journal froissé.\n4. Pour les traces tenaces : utilisez du vinaigre pur directement.",
    warnings:
      "لا تستعمل في الشمس المباشرة (تظهر خطوط). للمرايا: نفس التركيبة تعمل جيداً. لا يُخلط أبداً مع جافيل.",
    warningsFr:
      "Ne pas nettoyer en plein soleil (traces). Fonctionne aussi sur les miroirs. Ne jamais mélanger avec de la Javel.",
  },
  {
    title: "سائل غسل اليدين بجبار المرسيليا",
    titleFr: "Savon liquide mains au savon de Marseille",
    order: 99,
    percentages:
      "ماء ساخن: 85%\nجبار مرسيليا مبروش: 10%\nجليسرين نباتية: 5%",
    percentagesFr:
      "Eau chaude : 85%\nSavon de Marseille râpé : 10%\nGlycérine végétale : 5%",
    steps:
      "1. اغلي الماء واسكبه فوق الجبار المبروش في وعاء.\n2. حرّك حتى الذوبان الكامل (5-10 دقائق).\n3. أضف الجليسرين وحرّك.\n4. اترك الخليط يبرد ويثخن (6-8 ساعات أو طوال الليل).\n5. حرّك بعصا حتى يصبح ناعماً (يمكن استخدام الخلاط اليدوي لثوانٍ).\n6. عبّئ في قارورة مضخة.",
    stepsFr:
      "1. Faites bouillir l'eau et versez-la sur le savon râpé dans un récipient.\n2. Remuez jusqu'à dissolution complète (5-10 min).\n3. Ajoutez la glycérine et mélangez.\n4. Laissez refroidir et épaissir (6-8 h ou toute la nuit).\n5. Fouettez pour lisser (quelques secondes au mixeur plongeant conviennent).\n6. Conditionnez dans un flacon pompe.",
    warnings:
      "القوام يتغير حسب نوع الجبار المستعمل. إذا كان سائلاً جداً: أضف قليلاً من الجبار المبروش وأعد التسخين بلطف. الجل يزداد كثافة بعد يومين.",
    warningsFr:
      "La consistance varie selon le savon utilisé. Trop liquide ? Ajoutez un peu de savon râpé et réchauffez doucement. Le gel épaissit encore après 2 jours.",
  },
  {
    title: "نازع الدهون بالصابون الأسود والصودا",
    titleFr: "Dégraissant cuisine savon noir + bicarbonate",
    order: 100,
    percentages:
      "ماء ساخن: 75%\nسائل الصابون الأسود: 15%\nبيكربونات الصوديوم: 7%\nخل أبيض: 3%",
    percentagesFr:
      "Eau chaude : 75%\nSavon noir liquide : 15%\nBicarbonate de soude : 7%\nVinaigre blanc : 3%",
    steps:
      "1. أذب البيكربونات في الماء الساخن.\n2. أضف الصابون الأسود وحرّك حتى التجانس.\n3. أضف الخل ببطء (سيُحدث رغوة: أضفه تدريجياً).\n4. حرّك حتى استقرار الخليط.\n5. عبّئ في قارورة بخاخ. رجّ قبل كل استعمال.",
    stepsFr:
      "1. Dissolvez le bicarbonate dans l'eau chaude.\n2. Ajoutez le savon noir et remuez jusqu'à homogénéité.\n3. Incorporez le vinaigre lentement (moussage : ajoutez progressivement).\n4. Mélangez jusqu'à stabilisation.\n5. Conditionnez en flacon spray. Secouez avant chaque usage.",
    warnings:
      "فعّال جداً على الدهون المحروقة: رشّ، اترك 10 دقائق، ثم امسح. للفرن: استعمل معجوناً من البيكربونات والماء بدلاً من الرش.",
    warningsFr:
      "Très efficace sur les graisses cuites : vaporisez, laissez agir 10 min puis essuyez. Pour le four : préférez une pâte de bicarbonate et d'eau appliquée au chiffon.",
  },
  {
    title: "معطر ومنظف الأرضيات بالجبار والزيوت",
    titleFr: "Désodorisant sols au savon noir et huiles essentielles",
    order: 101,
    percentages:
      "ماء: 88%\nسائل الصابون الأسود: 8%\nخل أبيض: 3%\nجليسرين نباتية: 1%",
    percentagesFr:
      "Eau : 88%\nSavon noir liquide : 8%\nVinaigre blanc : 3%\nGlycérine végétale : 1%",
    steps:
      "1. اخلط الصابون الأسود مع الجليسرين.\n2. أضف الخل ثم الماء وحرّك بلطف لتجنب الرغوة.\n3. أضف 20-30 قطرة من الزيت العطري المفضل (لافندر، ليمون، نعناع...) في القارورة النهائية.\n4. رجّ جيداً قبل الاستعمال.\n5. استعمل كوباً لكل دلو ماء.",
    stepsFr:
      "1. Mélangez le savon noir avec la glycérine.\n2. Ajoutez le vinaigre puis l'eau en remuant doucement pour limiter la mousse.\n3. Ajoutez 20-30 gouttes d'huile essentielle au choix (lavande, citron, menthe...) dans le flacon final.\n4. Secouez bien avant utilisation.\n5. Utilisez 1 bouchon par seau d'eau.",
    warnings:
      "الزيوت العطرية: احذر عند وجود حيوانات أليفة (بعضها سام للقطط). ابدأ بجرعة صغيرة. لا يُخلط مع جافيل.",
    warningsFr:
      "Huiles essentielles : prudence avec les animaux domestiques (certaines sont toxiques pour les chats). Commencez par une faible dose. Ne jamais mélanger avec de la Javel.",
  },
];
