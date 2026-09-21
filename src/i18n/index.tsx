import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Lang = "ar" | "fr" | "en";

/** Flat dot-key dictionary so both languages stay in sync. */
export type Dict = Record<string, string>;

const ar: Dict = {
  /* Brand */
  "brand.tagline": "وصفات التنظيف والعناية",

  /* Landing nav */
  "nav.sections": "الأقسام",
  "nav.why": "لماذا نحن",
  "nav.offers": "العروض",
  "nav.login": "دخول المشتركين",
  "nav.recipes": "الوصفات",

  /* Hero */
  "hero.badge": "منصة وصفات حصرية للمشتركين",
  "hero.title1": "وصفات احترافية مع حاسبة",
  "hero.title2": "ومواد أولية موثوقة",
  "hero.subtitle":
    "مكتبة وصفات المنظفات والعناية بالسيارات، مع حاسبة دفعات من 1 إلى 1000 كغ، ومواصفات كاملة لكل مادة أولية.",
  "hero.explore": "استكشف الوصفات",
  "hero.viewOffers": "شاهد العروض والأسعار",
  "hero.lockNote": "الوصول للمحتوى يتطلب اشتراكاً فعّالاً",

  /* Sections cards */
  "sections.cleaners.title": "القسم الأول",
  "sections.cleaners.subtitle": "منظفات منزلية",
  "sections.cleaners.desc":
    "مطهرات أسطح، معطرات أرضيات، سوائل جلي — تركيبات يومية لبيت أكثر نظافة.",
  "sections.cars.title": "القسم الثاني",
  "sections.cars.subtitle": "العناية بالسيارات",
  "sections.cars.desc":
    "ملمعات، شامبو، منظف داخلي — كل ما يحتاجه طلاء سيارتك ومقصورتها.",
  "sections.natural.title": "القسم الثالث",
  "sections.natural.subtitle": "منظفات طبيعية",
  "sections.natural.desc":
    "صابون طبيعي، خل وبيكربونات — تركيبات بسيطة وآمنة من مكونات طبيعية 100%.",
  "sections.homemade.title": "القسم الرابع",
  "sections.homemade.subtitle": "وصفات منزلية بسيطة — مجاناً",
  "free.title": "وصفات منزلية بسيطة",
  "free.subtitle":
    "10 وصفات كاملة مجاناً وبدون حساب — بمكونات متوفرة في كل بيت. جربها اليوم!",
  "free.badge": "مجاناً — بدون حساب",
  "free.cta.signIn": "دخول المشتركين",
  "free.upsell.title": "تريد المزيد؟",
  "free.upsell.text":
    "أكثر من 90 وصفة احترافية إضافية: منظفات منزلية، مواد عناية بالسيارات، دترجنتات طبيعية بمواد أولية مهنية — مع حاسبة الكميات من 1 إلى 1000 كغ.",
  "free.upsell.cta": "اكتشف العروض",
  "sections.homemade.desc":
    "جبار مبشور، خل، بيكربونات — وصفات سهلة جداً بمكونات متوفرة في كل مطبخ، بدون مواد تقنية.",

  /* Features */
  "features.calc.title": "حاسبة دفعات ذكية",
  "features.calc.text":
    "احسب كميات كل مادة من 1 كغ إلى 1000 كغ بضغطة زر — بدون حساب يدوي.",
  "features.safety.title": "أمان في الاستخدام",
  "features.safety.text":
    "تحذيرات سلامة واضحة مع كل تركيبة وكل مادة أولية لاستخدام مسؤول.",
  "features.materials.title": "قسم المواد الأولية",
  "features.materials.text":
    "مواصفات كل مادة، وظيفتها، وبدائلها المتاحة عند عدم توفرها.",

  /* Pricing */
  "pricing.badge": "عروض الاشتراك",
  "pricing.title": "اختر عرضك المناسب",
  "pricing.subtitle":
    "أسعار واضحة بلا مفاجآت — اختر الباقة والمدة التي تناسبك، ثم فعّل اشتراكك بالكود الذي يصلك بعد التسديد.",
  "pricing.table.pkg": "الباقة",
  "pricing.table.duration": "المدة",
  "pricing.table.price": "السعر",
  "pricing.pkg.home": "مواد تنظيف منزلية",
  "pricing.pkg.cars": "مواد عناية بالسيارات",
  "pricing.pkg.all": "جميع الوصفات",
  "pricing.dur.month": "شهر",
  "pricing.dur.year": "سنة",
  "pricing.dur.lifetime": "مدى الحياة",
  "pricing.note.month": "ينتهي بعد 30 يوماً",
  "pricing.note.year": "ينتهي بعد 365 يوماً",
  "pricing.save58": "وفّر 58%",
  "pricing.save56": "وفّر 56%",
  "pricing.note.lifetime": "لا ينتهي أبداً — كل الأقسام + حاسبة الدفعات",
  "pricing.best": "العرض الأكمل",
  "pricing.howto":
    "للاشتراك: تواصل معنا، وستستلم كود تفعيل من 8 خانات عبر البريد أو الرسالة.",
  "pricing.packagesTitle": "الباقات",
  "pricing.pkg.home.desc":
    "القسم الأول كاملاً + القسمان الطبيعي والمنزلي — 90 وصفة عملية.",
  "pricing.pkg.cars.desc": "القسم الثاني كاملاً: العناية بالسيارات — 11 وصفة احترافية.",
  "pricing.pkg.all.desc":
    "الأقسام الأربعة معاً: 101 وصفة بكل المكتبة + قسم المواد الأولية — الخيار الأوفر.",
  "pricing.mostValue": "الأوفر",
  "pricing.durationsTitle": "مدد الاشتراك",
  "pricing.dur.month.text": "ينتهي تلقائياً بعد 30 يوماً — مثالي للتجربة.",
  "pricing.dur.year.text": "ينتهي بعد 365 يوماً — أفضل للاستمرار.",
  "pricing.dur.lifetime.text": "لا ينتهي أبداً — وصول دائم بلا تجديد.",
  "pricing.renew":
    "انتهت مدتك؟ تواصل مع الإدارة لتجديد اشتراكك بنفس الباقة أو ترقيتها.",
  "pricing.activate": "فعّل اشتراكك الآن",

  /* Inside section */
  "inside.badge": "داخل المنصة",
  "inside.title": "ثلاثة أقسام، عشرات الوصفات، تجربة واحدة",
  "inside.text":
    "بعد دخولك برمز الاشتراك ستجد جميع الوصفات مصنفة في ثلاثة أقسام واضحة، مع بحث فوري وحاسبة دفعات مدمجة وعرض تفصيلي لكل وصفة: النسب، خطوات التحضير، تحذيرات السلامة وقسم كامل للمواد الأولية.",
  "inside.li1": "بحث فوري في كل الوصفات والمواد الأولية",
  "inside.li2": "حاسبة دفعات مدمجة: من 1 كغ إلى 1000 كغ لكل وصفة",
  "inside.li3": "قسم المواد الأولية: المواصفات والسلامة والبدائل",
  "inside.li4": "تصنيف واضح بين المنظفات المنزلية والعناية بالسيارات والمنتجات الطبيعية",
  "inside.li5": "قسم جديد: منظفات طبيعية من مكونات بسيطة وآمنة",
  "inside.cta": "ابدأ الآن",
  "inside.notesTitle": "ملاحظات هامة لجميع الوصفات",
  "inside.notesBadge": "تأكد قبل البدء",
  "inside.n1": "النسب المئوية: احرص على دقة القياس بميزان حساس.",
  "inside.n2": "الترتيب: أضف المكونات بالترتيب المذكور لضمان التجانس.",
  "inside.n3": "التحريك: استخدم خلاطاً كهربائياً أو حرك يدوياً باستمرار.",
  "inside.n4":
    "السلامة: ارتدِ قفازات ونظارات وكمامات عند التعامل مع المواد الكيميائية.",
  "inside.n5": "التخزين: خزن المنتجات في مكان بارد وجاف بعيداً عن الشمس.",
  "inside.n6": "الصلاحية: معظم المنتجات تبقى صالحة من 12 إلى 18 شهراً.",

  /* Footer */
  "footer.rights": "جميع الحقوق محفوظة",
  "footer.admin": "دخول الإدارة",

  /* Language */
  "lang.switch": "Français",
  "lang.switching": "تغيير اللغة...",

  /* Auth page */
  "auth.title": "دخول المشتركين",
  "auth.subtitle": "أدخل بريدك الإلكتروني ورمز الاشتراك للوصول إلى مكتبة الوصفات",
  "auth.code": "رمز الاشتراك (8 خانات)",
  "auth.email": "البريد الإلكتروني",
  "auth.send": "إرسال",
  "auth.sending": "جارٍ الإرسال...",
  "auth.emailError": "تعذّر إرسال رمز التحقق، حاول مرة أخرى.",
  "auth.otpTitle": "تحقق من بريدك",
  "auth.otpSent": "أرسلنا رمزاً إلى",
  "auth.otpError": "رمز التحقق غير صحيح، حاول مرة أخرى.",
  "auth.resend": "أعد المحاولة",
  "auth.noCode": "لم يصلك الرمز؟",
  "auth.verify": "جارٍ التحقق...",
  "auth.confirm": "تأكيد الرمز",
  "auth.otherEmail": "استخدام بريد آخر",
  "auth.footer": "محتوى حصري للمشتركين — Formule DZ",
  "auth.back": "العودة للرئيسية",
  "auth.hint":
    "الدخول للمشتركين فقط: أدخل رمز الاشتراك الذي حصلت عليه ثم بريدك — ستصلك رسالة برمز التحقق لتأكيد الدخول.",

  /* Recipes page */
  "recipes.title": "مكتبة الوصفات",
  "recipes.subtitle": "اضغط على أي وصفة لعرض النسب وحاسبة الدفعة وخطوات التحضير",
  "recipes.materialsTitle": "قسم المواد الأولية",
  "recipes.materialsSubtitle": "مواصفات كل مادة أولية، إرشادات السلامة، والبدائل المتاحة",
  "recipes.searchRecipes": "ابحث في الوصفات...",
  "recipes.searchMaterials": "ابحث في المواد...",
  "recipes.tabRecipes": "الوصفات",
  "recipes.tabMaterials": "المواد الأولية",
  "recipes.clearSearch": "مسح البحث",
  "recipes.gate.title": "تنشيط الاشتراك",
  "recipes.gate.text": "أدخل رمز الاشتراك المكوّن من 8 خانات للوصول إلى مكتبة الوصفات",
  "recipes.gate.activate": "تفعيل الكود",
  "recipes.gate.badLength": "أدخل كوداً مكوناً من 8 خانات",
  "recipes.gate.error": "حدث خطأ، حاول مرة أخرى",
  "recipes.gate.durations":
    "المدد المتاحة: شهر (ينتهي تلقائياً بعد 30 يوماً) · سنة (ينتهي بعد 365 يوماً) · مدى الحياة (لا ينتهي أبداً).",
  "recipes.gate.noCode": "لا تملك رمزاً؟ تواصل معنا للحصول على اشتراك.",
  "recipes.signout": "خروج",
  "recipes.subscriber": "مشترك",
  "recipes.pkg.all": "كل الباقات",
  "recipes.pkg.home": "باقة منزلية",
  "recipes.pkg.cars": "باقة سيارات",
  "recipes.cat.all": "الكل",
  "recipes.cat.cleaners": "منظفات منزلية",
  "recipes.cat.cars": "العناية بالسيارات",
  "theme.toggle": "تبديل الوضع الفاتح/الداكن",
  "recipes.cat.natural": "منظفات طبيعية",
  "recipes.cat.homemade": "وصفات منزلية بسيطة",
  "recipes.cat.favorites": "المفضلة ⭐",
  "recipes.fav.add": "أضف إلى المفضلة",
  "recipes.fav.remove": "إزالة من المفضلة",
  "recipes.cat.cleaners.short": "منزلي",
  "recipes.cat.cars.short": "سيارات",
  "recipes.cat.natural.short": "طبيعي",
  "recipes.cat.homemade.short": "منزلي بسيط",
  "recipes.cat.cleaners.heading": "القسم الأول",
  "recipes.cat.cars.heading": "القسم الثاني",
  "recipes.cat.natural.heading": "القسم الثالث",
  "recipes.cat.homemade.heading": "القسم الرابع",
  "recipes.cat.cleaners.sub": "وصفات المنظفات المنزلية",
  "recipes.cat.cars.sub": "وصفات العناية بالسيارات",
  "recipes.cat.natural.sub": "وصفات المنظفات الطبيعية",
  "recipes.cat.homemade.sub": "وصفات بسيطة بمكونات متوفرة في كل بيت",
  "recipes.count": "وصفة",
  "recipes.steps": "خطوات",
  "recipes.empty.title": "لا توجد وصفات بعد",
  "recipes.empty.text": "سيتم إضافة الوصفات قريباً — تابعنا لمزيد من التركيبات.",
  "recipes.noResults.title": "لا نتائج مطابقة",
  "recipes.noResults.text": "جرّب كلمات بحث مختلفة أو غيّر التصنيف.",
  "recipes.pct.title": "النسب المئوية",
  "recipes.stepsTitle": "طريقة التحضير",
  "recipes.warningsTitle": "تحذيرات السلامة",
  "recipes.signoutTitle": "تسجيل الخروج؟",
  "recipes.signoutText": "ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى الوصفات.",
  "recipes.cancel": "إلغاء",
  "recipes.signoutConfirm": "خروج",

  /* RecipeBits */
  "calc.title": "حاسبة الدفعة",
  "calc.range": "من 1 كغ إلى 1000 كغ",
  "calc.kg": "كغ",
  "calc.batchSize": "حجم الدفعة بالكيلوغرام",
  "calc.copy": "نسخ الجدول",
  "calc.copied": "تم النسخ",
  "calc.material": "المادة",
  "calc.pct": "النسبة",
  "calc.kgCol": "كغ",
  "calc.gCol": "غرام",
  "calc.total": "المجموع",
  "calc.sumWarning":
    "مجموع النسب في هذه الوصفة {total}% — المتبقي يُكمَّل ماءً حسب خطوات التحضير.",
  "calc.noLines": "لا توجد نسب قابلة للحساب في هذه الوصفة",
  "calc.copyHeader": "دفعة {batch} كغ",
  "calc.copyTotal": "مجموع النسب: {total}%",

  /* Materials */
  "materials.intro.title": "قسم المواد الأولية",
  "materials.intro.text":
    "تعرّف على كل مادة أولية تُستخدم في الوصفات: وظيفتها، مواصفاتها الفنية، إرشادات السلامة، والبدائل المتاحة عند عدم توفرها — اضغط على أي مادة لعرض التفاصيل.",
  "materials.intro.searchHint":
    "استخدم خانة البحث أعلى الصفحة لتصفية المواد بالاسم أو الوظيفة.",
  "materials.badge": "مادة أولية",
  "materials.roleTitle": "الوظيفة والوصف",
  "materials.specsTitle": "المواصفات الفنية",
  "materials.safetyTitle": "السلامة والتخزين",
  "materials.altTitle": "البدائل المتاحة",
  "materials.viewSpecs": "عرض المواصفات",
  "materials.noResults.title": "لا نتائج مطابقة",
  "materials.noResults.text": "جرّب اسماً مختلفاً للمادة أو ابحث بوظيفتها.",
  "materials.safetyNote":
    "نصيحة عامة: قبل استخدام أي مادة جديدة، اطلب ورقة بيانات السلامة (FDS) من المورد، وارتدِ دائماً قفازات ونظارات عند التعامل مع المواد الكيميائية المركزة.",

  /* Access errors (server messages keyed by code) */
  "access.signinFirst": "سجّل الدخول أولاً",
  "access.verifyFailed": "تعذّر التحقق من حسابك",
  "access.already": "لديك وصول بالفعل",
  "access.badCode": "الكود غير صحيح",
  "access.usedByOther": "هذا الكود مستخدم من قبل حساب آخر",
  "access.ok": "تم تنشيط اشتراكك بنجاح",
  "access.canContinue": "الكود صحيح — يمكنك المتابعة",

  /* Admin */
  "admin.panel": "لوحة الإدارة",
  "admin.recipes": "الوصفات",
  "admin.signout": "خروج",
  "admin.stat.total": "إجمالي الوصفات",
  "admin.stat.cleaners": "منظفات منزلية",
  "admin.stat.cars": "العناية بالسيارات",
  "admin.stat.natural": "منظفات طبيعية",
  "admin.stat.homemade": "وصفات منزلية بسيطة",
  "admin.stat.subs": "المشتركون",
  "admin.form.add": "إضافة وصفة جديدة",
  "admin.form.edit": "تعديل وصفة",
  "admin.form.cancelEdit": "إلغاء التعديل",
  "admin.form.category": "القسم",
  "admin.form.title": "عنوان الوصفة",
  "admin.form.titlePh": "مثال: معطر أرضيات",
  "admin.form.pct": "النسب المئوية (سطر لكل مكوّن)",
  "admin.form.steps": "طريقة التحضير *",
  "admin.form.warnings": "تحذيرات السلامة",
  "admin.form.video": "رابط فيديو يوتيوب (اختياري)",
  "admin.form.save": "حفظ التعديلات",
  "admin.form.addBtn": "إضافة الوصفة",
  "admin.form.clear": "مسح",
  "admin.codes.title": "أكواد الوصول",
  "admin.codes.slots": "8 خانات",
  "admin.codes.notePh": "ملاحظة (اختياري) — مثال: باقة أكتوبر",
  "admin.codes.generate": "توليد كود",
  "admin.codes.empty": "لا توجد أكواد بعد — ولّد أول كود وشاركه مع مشتركينك.",
  "admin.codes.used": "مستخدم",
  "admin.codes.available": "متاح",
  "admin.codes.copy": "نسخ",
  "admin.codes.delete": "حذف",
  "admin.list.title": "الوصفات الحالية",
  "admin.list.empty": "لا توجد وصفات بعد — أضف أول وصفة من النموذج.",
  "admin.subs.title": "إدارة الأعضاء والاشتراكات",
  "admin.subs.searchPh": "بحث بالبريد...",
  "admin.subs.empty": "لا يوجد أعضاء بعد.",
  "admin.subs.registered": "مسجّل",
  "admin.subs.expired": "منتهي",
  "admin.subs.none": "بدون باقة",
  "admin.subs.edit": "تعديل الاشتراك",
  "admin.subs.revoke": "إلغاء الاشتراك",
  "admin.subs.expires": "ينتهي",
  "admin.subs.pkg": "الباقة",
  "admin.subs.duration": "المدة",
  "admin.subs.save": "حفظ الاشتراك",
  "admin.pkg.home": "باقة منزلية",
  "admin.pkg.cars": "باقة سيارات",
  "admin.pkg.all": "كل الباقات",
  "admin.pkg.none": "بدون باقة",
  "admin.dur.month": "شهر",
  "admin.dur.year": "سنة",
  "admin.dur.lifetime": "مدى الحياة",
  "admin.delete.title": "حذف الوصفة؟",
  "admin.delete.text": "سيتم حذف الوصفة نهائياً ولا يمكن التراجع عن ذلك.",
  "admin.delete.confirm": "حذف نهائي",
  "admin.codeDelete.title": "حذف كود الوصول؟",
  "admin.codeDelete.text": "لن يتمكن من يستخدم هذا الكود من الاشتراك بعد الحذف.",
  "admin.codeDelete.confirm": "حذف نهائي",
  "admin.unauthorized": "غير مصرح بالدخول",
  "admin.unauthorized.text":
    "هذه المنطقة مخصصة للإدارة فقط. إذا كنت تملك حساب الأدمن، سجّل الدخول بالبريد الإلكتروني المخصص للإدارة.",
  "admin.toast.subSaved": "تم تحديث اشتراك",
  "admin.toast.subSaveFail": "تعذّر حفظ الاشتراك",
  "admin.toast.revoked": "تم إلغاء اشتراك",
  "admin.toast.codeGenerated": "تم توليد الكود",
  "admin.toast.codeCopyHint": "انقر على زر النسخ لنسخه",
  "admin.toast.codeGenFail": "تعذّر توليد الكود، حاول مرة أخرى",
  "admin.toast.copied": "تم نسخ",
  "admin.toast.copyFail": "تعذّر النسخ — انسخ الكود يدوياً",
  "admin.toast.codeDeleted": "تم حذف الكود",

  /* Misc */
  "common.loading": "جارٍ التحميل...",
  "common.home": "الرئيسية",
  "notfound.title": "الصفحة غير موجودة",
};

const fr: Dict = {
  /* Brand */
  "brand.tagline": "Recettes de nettoyage & d'entretien",

  /* Landing nav */
  "nav.sections": "Sections",
  "nav.why": "Pourquoi nous",
  "nav.offers": "Offres",
  "nav.login": "Espace abonnés",
  "nav.recipes": "Recettes",

  /* Hero */
  "hero.badge": "Plateforme de recettes exclusive aux abonnés",
  "hero.title1": "Recettes professionnelles avec calculateur",
  "hero.title2": "et matières premières fiables",
  "hero.subtitle":
    "Bibliothèque de recettes de détergents et d'entretien auto, avec calculateur de lots de 1 à 1000 kg et fiches complètes pour chaque matière première.",
  "hero.explore": "Explorer les recettes",
  "hero.viewOffers": "Voir les offres et tarifs",
  "hero.lockNote": "L'accès au contenu nécessite un abonnement actif",

  /* Sections cards */
  "sections.cleaners.title": "Section 1",
  "sections.cleaners.subtitle": "Détergents ménagers",
  "sections.cleaners.desc":
    "Désinfectants, parfums de sol, liquides vaisselle — des formulations quotidiennes pour une maison plus propre.",
  "sections.cars.title": "Section 2",
  "sections.cars.subtitle": "Entretien automobile",
  "sections.cars.desc":
    "Cires, shampoings, nettoyants intérieurs — tout pour la carrosserie et l'habitacle de votre voiture.",
  "sections.natural.title": "Section 3",
  "sections.natural.subtitle": "Détergents naturels",
  "sections.natural.desc":
    "Savons naturels, vinaigre et bicarbonate — des formules simples et sûres à base d'ingrédients 100 % naturels.",
  "sections.homemade.title": "Section 4",
  "sections.homemade.subtitle": "Recettes maison faciles — gratuites",
  "free.title": "Recettes maison faciles",
  "free.subtitle":
    "10 recettes complètes gratuitement, sans compte — avec des ingrédients du quotidien. Essayez dès aujourd'hui !",
  "free.badge": "Gratuit — sans compte",
  "free.cta.signIn": "Espace abonnés",
  "free.upsell.title": "Vous voulez plus ?",
  "free.upsell.text":
    "Plus de 90 recettes professionnelles supplémentaires : détergents ménagers, soins auto, détergents naturels à base de matières premières pro — avec calculateur de lots 1 à 1000 kg.",
  "free.upsell.cta": "Découvrir les offres",
  "sections.homemade.desc":
    "Savon râpé, vinaigre, bicarbonate — des recettes très simples avec des ingrédients que tout le monde a dans sa cuisine, sans matières techniques.",

  /* Features */
  "features.calc.title": "Calculateur de lots intelligent",
  "features.calc.text":
    "Calculez la quantité de chaque ingrédient de 1 kg à 1000 kg en un clic — sans calcul manuel.",
  "features.safety.title": "Sécurité d'utilisation",
  "features.safety.text":
    "Des avertissements clairs avec chaque formule et chaque matière première pour un usage responsable.",
  "features.materials.title": "Section matières premières",
  "features.materials.text":
    "Fiche technique de chaque matière, son rôle et les alternatives disponibles en cas de rupture.",

  /* Pricing */
  "pricing.badge": "Offres d'abonnement",
  "pricing.title": "Choisissez votre offre",
  "pricing.subtitle":
    "Des prix clairs sans surprise — choisissez le pack et la durée qui vous conviennent, puis activez votre abonnement avec le code reçu après paiement.",
  "pricing.table.pkg": "Pack",
  "pricing.table.duration": "Durée",
  "pricing.table.price": "Prix",
  "pricing.pkg.home": "Produits ménagers",
  "pricing.pkg.cars": "Produits auto",
  "pricing.pkg.all": "Toutes les recettes",
  "pricing.dur.month": "Mois",
  "pricing.dur.year": "Année",
  "pricing.dur.lifetime": "À vie",
  "pricing.note.month": "Expire après 30 jours",
  "pricing.note.year": "Expire après 365 jours",
  "pricing.save58": "Économisez 58%",
  "pricing.save56": "Économisez 56%",
  "pricing.note.lifetime":
    "N'expire jamais — toutes les sections + le calculateur de lots",
  "pricing.best": "Offre complète",
  "pricing.howto":
    "Pour s'abonner : contactez-nous et vous recevrez un code d'activation à 8 caractères par e-mail ou SMS.",
  "pricing.packagesTitle": "Les packs",
  "pricing.pkg.home.desc":
    "Section 1 complète + sections naturelle et maison — 90 recettes pratiques.",
  "pricing.pkg.cars.desc":
    "Section 2 complète : entretien automobile — 11 recettes professionnelles.",
  "pricing.pkg.all.desc":
    "Les quatre sections : 101 recettes + section matières premières — le choix le plus avantageux.",
  "pricing.mostValue": "Le plus avantageux",
  "pricing.durationsTitle": "Durées d'abonnement",
  "pricing.dur.month.text": "Expire automatiquement après 30 jours — idéal pour essayer.",
  "pricing.dur.year.text": "Expire après 365 jours — le mieux pour la continuité.",
  "pricing.dur.lifetime.text": "N'expire jamais — accès permanent sans renouvellement.",
  "pricing.renew":
    "Abonnement expiré ? Contactez l'administration pour le renouveler ou passer à un pack supérieur.",
  "pricing.activate": "Activer mon abonnement",

  /* Inside section */
  "inside.badge": "Dans la plateforme",
  "inside.title": "Trois sections, des dizaines de recettes, une seule expérience",
  "inside.text":
    "Après connexion avec votre code d'abonnement, retrouvez toutes les recettes classées en trois sections claires, avec recherche instantanée, calculateur de lots intégré et fiche détaillée pour chaque recette : proportions, étapes de préparation, avertissements de sécurité et une section complète de matières premières.",
  "inside.li1": "Recherche instantanée dans toutes les recettes et matières",
  "inside.li2": "Calculateur intégré : de 1 kg à 1000 kg pour chaque recette",
  "inside.li3": "Section matières premières : fiches techniques, sécurité et alternatives",
  "inside.li4": "Clarté entre détergents ménagers, entretien automobile et produits naturels",
  "inside.li5": "Nouvelle section : détergents naturels à base d'ingrédients simples et sûrs",
  "inside.cta": "Commencer maintenant",
  "inside.notesTitle": "Notes importantes pour toutes les recettes",
  "inside.notesBadge": "À vérifier avant de commencer",
  "inside.n1": "Pourcentages : veillez à la précision avec une balance sensible.",
  "inside.n2": "Ordre : ajoutez les ingrédients dans l'ordre indiqué pour l'homogénéité.",
  "inside.n3": "Agitation : utilisez un mélangeur électrique ou remuez continuellement.",
  "inside.n4":
    "Sécurité : portez gants, lunettes et masque lors de la manipulation de produits chimiques.",
  "inside.n5": "Stockage : conservez les produits au frais, au sec, à l'abri du soleil.",
  "inside.n6": "Conservation : la plupart des produits se gardent 12 à 18 mois.",

  /* Footer */
  "footer.rights": "Tous droits réservés",
  "footer.admin": "Administration",

  /* Language */
  "lang.switch": "العربية",

  /* Auth page */
  "auth.title": "Espace abonnés",
  "auth.subtitle":
    "Entrez votre e-mail et votre code d'abonnement pour accéder à la bibliothèque de recettes",
  "auth.code": "Code d'abonnement (8 caractères)",
  "auth.email": "Adresse e-mail",
  "auth.send": "Envoyer",
  "auth.sending": "Envoi en cours...",
  "auth.emailError": "Impossible d'envoyer le code, réessayez.",
  "auth.otpTitle": "Vérifiez votre e-mail",
  "auth.otpSent": "Nous avons envoyé un code à",
  "auth.otpError": "Code incorrect, réessayez.",
  "auth.resend": "Réessayer",
  "auth.noCode": "Code non reçu ?",
  "auth.verify": "Vérification...",
  "auth.confirm": "Confirmer le code",
  "auth.otherEmail": "Utiliser un autre e-mail",
  "auth.footer": "Contenu exclusif aux abonnés — Formule DZ",
  "auth.back": "Retour à l'accueil",
  "auth.hint":
    "Accès réservé aux abonnés : saisissez votre code d'abonnement puis votre e-mail — vous recevrez un code de vérification pour confirmer la connexion.",

  /* Recipes page */
  "recipes.title": "Bibliothèque de recettes",
  "recipes.subtitle":
    "Cliquez sur une recette pour voir les proportions, le calculateur et les étapes",
  "recipes.materialsTitle": "Section matières premières",
  "recipes.materialsSubtitle":
    "Fiche technique de chaque matière, consignes de sécurité et alternatives",
  "recipes.searchRecipes": "Rechercher dans les recettes...",
  "recipes.searchMaterials": "Rechercher dans les matières...",
  "recipes.tabRecipes": "Recettes",
  "recipes.tabMaterials": "Matières premières",
  "recipes.clearSearch": "Effacer la recherche",
  "recipes.gate.title": "Activer l'abonnement",
  "recipes.gate.text":
    "Entrez votre code d'abonnement à 8 caractères pour accéder à la bibliothèque",
  "recipes.gate.activate": "Activer le code",
  "recipes.gate.badLength": "Entrez un code à 8 caractères",
  "recipes.gate.error": "Une erreur est survenue, réessayez",
  "recipes.gate.durations":
    "Durées disponibles : Mois (expire après 30 jours) · Année (expire après 365 jours) · À vie (n'expire jamais).",
  "recipes.gate.noCode":
    "Pas de code ? Contactez-nous pour obtenir un abonnement.",
  "recipes.signout": "Déconnexion",
  "recipes.subscriber": "Abonné",
  "recipes.pkg.all": "Tous les packs",
  "recipes.pkg.home": "Pack ménager",
  "recipes.pkg.cars": "Pack auto",
  "recipes.cat.all": "Tout",
  "recipes.cat.cleaners": "Détergents ménagers",
  "recipes.cat.cars": "Entretien automobile",
  "theme.toggle": "Basculer mode clair/sombre",
  "recipes.cat.natural": "Détergents naturels",
  "recipes.cat.homemade": "Recettes maison faciles",
  "recipes.cat.favorites": "Favoris ⭐",
  "recipes.fav.add": "Ajouter aux favoris",
  "recipes.fav.remove": "Retirer des favoris",
  "recipes.cat.cleaners.short": "Maison",
  "recipes.cat.cars.short": "Auto",
  "recipes.cat.natural.short": "Naturel",
  "recipes.cat.homemade.short": "DIY",
  "recipes.cat.cleaners.heading": "Section 1",
  "recipes.cat.cars.heading": "Section 2",
  "recipes.cat.natural.heading": "Section 3",
  "recipes.cat.homemade.heading": "Section 4",
  "recipes.cat.cleaners.sub": "Recettes de détergents ménagers",
  "recipes.cat.cars.sub": "Recettes d'entretien automobile",
  "recipes.cat.natural.sub": "Recettes de détergents naturels",
  "recipes.cat.homemade.sub": "Recettes simples avec des ingrédients du quotidien",
  "recipes.count": "recette(s)",
  "recipes.steps": "étapes",
  "recipes.empty.title": "Aucune recette pour le moment",
  "recipes.empty.text":
    "Les recettes seront bientôt ajoutées — restez à l'écoute.",
  "recipes.noResults.title": "Aucun résultat",
  "recipes.noResults.text": "Essayez d'autres mots-clés ou changez de catégorie.",
  "recipes.pct.title": "Pourcentages",
  "recipes.stepsTitle": "Mode de préparation",
  "recipes.warningsTitle": "Avertissements de sécurité",
  "recipes.signoutTitle": "Se déconnecter ?",
  "recipes.signoutText":
    "Vous devrez vous reconnecter pour accéder aux recettes.",
  "recipes.cancel": "Annuler",
  "recipes.signoutConfirm": "Déconnexion",

  /* RecipeBits */
  "calc.title": "Calculateur de lot",
  "calc.range": "de 1 kg à 1000 kg",
  "calc.kg": "kg",
  "calc.batchSize": "Taille du lot en kilogrammes",
  "calc.copy": "Copier le tableau",
  "calc.copied": "Copié !",
  "calc.material": "Matière",
  "calc.pct": "Pourcentage",
  "calc.kgCol": "kg",
  "calc.gCol": "grammes",
  "calc.total": "Total",
  "calc.sumWarning":
    "Le total des pourcentages de cette recette est {total}% — le reste se complète en eau selon les étapes.",
  "calc.noLines": "Aucun pourcentage calculable dans cette recette",
  "calc.copyHeader": "Lot de {batch} kg",
  "calc.copyTotal": "Total des pourcentages : {total}%",

  /* Materials */
  "materials.intro.title": "Section matières premières",
  "materials.intro.text":
    "Découvrez chaque matière première utilisée dans les recettes : son rôle, sa fiche technique, les consignes de sécurité et les alternatives disponibles en cas de rupture — cliquez sur une matière pour voir les détails.",
  "materials.intro.searchHint":
    "Utilisez la barre de recherche en haut de page pour filtrer par nom ou par rôle.",
  "materials.badge": "Matière première",
  "materials.roleTitle": "Rôle et description",
  "materials.specsTitle": "Fiche technique",
  "materials.safetyTitle": "Sécurité et stockage",
  "materials.altTitle": "Alternatives disponibles",
  "materials.viewSpecs": "Voir la fiche",
  "materials.noResults.title": "Aucun résultat",
  "materials.noResults.text": "Essayez un autre nom ou cherchez par rôle.",
  "materials.safetyNote":
    "Conseil général : avant d'utiliser une nouvelle matière, demandez la fiche de données de sécurité (FDS) au fournisseur, et portez toujours gants et lunettes lors de la manipulation de produits chimiques concentrés.",

  /* Access errors */
  "access.signinFirst": "Connectez-vous d'abord",
  "access.verifyFailed": "Impossible de vérifier votre compte",
  "access.already": "Vous avez déjà accès",
  "access.badCode": "Code incorrect",
  "access.usedByOther": "Ce code est déjà utilisé par un autre compte",
  "access.ok": "Votre abonnement a été activé avec succès",
  "access.canContinue": "Code correct — vous pouvez continuer",

  /* Admin */
  "admin.panel": "Administration",
  "admin.recipes": "Recettes",
  "admin.signout": "Déconnexion",
  "admin.stat.total": "Total recettes",
  "admin.stat.cleaners": "Détergents ménagers",
  "admin.stat.cars": "Entretien automobile",
  "admin.stat.natural": "Détergents naturels",
  "admin.stat.homemade": "Recettes maison faciles",
  "admin.stat.subs": "Abonnés",
  "admin.form.add": "Ajouter une recette",
  "admin.form.edit": "Modifier la recette",
  "admin.form.cancelEdit": "Annuler la modification",
  "admin.form.category": "Section",
  "admin.form.title": "Titre de la recette",
  "admin.form.titlePh": "Ex. : Parfum de sol",
  "admin.form.pct": "Pourcentages (une ligne par ingrédient)",
  "admin.form.steps": "Mode de préparation *",
  "admin.form.warnings": "Avertissements de sécurité",
  "admin.form.video": "Lien vidéo YouTube (optionnel)",
  "admin.form.save": "Enregistrer",
  "admin.form.addBtn": "Ajouter la recette",
  "admin.form.clear": "Effacer",
  "admin.codes.title": "Codes d'accès",
  "admin.codes.slots": "8 caractères",
  "admin.codes.notePh": "Note (optionnelle) — ex. : pack octobre",
  "admin.codes.generate": "Générer un code",
  "admin.codes.empty":
    "Aucun code pour le moment — générez le premier et partagez-le.",
  "admin.codes.used": "Utilisé",
  "admin.codes.available": "Disponible",
  "admin.codes.copy": "Copier",
  "admin.codes.delete": "Supprimer",
  "admin.list.title": "Recettes actuelles",
  "admin.list.empty":
    "Aucune recette pour le moment — ajoutez la première via le formulaire.",
  "admin.subs.title": "Gestion des membres et abonnements",
  "admin.subs.searchPh": "Recherche par e-mail...",
  "admin.subs.empty": "Aucun membre pour le moment.",
  "admin.subs.registered": "Inscrit le",
  "admin.subs.expired": "Expiré",
  "admin.subs.none": "Sans pack",
  "admin.subs.edit": "Modifier l'abonnement",
  "admin.subs.revoke": "Révoquer l'abonnement",
  "admin.subs.expires": "Expire le",
  "admin.subs.pkg": "Pack",
  "admin.subs.duration": "Durée",
  "admin.subs.save": "Enregistrer l'abonnement",
  "admin.pkg.home": "Pack ménager",
  "admin.pkg.cars": "Pack auto",
  "admin.pkg.all": "Tous les packs",
  "admin.pkg.none": "Sans pack",
  "admin.dur.month": "Mois",
  "admin.dur.year": "Année",
  "admin.dur.lifetime": "À vie",
  "admin.delete.title": "Supprimer la recette ?",
  "admin.delete.text": "La recette sera définitivement supprimée, sans retour possible.",
  "admin.delete.confirm": "Supprimer définitivement",
  "admin.codeDelete.title": "Supprimer le code d'accès ?",
  "admin.codeDelete.text":
    "Ce code ne pourra plus être utilisé pour s'abonner après suppression.",
  "admin.codeDelete.confirm": "Supprimer définitivement",
  "admin.unauthorized": "Accès non autorisé",
  "admin.unauthorized.text":
    "Cette zone est réservée à l'administration. Si vous avez le compte administrateur, connectez-vous avec l'e-mail dédié.",
  "admin.toast.subSaved": "Abonnement mis à jour",
  "admin.toast.subSaveFail": "Impossible d'enregistrer l'abonnement",
  "admin.toast.revoked": "Abonnement révoqué",
  "admin.toast.codeGenerated": "Code généré",
  "admin.toast.codeCopyHint": "Cliquez sur le bouton copier pour le copier",
  "admin.toast.codeGenFail": "Impossible de générer le code, réessayez",
  "admin.toast.copied": "Copié",
  "admin.toast.copyFail": "Impossible de copier — copiez manuellement",
  "admin.toast.codeDeleted": "Code supprimé",

  /* Misc */
  "common.loading": "Chargement...",
  "common.home": "Accueil",
  "notfound.title": "Page introuvable",
};

const en: Dict = {
  /* Brand */
  "brand.tagline": "Cleaning & care recipes",

  /* Landing nav */
  "nav.sections": "Sections",
  "nav.why": "Why us",
  "nav.offers": "Offers",
  "nav.login": "Subscribers area",
  "nav.recipes": "Recipes",

  /* Hero */
  "hero.badge": "Exclusive recipes platform for subscribers",
  "hero.title1": "Professional recipes with calculator",
  "hero.title2": "and reliable raw materials",
  "hero.subtitle":
    "A library of detergent and car-care recipes, with a batch calculator from 1 to 1000 kg and complete specs for every raw material.",
  "hero.explore": "Explore the recipes",
  "hero.viewOffers": "See offers and pricing",
  "hero.lockNote": "Content access requires an active subscription",

  /* Sections cards */
  "sections.cleaners.title": "Section 1",
  "sections.cleaners.subtitle": "Household detergents",
  "sections.cleaners.desc":
    "Surface disinfectants, floor fresheners, dish liquids — everyday formulations for a cleaner home.",
  "sections.cars.title": "Section 2",
  "sections.cars.subtitle": "Car care",
  "sections.cars.desc":
    "Polishes, shampoos, interior cleaners — everything your car's paint and cabin need.",
  "sections.natural.title": "Section 3",
  "sections.natural.subtitle": "Natural detergents",
  "sections.natural.desc":
    "Natural soaps, vinegar and bicarbonate — simple, safe formulations from 100% natural ingredients.",
  "sections.homemade.title": "Section 4",
  "sections.homemade.subtitle": "Easy homemade recipes — free",
  "free.title": "Easy homemade recipes",
  "free.subtitle":
    "10 complete recipes for free, no account needed — made with everyday ingredients. Try them today!",
  "free.badge": "Free — no account",
  "free.cta.signIn": "Subscribers area",
  "free.upsell.title": "Want more?",
  "free.upsell.text":
    "90+ additional professional recipes: home detergents, car care, natural detergents with pro-grade raw materials — with a 1 to 1000 kg batch calculator.",
  "free.upsell.cta": "See the offers",
  "sections.homemade.desc":
    "Grated soap, vinegar, bicarbonate — very easy recipes with ingredients everyone has at home, no technical materials.",

  /* Features */
  "features.calc.title": "Smart batch calculator",
  "features.calc.text":
    "Compute every ingredient's quantity from 1 kg to 1000 kg in one click — no manual math.",
  "features.safety.title": "Safe usage",
  "features.safety.text":
    "Clear safety warnings with every formula and every raw material for responsible use.",
  "features.materials.title": "Raw materials section",
  "features.materials.text":
    "Each material's specs, its role, and available alternatives when out of stock.",

  /* Pricing */
  "pricing.badge": "Subscription offers",
  "pricing.title": "Choose your offer",
  "pricing.subtitle":
    "Clear pricing with no surprises — pick the pack and duration that suit you, then activate your subscription with the code you receive after payment.",
  "pricing.table.pkg": "Pack",
  "pricing.table.duration": "Duration",
  "pricing.table.price": "Price",
  "pricing.pkg.home": "Household products",
  "pricing.pkg.cars": "Car care products",
  "pricing.pkg.all": "All recipes",
  "pricing.dur.month": "Month",
  "pricing.dur.year": "Year",
  "pricing.dur.lifetime": "Lifetime",
  "pricing.note.month": "Expires after 30 days",
  "pricing.note.year": "Expires after 365 days",
  "pricing.save58": "Save 58%",
  "pricing.save56": "Save 56%",
  "pricing.note.lifetime":
    "Never expires — all sections + the batch calculator",
  "pricing.best": "Complete offer",
  "pricing.howto":
    "To subscribe: contact us and you will receive an 8-character activation code by email or text message.",
  "pricing.packagesTitle": "Packs",
  "pricing.pkg.home.desc":
    "Full Section 1 + natural and homemade sections — 90 practical recipes.",
  "pricing.pkg.cars.desc":
    "Full Section 2: car care — 11 professional recipes.",
  "pricing.pkg.all.desc":
    "All four sections together: 101 recipes + raw materials section — the best value.",
  "pricing.mostValue": "Best value",
  "pricing.durationsTitle": "Subscription durations",
  "pricing.dur.month.text": "Expires automatically after 30 days — ideal to try.",
  "pricing.dur.year.text": "Expires after 365 days — best for continuity.",
  "pricing.dur.lifetime.text": "Never expires — permanent access, no renewal.",
  "pricing.renew":
    "Subscription expired? Contact the administration to renew or upgrade your pack.",
  "pricing.activate": "Activate my subscription",

  /* Inside section */
  "inside.badge": "Inside the platform",
  "inside.title": "Three sections, dozens of recipes, one experience",
  "inside.text":
    "After signing in with your subscription code, find all recipes organized in three clear sections, with instant search, a built-in batch calculator and a detailed view for each recipe: percentages, preparation steps, safety warnings and a full raw-materials section.",
  "inside.li1": "Instant search across all recipes and materials",
  "inside.li2": "Built-in calculator: from 1 kg to 1000 kg for every recipe",
  "inside.li3": "Raw materials section: specs, safety and alternatives",
  "inside.li4": "Clear split between household, car-care and natural products",
  "inside.li5": "New section: natural detergents from simple, safe ingredients",
  "inside.cta": "Get started",
  "inside.notesTitle": "Important notes for all recipes",
  "inside.notesBadge": "Check before starting",
  "inside.n1": "Percentages: measure precisely with a sensitive scale.",
  "inside.n2": "Order: add ingredients in the given order for homogeneity.",
  "inside.n3": "Mixing: use an electric mixer or stir continuously by hand.",
  "inside.n4": "Safety: wear gloves, goggles and a mask when handling chemicals.",
  "inside.n5": "Storage: keep products in a cool, dry place away from sunlight.",
  "inside.n6": "Shelf life: most products keep for 12 to 18 months.",

  /* Footer */
  "footer.rights": "All rights reserved",
  "footer.admin": "Administration",

  /* Language */
  "lang.switch": "العربية",

  /* Auth page */
  "auth.title": "Subscribers area",
  "auth.subtitle":
    "Enter your email and subscription code to access the recipe library",
  "auth.code": "Subscription code (8 characters)",
  "auth.email": "Email address",
  "auth.send": "Send",
  "auth.sending": "Sending...",
  "auth.emailError": "Could not send the verification code, please try again.",
  "auth.otpTitle": "Check your email",
  "auth.otpSent": "We sent a code to",
  "auth.otpError": "Incorrect code, please try again.",
  "auth.resend": "Retry",
  "auth.noCode": "Didn't receive the code?",
  "auth.verify": "Verifying...",
  "auth.confirm": "Confirm code",
  "auth.otherEmail": "Use another email",
  "auth.footer": "Subscribers-only content — Formule DZ",
  "auth.back": "Back to home",
  "auth.hint":
    "Subscribers only: enter your subscription code then your email — you will receive a verification code to confirm the sign-in.",

  /* Recipes page */
  "recipes.title": "Recipe library",
  "recipes.subtitle":
    "Tap any recipe to view percentages, the batch calculator and preparation steps",
  "recipes.materialsTitle": "Raw materials section",
  "recipes.materialsSubtitle":
    "Specs for every raw material, safety guidance and available alternatives",
  "recipes.searchRecipes": "Search recipes...",
  "recipes.searchMaterials": "Search materials...",
  "recipes.tabRecipes": "Recipes",
  "recipes.tabMaterials": "Raw materials",
  "recipes.clearSearch": "Clear search",
  "recipes.gate.title": "Activate subscription",
  "recipes.gate.text":
    "Enter your 8-character subscription code to access the recipe library",
  "recipes.gate.activate": "Activate code",
  "recipes.gate.badLength": "Enter an 8-character code",
  "recipes.gate.error": "Something went wrong, please try again",
  "recipes.gate.durations":
    "Available durations: Month (expires after 30 days) · Year (expires after 365 days) · Lifetime (never expires).",
  "recipes.gate.noCode": "No code? Contact us to get a subscription.",
  "recipes.signout": "Sign out",
  "recipes.subscriber": "Subscriber",
  "recipes.pkg.all": "All packs",
  "recipes.pkg.home": "Home pack",
  "recipes.pkg.cars": "Car pack",
  "recipes.cat.all": "All",
  "recipes.cat.cleaners": "Household detergents",
  "recipes.cat.cars": "Car care",
  "theme.toggle": "Toggle light/dark mode",
  "recipes.cat.natural": "Natural detergents",
  "recipes.cat.homemade": "Easy homemade recipes",
  "recipes.cat.favorites": "Favorites ⭐",
  "recipes.fav.add": "Add to favorites",
  "recipes.fav.remove": "Remove from favorites",
  "recipes.cat.cleaners.short": "Home",
  "recipes.cat.cars.short": "Cars",
  "recipes.cat.natural.short": "Natural",
  "recipes.cat.homemade.short": "DIY",
  "recipes.cat.cleaners.heading": "Section 1",
  "recipes.cat.cars.heading": "Section 2",
  "recipes.cat.natural.heading": "Section 3",
  "recipes.cat.homemade.heading": "Section 4",
  "recipes.cat.cleaners.sub": "Household detergent recipes",
  "recipes.cat.cars.sub": "Car care recipes",
  "recipes.cat.natural.sub": "Natural detergent recipes",
  "recipes.cat.homemade.sub": "Simple recipes with everyday ingredients",
  "recipes.count": "recipe(s)",
  "recipes.steps": "steps",
  "recipes.empty.title": "No recipes yet",
  "recipes.empty.text": "Recipes are coming soon — stay tuned for more formulas.",
  "recipes.noResults.title": "No matching results",
  "recipes.noResults.text": "Try different keywords or change the category.",
  "recipes.pct.title": "Percentages",
  "recipes.stepsTitle": "Preparation method",
  "recipes.warningsTitle": "Safety warnings",
  "recipes.signoutTitle": "Sign out?",
  "recipes.signoutText": "You will need to sign in again to access the recipes.",
  "recipes.cancel": "Cancel",
  "recipes.signoutConfirm": "Sign out",

  /* RecipeBits */
  "calc.title": "Batch calculator",
  "calc.range": "from 1 kg to 1000 kg",
  "calc.kg": "kg",
  "calc.batchSize": "Batch size in kilograms",
  "calc.copy": "Copy table",
  "calc.copied": "Copied",
  "calc.material": "Material",
  "calc.pct": "Percentage",
  "calc.kgCol": "kg",
  "calc.gCol": "grams",
  "calc.total": "Total",
  "calc.sumWarning":
    "The total of this recipe's percentages is {total}% — the remainder is topped up with water per the preparation steps.",
  "calc.noLines": "No calculable percentages in this recipe",
  "calc.copyHeader": "{batch} kg batch",
  "calc.copyTotal": "Total percentages: {total}%",

  /* Materials */
  "materials.intro.title": "Raw materials section",
  "materials.intro.text":
    "Learn about every raw material used in the recipes: its role, technical specs, safety guidance and available alternatives — tap any material for details.",
  "materials.intro.searchHint":
    "Use the search box at the top of the page to filter materials by name or role.",
  "materials.badge": "Raw material",
  "materials.roleTitle": "Role and description",
  "materials.specsTitle": "Technical specs",
  "materials.safetyTitle": "Safety and storage",
  "materials.altTitle": "Available alternatives",
  "materials.viewSpecs": "View specs",
  "materials.noResults.title": "No matching results",
  "materials.noResults.text": "Try a different material name or search by role.",
  "materials.safetyNote":
    "General advice: before using any new material, request its safety data sheet (SDS) from the supplier, and always wear gloves and goggles when handling concentrated chemicals.",

  /* Access errors (server messages keyed by code) */
  "access.signinFirst": "Sign in first",
  "access.verifyFailed": "Could not verify your account",
  "access.already": "You already have access",
  "access.badCode": "Incorrect code",
  "access.usedByOther": "This code is already used by another account",
  "access.ok": "Your subscription was activated successfully",
  "access.canContinue": "Code correct — you can continue",

  /* Admin */
  "admin.panel": "Admin panel",
  "admin.recipes": "Recipes",
  "admin.signout": "Sign out",
  "admin.stat.total": "Total recipes",
  "admin.stat.cleaners": "Household detergents",
  "admin.stat.cars": "Car care",
  "admin.stat.natural": "Natural detergents",
  "admin.stat.homemade": "Easy homemade recipes",
  "admin.stat.subs": "Subscribers",
  "admin.form.add": "Add a new recipe",
  "admin.form.edit": "Edit recipe",
  "admin.form.cancelEdit": "Cancel editing",
  "admin.form.category": "Section",
  "admin.form.title": "Recipe title",
  "admin.form.titlePh": "e.g. Floor freshener",
  "admin.form.pct": "Percentages (one line per ingredient)",
  "admin.form.steps": "Preparation method *",
  "admin.form.warnings": "Safety warnings",
  "admin.form.video": "YouTube video link (optional)",
  "admin.form.save": "Save changes",
  "admin.form.addBtn": "Add recipe",
  "admin.form.clear": "Clear",
  "admin.codes.title": "Access codes",
  "admin.codes.slots": "8 characters",
  "admin.codes.notePh": "Note (optional) — e.g. October pack",
  "admin.codes.generate": "Generate code",
  "admin.codes.empty": "No codes yet — generate the first one and share it.",
  "admin.codes.used": "Used",
  "admin.codes.available": "Available",
  "admin.codes.copy": "Copy",
  "admin.codes.delete": "Delete",
  "admin.list.title": "Current recipes",
  "admin.list.empty": "No recipes yet — add the first one via the form.",
  "admin.subs.title": "Members and subscriptions management",
  "admin.subs.searchPh": "Search by email...",
  "admin.subs.empty": "No members yet.",
  "admin.subs.registered": "Registered",
  "admin.subs.expired": "Expired",
  "admin.subs.none": "No pack",
  "admin.subs.edit": "Edit subscription",
  "admin.subs.revoke": "Revoke subscription",
  "admin.subs.expires": "Expires",
  "admin.subs.pkg": "Pack",
  "admin.subs.duration": "Duration",
  "admin.subs.save": "Save subscription",
  "admin.pkg.home": "Home pack",
  "admin.pkg.cars": "Car pack",
  "admin.pkg.all": "All packs",
  "admin.pkg.none": "No pack",
  "admin.dur.month": "Month",
  "admin.dur.year": "Year",
  "admin.dur.lifetime": "Lifetime",
  "admin.delete.title": "Delete recipe?",
  "admin.delete.text": "The recipe will be permanently deleted and cannot be restored.",
  "admin.delete.confirm": "Delete permanently",
  "admin.codeDelete.title": "Delete access code?",
  "admin.codeDelete.text": "This code can no longer be used to subscribe after deletion.",
  "admin.codeDelete.confirm": "Delete permanently",
  "admin.unauthorized": "Unauthorized access",
  "admin.unauthorized.text":
    "This area is for administrators only. If you own the admin account, sign in with the dedicated admin email.",
  "admin.toast.subSaved": "Subscription updated",
  "admin.toast.subSaveFail": "Could not save the subscription",
  "admin.toast.revoked": "Subscription revoked",
  "admin.toast.codeGenerated": "Code generated",
  "admin.toast.codeCopyHint": "Click the copy button to copy it",
  "admin.toast.codeGenFail": "Could not generate the code, please try again",
  "admin.toast.copied": "Copied",
  "admin.toast.copyFail": "Could not copy — copy it manually",
  "admin.toast.codeDeleted": "Code deleted",

  /* Misc */
  "common.loading": "Loading...",
  "common.home": "Home",
  "notfound.title": "Page not found",
};

const DICTS: Record<Lang, Dict> = { ar, fr, en };

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

interface I18nContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  /** Translate a key; supports {placeholder} interpolation. */
  t: (key: string, vars?: Record<string, string | number>) => string;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "mf-lang";

function detectInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "fr" || saved === "en") return saved;
  } catch {
    // localStorage unavailable — fall through to default
  }
  return "ar";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  // Persist + reflect on <html> so direction & fonts apply globally.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore persistence failures
    }
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let s = DICTS[lang][key] ?? DICTS.ar[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.split(`{${k}}`).join(String(v));
        }
      }
      return s;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, dir, t, setLang }),
    [lang, dir, t, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
