/**
 * French recipe content keyed by the canonical Arabic title in the DB.
 * The `backfillFrench` mutation patches recipes that are missing their
 * French fields; new recipes can also be inserted with these fields.
 * Percentages keep the same "name: x%" per-line format so the batch
 * calculator keeps working in French.
 */

export interface RecipeFrContent {
  titleFr: string;
  percentagesFr: string;
  stepsFr: string;
  warningsFr?: string;
}

export const FRENCH_RECIPES: Record<string, RecipeFrContent> = {
  /* ------------------------------------------------ Home care 1–22 */
  "سائل غسل الأواني (اقتصادي)": {
    titleFr: "Liquide vaisselle (économique)",
    percentagesFr:
      "SLES ou Texapon : 7.0%\nCocamide DEA : 2.0%\nSel de table NaCl : 2.0%\nFormol : 0.2%\nParfum : 0.3%\nEau : 88.4%",
    stepsFr:
      "1. Versez l'eau dans un récipient propre.\n2. Ajoutez le SLES ou Texapon en remuant continuellement jusqu'à dissolution complète.\n3. Ajoutez le Cocamide DEA et mélangez bien.\n4. Ajoutez le sel de table progressivement en remuant jusqu'à la consistance souhaitée.\n5. Ajoutez le Formol puis le parfum et le colorant (facultatif).\n6. Complétez avec de l'eau jusqu'à 100 % et mélangez jusqu'à homogénéité.\n7. Conditionnez dans des flacons adaptés.",
    warningsFr: "Éviter le contact avec les yeux.\nTenir hors de portée des enfants.",
  },
  "سائل غسل الأواني (جودة أعلى)": {
    titleFr: "Liquide vaisselle (qualité supérieure)",
    percentagesFr:
      "SLES ou Texapon : 10.0%\nBétaïne : 3.0%\nCocamide DEA : 2.0%\nSel NaCl : 1.5%\nFormol : 0.2%\nParfum : 0.3%\nEau : 82.9%",
    stepsFr:
      "1. Versez l'eau dans un récipient propre.\n2. Ajoutez le SLES ou Texapon en remuant continuellement.\n3. Ajoutez la bétaïne puis le Cocamide DEA en remuant.\n4. Ajoutez le sel progressivement en remuant jusqu'à la viscosité souhaitée.\n5. Ajoutez le Formol puis le parfum et le colorant.\n6. Complétez avec de l'eau jusqu'à 100 % et mélangez bien.\n7. Conditionnez dans des flacons hermétiques.",
    warningsFr: "Éviter le contact avec les yeux.\nTenir hors de portée des enfants.",
  },
  "صابون سائل لليدين (اقتصادي)": {
    titleFr: "Savon liquide pour les mains (économique)",
    percentagesFr:
      "SLES ou Texapon : 8.0%\nBétaïne : 2.0%\nSel NaCl : 1.0%\nFormol : 0.2%\nParfum : 0.3%\nEau : 88.4%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le SLES ou Texapon et remuez jusqu'à dissolution.\n3. Ajoutez la bétaïne et mélangez bien.\n4. Ajoutez le sel progressivement pour ajuster la viscosité.\n5. Ajoutez le Formol puis le parfum et le colorant.\n6. Complétez avec de l'eau jusqu'à 100 % et remuez.\n7. Conditionnez dans des flacons.",
    warningsFr: "Convient à un usage quotidien pour les mains.\nÉviter le contact avec les yeux.",
  },
  "مزيل دهون الفرن": {
    titleFr: "Dégraissant pour four",
    percentagesFr:
      "Hydroxyde de sodium NaOH : 2.0%\nSLES ou Texapon : 3.0%\nBétaïne : 1.0%\nButyl Glycol : 2.0%\nFormol : 0.2%\nParfum : 0.2%\nEau : 91.5%",
    stepsFr:
      "1. Attention : portez des gants et des lunettes de protection et assurez-vous d'une bonne ventilation.\n2. Versez l'eau dans un récipient résistant aux alcalis.\n3. Dissolvez la NaOH dans l'eau avec beaucoup de précaution (réaction exothermique).\n4. Ajoutez le SLES ou Texapon en remuant.\n5. Ajoutez la bétaïne puis le Butyl Glycol.\n6. Ajoutez le Formol puis le parfum.\n7. Complétez avec de l'eau jusqu'à 100 % et remuez.\n8. Conditionnez dans des flacons plastiques hermétiques.",
    warningsFr:
      "Corrosif pour la peau et les yeux — portez toujours gants et lunettes de protection.\nTenir hors de portée des enfants.\nNe pas mélanger avec les acides.",
  },
  "مبيض ومطهر (جافيل اقتصادي)": {
    titleFr: "Eau de Javel et désinfectant (économique)",
    percentagesFr:
      "Hypochlorite de sodium NaOCl : 15-16%\nEau : 84.0%",
    stepsFr:
      "1. Attention : ne pas mélanger avec des acides ni des parfums.\n2. Versez l'eau dans un récipient plastique.\n3. Ajoutez le NaOCl progressivement en agitant doucement.\n4. Complétez avec de l'eau jusqu'à 100 %.\n5. Conditionnez dans des flacons opaques hermétiques.\n6. Stockez à l'abri de la lumière et de la chaleur.",
    warningsFr:
      "Danger : les vapeurs de chlore sont toxiques — ne jamais mélanger avec des acides ou l'ammoniaque.\nUtiliser dans un endroit bien ventilé et porter des gants.",
  },
  "سائل غسل الملابس (مرسيليا)": {
    titleFr: "Lessive liquide (Marseille)",
    percentagesFr:
      "SLES : 8.0%\nBétaïne : 1.5%\nCocamide DEA : 1.5%\nSel NaCl : 1.0%\nFormol : 0.2%\nParfum Marseille : 0.3%\nEau : 87.4%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le SLES et remuez jusqu'à dissolution.\n3. Ajoutez la bétaïne puis le Cocamide DEA en remuant.\n4. Ajoutez le sel progressivement pour ajuster la viscosité.\n5. Ajoutez le Formol puis le parfum Marseille.\n6. Complétez avec de l'eau jusqu'à 100 % et remuez.\n7. Conditionnez dans des flacons.",
    warningsFr: "Éviter le contact avec les yeux.\nTenir hors de portée des enfants.",
  },
  "معطر الأرضيات \"صانيبو\"": {
    titleFr: "Parfum de sols « Sanibo »",
    percentagesFr:
      "SLES ou Texapon : 3.0%\nBétaïne : 1.0%\nSel NaCl : 1.0%\nFormol : 0.2%\nParfum : 0.5%\nEau : 94.2%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le SLES ou Texapon et remuez.\n3. Ajoutez la bétaïne et remuez.\n4. Ajoutez le sel progressivement.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons.",
    warningsFr: "Éviter le contact avec les yeux.\nNe pas mélanger avec les produits chlorés.",
  },
  "منظف الأرضيات متعدد الاستعمالات": {
    titleFr: "Nettoyant sols multi-usages",
    percentagesFr:
      "SLES : 6.0%\nBétaïne : 1.0%\nButyl Glycol : 1.0%\nSel NaCl : 0.5%\nFormol : 0.2%\nParfum : 0.3%\nEau : 90.9%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez la bétaïne puis le Butyl Glycol.\n4. Ajoutez le sel progressivement.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons.",
    warningsFr: "Éviter le contact avec les yeux.\nTenir hors de portée des enfants.",
  },
  "منظف الزجاج والمرايا": {
    titleFr: "Nettoyant vitres et miroirs",
    percentagesFr:
      "Eau : 80.0%\nÉthanol ou isopropanol : 15.0%\nSLES ou Bétaïne : 0.5%\nButyl Glycol : 1.0%\nFormol : 0.2%\nParfum : 0.2%\nColorant : 0.1%",
    stepsFr:
      "1. Mélangez l'eau avec l'alcool dans un récipient.\n2. Ajoutez le SLES ou la bétaïne et remuez.\n3. Ajoutez le Butyl Glycol.\n4. Ajoutez le Formol puis le parfum et le colorant.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez en flacon spray.",
    warningsFr:
      "Inflammable — tenir éloigné des flammes et des étincelles.\nUtiliser dans un endroit bien ventilé.",
  },
  "منظف الحمام والمراحيض (مزيل تكلسات)": {
    titleFr: "Nettoyant WC et salle de bain (détartrant)",
    percentagesFr:
      "Acide citrique : 3.0%\nSLES : 2.0%\nBétaïne : 1.0%\nButyl Glycol : 1.0%\nFormol : 0.2%\nParfum : 0.3%\nEau : 92.4%",
    stepsFr:
      "1. Dissolvez l'acide citrique dans un peu d'eau.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez la bétaïne puis le Butyl Glycol.\n4. Ajoutez le Formol puis le parfum.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez en flacon spray.",
    warningsFr:
      "Portez des gants lors de l'utilisation.\nNe pas mélanger avec les produits chlorés (gaz toxique).",
  },
  "سائل غسيل الأواني بدون حمض السلفونيك": {
    titleFr: "Liquide vaisselle sans acide sulfonique",
    percentagesFr:
      "SLES : 2.0%\nCocamide DEA : 0.5%\nButyl Glycol : 1.0%\nSel NaCl : 0.5%\nFormol : 0.2%\nParfum : 0.3%\nEau : 95.4%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez le Cocamide DEA puis le Butyl Glycol.\n4. Ajoutez le sel progressivement.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons.",
    warningsFr: "Éviter le contact avec les yeux.\nTenir hors de portée des enfants.",
  },
  "منظف قوي للإسمنت والشوائب": {
    titleFr: "Nettoyant puissant ciment et impuretés",
    percentagesFr:
      "Acide chlorhydrique (HCl) : 15.0%\nSLES ou Texapon : 1.5%",
    stepsFr:
      "1. Avertissement : portez un équipement de protection complet et assurez-vous de la ventilation.\n2. Versez l'eau dans un récipient résistant aux acides.\n3. Ajoutez le HCl très prudemment (réaction exothermique).\n4. Ajoutez le SLES ou Texapon en remuant.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez dans des flacons plastiques hermétiques.\n7. Ne pas mélanger avec le chlore.",
    warningsFr:
      "Acide fort et corrosif — équipement de protection complet obligatoire (gants, lunettes, masque).\nVapeurs suffoquantes : utilisez en extérieur ou avec ventilation maximale.\nNe jamais mélanger avec le chlore ou les alcalis.",
  },
  "جل تنظيف المراحيض": {
    titleFr: "Gel nettoyant WC",
    percentagesFr:
      "Acide lactique ou citrique : 3.0%\nSLES : 2.0%\nBétaïne : 1.0%\nÉpaississant (Xanthan Gum ou CMC) : 0.5%\nButyl Glycol : 1.0%\nFormol : 0.2%\nParfum : 0.2%\nEau : 92.0%",
    stepsFr:
      "1. Dissolvez l'acide dans un peu d'eau.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez la bétaïne puis le Butyl Glycol.\n4. Dispersez l'épaississant dans un peu d'eau puis ajoutez-le au mélange sous agitation constante jusqu'à l'obtention d'un gel.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons adaptés.",
    warningsFr:
      "Portez des gants lors de l'utilisation.\nNe pas mélanger avec les produits chlorés.",
  },
  "مزيل بقع قبل الغسيل": {
    titleFr: "Détachant pré-lavage",
    percentagesFr:
      "SLES ou Texapon : 5.0%\nBétaïne : 1.0%\nButyl Glycol : 2.0%\nÉthanol : 5.0%\nFormol : 0.2%\nParfum : 0.3%\nEau : 86.3%",
    stepsFr:
      "1. Mélangez l'eau avec l'éthanol.\n2. Ajoutez le SLES ou Texapon et remuez.\n3. Ajoutez la bétaïne puis le Butyl Glycol.\n4. Ajoutez le Formol puis le parfum.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez en flacon spray.",
    warningsFr:
      "Partiellement inflammable — tenir éloigné des flammes.\nTestez d'abord sur une zone cachée du tissu.",
  },
  "ملمع الخشب": {
    titleFr: "Lustrant pour bois",
    percentagesFr:
      "Huile de paraffine légère : 60.0%\nCire d'abeille ou cire de carnauba : 10.0%\nTérébenthine : 20.0%\nParfum boisé : 0.5%\nAntioxydant : 0.5%",
    stepsFr:
      "1. Dissolvez la cire dans l'huile de paraffine au bain-marie tiède.\n2. Ajoutez la térébenthine progressivement en remuant.\n3. Ajoutez le parfum et l'antioxydant.\n4. Laissez refroidir puis conditionnez dans des flacons adaptés.",
    warningsFr:
      "La térébenthine est inflammable — tenir éloigné des flammes et des étincelles.\nUtiliser dans un endroit bien ventilé.",
  },
  "منظف الأحذية الجلدية": {
    titleFr: "Nettoyant chaussures en cuir",
    percentagesFr:
      "SLES : 2.0%\nSel NaCl : 0.5%\nButyl Glycol : 1.0%\nFormol : 0.2%\nParfum : 0.3%\nEau : 96.0%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez le sel puis le Butyl Glycol.\n4. Ajoutez le Formol puis le parfum.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez en flacon spray.",
    warningsFr:
      "Testez d'abord sur une zone cachée.\nÉviter le contact avec les yeux.",
  },
  "منظف الحمام اليومي": {
    titleFr: "Nettoyant salle de bain quotidien",
    percentagesFr:
      "SLES ou Texapon : 3.0%\nBétaïne : 1.0%\nButyl Glycol : 1.0%\nSel NaCl : 0.5%\nParfum : 0.3%\nFormol : 0.2%\nEau : 93.9%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le SLES ou Texapon et remuez.\n3. Ajoutez la bétaïne puis le Butyl Glycol.\n4. Ajoutez le sel progressivement.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons.",
    warningsFr: "Éviter le contact avec les yeux.\nNe pas mélanger avec les produits chlorés.",
  },
  "بخاخ طارد الحشرات المنزلية": {
    titleFr: "Spray répulsif insectes domestiques",
    percentagesFr:
      "SLES : 1.0%\nEau : 88.8%\nÉthanol : 8.0%\nHuile répulsive (citronnelle ou lemongrass) : 1.5%\nFormol : 0.2%\nParfum : 0.4%",
    stepsFr:
      "1. Mélangez l'eau avec l'éthanol.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez l'huile répulsive.\n4. Ajoutez le Formol puis le parfum.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez en flacon spray.",
    warningsFr:
      "Inflammable — tenir éloigné des flammes.\nÉviter de pulvériser sur le visage ou la peau sensible, et hors de portée des enfants.",
  },
  "مزيل الروائح للقمامة": {
    titleFr: "Désodorisant poubelle",
    percentagesFr:
      "SLES : 1.0%\nBétaïne : 0.5%\nEau : 93.0%\nÉthanol : 5.0%\nHuile essentielle (citron ou orange) : 0.8%\nConservateur : 0.2%",
    stepsFr:
      "1. Mélangez l'eau avec l'éthanol.\n2. Ajoutez le SLES et la bétaïne.\n3. Ajoutez l'huile essentielle.\n4. Ajoutez le conservateur.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez en flacon spray.",
    warningsFr: "Partiellement inflammable.\nÉviter le contact avec les yeux.",
  },
  "منظف الأحواض والمغاسل": {
    titleFr: "Nettoyant éviers et lavabos",
    percentagesFr:
      "SLES : 4.0%\nBétaïne : 1.0%\nSel NaCl : 1.0%\nButyl Glycol : 1.0%\nFormol : 0.2%\nParfum : 0.3%\nEau : 92.4%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez la bétaïne puis le Butyl Glycol.\n4. Ajoutez le sel progressivement.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons.",
    warningsFr: "Éviter le contact avec les yeux.\nTenir hors de portée des enfants.",
  },
  "منظف الأحذية الرياضية والقماشية": {
    titleFr: "Nettoyant baskets et tissus",
    percentagesFr:
      "SLES : 3.0%\nBétaïne : 1.0%\nÉthanol : 5.0%\nButyl Glycol : 1.0%\nSel NaCl : 0.5%\nFormol : 0.2%\nParfum : 0.3%\nEau : 88.9%",
    stepsFr:
      "1. Mélangez l'eau avec l'éthanol.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez la bétaïne puis le Butyl Glycol.\n4. Ajoutez le sel progressivement.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons.",
    warningsFr:
      "Testez d'abord sur une zone cachée.\nPartiellement inflammable — tenir éloigné des flammes.",
  },
  "منظف المعادن والتلميع": {
    titleFr: "Nettoyant et lustrant métaux",
    percentagesFr:
      "Acide citrique ou lactique : 2.0%\nSLES : 2.0%\nBétaïne : 1.0%\nButyl Glycol : 1.0%\nSel NaCl : 0.5%\nFormol : 0.2%\nParfum : 0.2%\nEau : 93.0%",
    stepsFr:
      "1. Dissolvez l'acide dans un peu d'eau.\n2. Ajoutez le SLES et remuez.\n3. Ajoutez la bétaïne puis le Butyl Glycol.\n4. Ajoutez le sel progressivement.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons.",
    warningsFr:
      "Portez des gants lors de l'utilisation.\nNe pas utiliser sur les métaux sensibles sans test préalable.",
  },

  /* ------------------------------------------------ Car care 23–32 */
  "شامبو السيارات": {
    titleFr: "Shampooing auto",
    percentagesFr:
      "Texapon N70 : 8.0%\nCDE : 2.0%\nPropylène Glycol : 2.0%\nAcide citrique : 0.5%\nFormol : 0.2%\nParfum : 0.5%\nEau : 86.8%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le Texapon N70 en remuant jusqu'à dissolution.\n3. Ajoutez le CDE et remuez.\n4. Ajoutez le propylène glycol.\n5. Diluez l'acide citrique dans un peu d'eau et ajoutez-le pour ajuster le pH.\n6. Ajoutez le Formol puis le parfum.\n7. Complétez avec de l'eau jusqu'à 100 %.\n8. Conditionnez dans des flacons.",
    warningsFr:
      "Portez des gants et des lunettes lors de la manipulation des produits chimiques.\nÉviter le contact avec les yeux et l'ingestion.",
  },
  "منتج تنظيف زجاج السيارات": {
    titleFr: "Nettoyant vitres auto",
    percentagesFr:
      "Isopropanol : 10.0%\nPropylène Glycol : 5.0%\nTexapon N70 : 2.0%\nAcide citrique : 0.3%\nFormol : 0.2%\nEau : 82.5%",
    stepsFr:
      "1. Mélangez l'eau avec l'isopropanol.\n2. Ajoutez le Texapon N70 et remuez.\n3. Ajoutez le propylène glycol.\n4. Diluez l'acide citrique dans un peu d'eau et ajoutez-le.\n5. Ajoutez le Formol.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez en flacon spray.",
    warningsFr:
      "Inflammable (isopropanol) — tenir éloigné des flammes.\nUtiliser dans un endroit bien ventilé.",
  },
  "منتج تلميع لوحة القيادة (تابلوه)": {
    titleFr: "Rénovateur tableau de bord",
    percentagesFr:
      "Propylène Glycol : 5.0%\nCétiol C5 : 10.0%\nIsopropanol : 7.0%\nGlycérine : 3.0%\nFormol : 0.5%\nEau : 74.5%",
    stepsFr:
      "1. Mélangez l'eau avec l'isopropanol.\n2. Ajoutez le Cétiol C5 et remuez.\n3. Ajoutez le propylène glycol puis la glycérine.\n4. Ajoutez le Formol.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez en flacon spray.",
    warningsFr: "Utiliser dans un endroit bien ventilé. Éviter le contact avec les yeux.",
  },
  "منتج تنظيف المحرك من الزيوت والشحوم": {
    titleFr: "Dégraissant moteur (huiles et graisses)",
    percentagesFr:
      "Butyl Glycol : 10.0%\nTexapon N70 : 8.0%\nPropylène Glycol : 5.0%\nCétiol C5 : 3.0%\nFormol : 0.2%\nEau : 73.8%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le Texapon N70 en remuant.\n3. Ajoutez le Butyl Glycol puis le propylène glycol.\n4. Ajoutez le Cétiol C5.\n5. Ajoutez le Formol.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez dans des flacons.",
    warningsFr:
      "Portez des gants et des lunettes de protection.\nTenir éloigné des sources d'étincelles et de flammes pendant l'utilisation.",
  },
  "منتج La Mousse لتنظيف السيارات": {
    titleFr: "Nettoyant mousse auto « La Mousse »",
    percentagesFr:
      "Texapon N70 : 10.0%\nCDE : 3.0%\nPropylène Glycol : 2.0%\nAcide citrique : 0.5%\nFormol : 0.3%\nParfum : 0.1%\nEau : 83.9%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le Texapon N70 en remuant.\n3. Ajoutez le CDE puis le propylène glycol.\n4. Diluez l'acide citrique dans un peu d'eau et ajoutez-le.\n5. Ajoutez le Formol puis le parfum.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez en flacons à mousse.",
    warningsFr:
      "Éviter le contact avec les yeux.\nStocker à l'abri du soleil et de la chaleur.",
  },
  "منتج مبرد محرك السيارة": {
    titleFr: "Liquide de refroidissement moteur",
    percentagesFr:
      "Monoéthylène glycol (MEG) : 50.0%\nEau distillée : 48.0%\nInhibiteur de corrosion : 1.5%\nAnti-mousse : 0.3%\nColorant : 0.2%",
    stepsFr:
      "1. Mélangez le MEG avec l'eau distillée.\n2. Ajoutez l'inhibiteur de corrosion en remuant.\n3. Ajoutez l'anti-mousse.\n4. Ajoutez le colorant.\n5. Remuez bien jusqu'à homogénéité.\n6. Conditionnez dans des contenants adaptés.",
    warningsFr:
      "Toxique en cas d'ingestion — tenir hors de portée des enfants et des animaux.\nÉviter le contact avec la peau et les yeux.",
  },
  "منتج مزيل الضباب من الزجاج الداخلي": {
    titleFr: "Anti-buée vitres intérieures",
    percentagesFr:
      "Isopropanol : 20.0%\nPropylène Glycol : 5.0%\nEau distillée : 73.0%\nFormol : 0.5%\nColorant : 0.2%",
    stepsFr:
      "1. Mélangez l'eau avec l'isopropanol.\n2. Ajoutez le propylène glycol.\n3. Ajoutez le Formol.\n4. Ajoutez le colorant.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez en flacon spray.",
    warningsFr:
      "Inflammable — tenir éloigné des flammes et des étincelles.\nPulvérisez dans un endroit bien ventilé.",
  },
  "منتج عطر السيارات": {
    titleFr: "Parfum d'habitacle",
    percentagesFr:
      "Propylène Glycol : 10.0%\nHuile essentielle : 5.0%\nEau distillée : 85.0%\nFormol : 0.5%",
    stepsFr:
      "1. Mélangez le propylène glycol avec l'huile essentielle.\n2. Ajoutez l'eau distillée progressivement en remuant.\n3. Ajoutez le Formol.\n4. Remuez bien.\n5. Conditionnez en flacon spray.",
    warningsFr:
      "Éviter le contact avec les yeux et la peau sensible.\nStocker à l'abri de la chaleur.",
  },
  "منتج تنظيف وتجديد عجلات السيارة": {
    titleFr: "Nettoyant et rénovateur de jantes",
    percentagesFr:
      "Texapon N70 : 7.0%\nPropylène Glycol : 3.0%\nC.O.D : 5.0%\nAcide citrique : 1.0%\nFormol : 0.3%\nEau : 83.7%",
    stepsFr:
      "1. Versez l'eau dans un récipient.\n2. Ajoutez le Texapon N70 en remuant.\n3. Ajoutez le propylène glycol puis le C.O.D.\n4. Diluez l'acide citrique dans un peu d'eau et ajoutez-le.\n5. Ajoutez le Formol.\n6. Complétez avec de l'eau jusqu'à 100 %.\n7. Conditionnez en flacon spray.",
    warningsFr:
      "Portez des gants lors de l'utilisation.\nÉviter de pulvériser sur les freins ou les composants électriques.",
  },
  "سائل مساحات الزجاج": {
    titleFr: "Liquide lave-glace",
    percentagesFr:
      "Eau distillée : 70.0%\nIsopropanol : 20.0%\nTensioactif : 1.0%\nPropylène Glycol : 5.0%\nFormol : 0.2%\nParfum : 0.2%",
    stepsFr:
      "1. Mélangez l'eau avec l'isopropanol.\n2. Ajoutez le tensioactif et remuez.\n3. Ajoutez le propylène glycol.\n4. Ajoutez le Formol puis le parfum.\n5. Complétez avec de l'eau jusqu'à 100 %.\n6. Conditionnez dans des contenants.",
    warningsFr:
      "Inflammable — tenir éloigné des flammes.\nNe pas utiliser en cas de fort gel sans ajuster les proportions.",
  },

  /* ------------------------------------------------ Prototypes 33–34 */
  "مطهر أسطح متعدد الاستخدامات": {
    titleFr: "Désinfectant surfaces multi-usages",
    percentagesFr:
      "Eau distillée : 80%\nAlcool éthylique : 19%\nHuile d'arbre à thé : 1%",
    stepsFr:
      "1. Versez l'eau distillée dans un flacon en verre propre.\n2. Ajoutez l'alcool éthylique et mélangez bien.\n3. Ajoutez l'huile d'arbre à thé et mélangez jusqu'à homogénéité.\n4. Transvasez dans un flacon spray stérilisé.",
    warningsFr:
      "Inflammable — tenir éloigné des flammes et des sources de chaleur.\nÉviter tout contact direct avec les yeux.",
  },
  "ملمع طلاء السيارة (Wax)": {
    titleFr: "Cire pour carrosserie (Wax)",
    percentagesFr:
      "Cire de carnauba : 30%\nSilicone liquide : 40%\nSolvant pétrolier : 30%",
    stepsFr:
      "1. Mélangez la cire avec le solvant au bain-marie tiède (60 degrés).\n2. Ajoutez le silicone liquide progressivement en remuant constamment.\n3. Laissez refroidir complètement le mélange avant utilisation.",
    warningsFr: "Utiliser dans un endroit bien ventilé. Éviter d'inhaler les vapeurs.",
  },
  /* ------------------------------------------------ Natural 35–42 */
  "سائل غسيل طبيعي (صابون مرسيليا)": {
    titleFr: "Lessive liquide naturelle (savon de Marseille)",
    percentagesFr:
      "Savon de Marseille râpé : 10%\nBicarbonate de soude : 2%\nEau : 88%",
    stepsFr:
      "1. Faites chauffer la moitié de l'eau dans un grand récipient (sans bouillir).\n2. Ajoutez le savon râpé et remuez jusqu'à dissolution complète.\n3. Dissolvez le bicarbonate dans un peu d'eau tiède et ajoutez-le.\n4. Complétez avec le reste d'eau et mélangez bien.\n5. Laissez refroidir et gélifier puis conditionnez en flacons.\n6. Agitez avant chaque utilisation.",
    warningsFr:
      "Naturel et doux pour la peau.\nNe pas utiliser sur la laine ni la soie (savon alcalin).",
  },
  "سائل جلي طبيعي (صابون أسود)": {
    titleFr: "Liquide vaisselle naturel (savon noir)",
    percentagesFr:
      "Savon noir liquide : 12%\nBicarbonate de soude : 1.5%\nVinaigre blanc : 2%\nEau : 84.5%",
    stepsFr:
      "1. Versez l'eau tiède dans un récipient.\n2. Ajoutez le savon noir et remuez jusqu'à homogénéité.\n3. Ajoutez le bicarbonate dissous dans un peu d'eau.\n4. Ajoutez le vinaigre progressivement à la fin (une légère mousse peut se former).\n5. Mélangez, laissez refroidir puis conditionnez en flacon pompe.",
    warningsFr:
      "Ajoutez le vinaigre lentement à la fin.\nÉviter le contact avec les yeux.",
  },
  "منظف متعدد الأسطح بالخل والليمون": {
    titleFr: "Nettoyant multi-surfaces vinaigre-citron",
    percentagesFr:
      "Vinaigre blanc : 25%\nEau : 74%\nHuile essentielle de citron : 1%",
    stepsFr:
      "1. Mélangez l'eau avec le vinaigre.\n2. Ajoutez l'huile essentielle et remuez.\n3. Transvasez dans un flacon spray.\n4. Secouez avant usage et essuyez les surfaces avec un chiffon.",
    warningsFr:
      "Ne pas utiliser sur le marbre, la pierre naturelle ou le bois non traité.\nNe jamais mélanger avec l'eau de Javel (gaz chlore toxique).",
  },
  "مسحوق غسيل طبيعي (صابون + بيكربونات)": {
    titleFr: "Lessive en poudre naturelle (savon + bicarbonate)",
    percentagesFr:
      "Savon de Marseille râpé : 50%\nBicarbonate de soude : 30%\nCristaux de soude : 20%",
    stepsFr:
      "1. Râpez le savon finement.\n2. Mélangez le savon avec le bicarbonate et les cristaux de soude.\n3. Conservez la poudre dans un récipient hermétique.\n4. Utilisez 2 cuillères à soupe par lavage (directement dans le tambour).",
    warningsFr:
      "Conserver au sec (risque de grumelage).\nParticulièrement adapté au coton.",
  },
  "معطر أرضيات طبيعي (صابون أسود)": {
    titleFr: "Nettoyant sols naturel (savon noir)",
    percentagesFr:
      "Savon noir liquide : 5%\nVinaigre blanc : 5%\nHuile essentielle de lavande : 0.5%\nEau : 89.5%",
    stepsFr:
      "1. Versez l'eau dans un seau.\n2. Ajoutez le savon noir et remuez.\n3. Ajoutez le vinaigre puis l'huile essentielle.\n4. Lavez le sol normalement — sans rinçage nécessaire.",
    warningsFr:
      "Adapté au carrelage et à la céramique.\nÉviter le marbre et le bois non traité.",
  },
  "جل حمام طبيعي (حمض الستريك)": {
    titleFr: "Gel WC naturel (acide citrique)",
    percentagesFr:
      "Acide citrique : 4%\nGomme xanthane : 0.6%\nHuile essentielle d'eucalyptus : 0.4%\nEau : 95%",
    stepsFr:
      "1. Dissolvez l'acide citrique dans la moitié de l'eau.\n2. Dispersez la gomme xanthane dans un peu d'eau froide (ou prémélangez-la avec l'huile essentielle) pour éviter les grumeaux.\n3. Ajoutez le mélange en remuant constamment jusqu'à obtenir un gel.\n4. Ajoutez l'huile essentielle à la fin.\n5. Conditionnez dans un flacon à bec étroit.",
    warningsFr:
      "Portez des gants lors de la préparation.\nNe jamais mélanger avec les produits chlorés.",
  },
  "منظف زجاج طبيعي (خل وليمون)": {
    titleFr: "Nettoyant vitres naturel (vinaigre-citron)",
    percentagesFr:
      "Vinaigre blanc : 20%\nEau : 79.5%\nHuile essentielle de citron : 0.5%",
    stepsFr:
      "1. Mélangez l'eau avec le vinaigre dans un flacon spray.\n2. Ajoutez l'huile essentielle.\n3. Secouez légèrement avant usage.\n4. Vaporisez sur le vitrage et essuyez avec un chiffon microfibre.",
    warningsFr:
      "Éviter les surfaces chromées ou sensibles aux acides.\nNe jamais mélanger avec le chlore.",
  },
  "صابون يدين طبيعي (كاستيل)": {
    titleFr: "Savon liquide mains naturel (Castille)",
    percentagesFr:
      "Savon de Castille liquide : 25%\nGlycérine végétale : 2%\nHuile essentielle (lavande ou citron) : 0.5%\nEau distillée : 72.5%",
    stepsFr:
      "1. Versez l'eau distillée dans un récipient.\n2. Ajoutez le savon de Castille doucement pour éviter la mousse.\n3. Ajoutez la glycérine végétale.\n4. Ajoutez l'huile essentielle et remuez délicatement.\n5. Laissez reposer quelques heures puis conditionnez en pompe.",
    warningsFr:
      "Doux pour la peau, adapté à un usage quotidien.\nÉviter le contact avec les yeux.",
  },
};

/** Optional video-less patch content type for inserts (Arabic + French). */
export type RecipeFrPatch = RecipeFrContent;

/** Get the French patch for a given Arabic title, if any. */
export function frenchFor(title: string): RecipeFrPatch | undefined {
  return FRENCH_RECIPES[title];
}
