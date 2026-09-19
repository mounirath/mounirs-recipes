/**
 * المواد الأولية (raw materials) catalog: what each material is, its role,
 * safety notes, and safe substitutions when a material is unavailable.
 * Keyed by lowercase material name so lookups are tolerant of minor
 * spelling/accent differences in recipe data.
 */

export interface RawMaterialInfo {
  key: string;
  /** Material name as shown in recipes (Arabic or Latin). */
  name: string;
  /** Latin/international name. */
  latin: string;
  /** What it does in the formula. */
  role: string;
  /** Detailed description / specs. */
  description: string;
  /** Physical/technical specs shown in the detail view. */
  specs: string[];
  /** Safety & handling notes. */
  safety: string[];
  /** Alternatives when unavailable (same functional class). */
  alternatives: string[];
  /** Which sections commonly use it. */
  usedIn: ("cleaners" | "cars")[];
  /** Tailwind chip classes for visual identity. */
  tone: {
    chip: string;
    iconBg: string;
  };
}

const T = {
  blue: {
    chip: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  amber: {
    chip: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  emerald: {
    chip: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  rose: {
    chip: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    iconBg: "bg-rose-500/10 text-rose-600",
  },
  violet: {
    chip: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
  slate: {
    chip: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    iconBg: "bg-slate-500/10 text-slate-600",
  },
} as const;

export const RAW_MATERIALS: RawMaterialInfo[] = [
  {
    key: "texapon",
    name: "Texapon N70",
    latin: "SLES / Sodium Lauryl Ether Sulfate",
    role: "المنظف الأساسي (مادة فعالة سطحياً)",
    description:
      "مادة فعالة سطحياً أنيونية بتركيز 70%، وهي قلب أي منظف: تُنتج الرغوة وتُزيل الدهون والأوساخ. تُستخدم في كل الوصفات تقريباً من سائل الأواني إلى شامبو السيارات. تبدأ سائلة كثيفة وتُخفف بالماء حسب التركيبة.",
    specs: [
      "الشكل: سائل لزج عالي اللزوجة (معجون شفاف)",
      "التركيز النشط: 70% ± 2",
      "pH (محلول 10%): 7 – 9",
      "الذوبان: يذوب في الماء بسهولة مع التحريك",
      "التعبئة: براميل أو جركنات 20–230 كغ",
    ],
    safety: [
      "قد يهيّج العين والجلد الحساس — ارتدِ قفازات",
      "تجنّب إدخالها بالعين مباشرة؛ اغسل بالماء عند التلامس",
    ],
    alternatives: [
      "SLES (نفس المادة بتركيزات أخرى)",
      "LABSA (حمض السلفونيك) بعد تعديل pH",
    ],
    usedIn: ["cleaners", "cars"],
    tone: T.blue,
  },
  {
    key: "labsa",
    name: "حمض السلفونيك",
    latin: "LABSA (Linear Alkylbenzene Sulfonic Acid)",
    role: "منظف قوي منخفض التكلفة",
    description:
      "حمض قوي يُستخدم كمنظف رئيسي في المساحيق والسوائل الاقتصادية. يجب تعديله بالـ NaOH (تحييد) حتى يتحول إلى السلفونات النشطة. أقوى قاطعة للدهون من Texapon لكنها أكثر إثارة للجلد، ولذلك تُخلط عادة مع مواد أخف.",
    specs: [
      "الشكل: سائل بني داكن لزج",
      "التركيز النشط: 96% ± 2",
      "pH (كما هو): حمضي قوي ~1–2",
      "يتطلب: تحييد بـ NaOH حتى pH 7–8 قبل الاستخدام",
    ],
    safety: [
      "حامض محرق للجلد والعين — قفازات ونظارات إلزامية",
      "أضفه إلى الماء ببطء مع التحريك (تفاعل طارد للحرارة عند التحييد)",
    ],
    alternatives: ["Texapon N70", "SLES 70%"],
    usedIn: ["cleaners"],
    tone: T.amber,
  },
  {
    key: "cocamide",
    name: "Cocamide DEA",
    latin: "Cocamide DEA",
    role: "مادة تثخين ورغوة",
    description:
      "مادة فعالة سطحياً غير أيونية مشتقة من جوز الهند. وظيفتها الرئيسية زيادة كثافة وثبات الرغوة وتحسين اللزوجة. تُستخدم مع Texapon في سوائل الأواني والشامبوهات لتعزيز قوة التنظيف وإحساس الكثافة.",
    specs: [
      "الشكل: سائل لزج أصفر فاتح",
      "النشط: 85–90%",
      "pH (محلول 10%): 8 – 10",
      "الذوبان: يذوب في الماء والكحولات",
    ],
    safety: [
      "تجنّب ملامسة العين",
      "خزن بعيداً عن الحرارة العالية",
    ],
    alternatives: ["CDE", "Betaine (جزئياً للرغوة)"],
    usedIn: ["cleaners", "cars"],
    tone: T.blue,
  },
  {
    key: "cde",
    name: "CDE",
    latin: "Coconut Diethanolamide",
    role: "مادة رغوة وتثخين",
    description:
      "مادة مشتقة من زيت جوز الهند تعمل كمادة مثبتة للرغوة ومادة مالئة للقوام. تشبه وظيفة Cocamide DEA وتُستخدم بديلاً عنها في وصفات السيارات. تزيد ثبات الرغوة خاصة في شامبو السيارات ومنتجات الرغوة.",
    specs: [
      "الشكل: سائل لزج كهرماني",
      "النشط: 1:1 أو 2:1 حسب النوع",
      "pH (محلول 10%): 9 – 11",
    ],
    safety: ["تجنّب ملامسة العين", "خزن بعيداً عن البرودة الشديدة (يتجمد)"],
    alternatives: ["Cocamide DEA", "Cocamidopropyl Betaine"],
    usedIn: ["cars", "cleaners"],
    tone: T.blue,
  },
  {
    key: "betaine",
    name: "Betaine",
    latin: "Cocamidopropyl Betaine",
    role: "منظف لطيف مكمّل",
    description:
      "مادة فعالة سطحياً مذبذبة (amphoteric) لطيفة على الجلد. تُضاف مع SLES لتلطيف المنتج وزيادة الرغوة الكريمية وتثبيت اللزوجة. أساسية في صابون اليدين وسوائل الأواني ذات الجودة الأعلى.",
    specs: [
      "الشكل: سائل شفاف فاتح",
      "النشط: 30% (typical)",
      "pH (كما هو): 5 – 7",
      "متوافق مع: الأنيونيات والكاتيونيات وغير الأيونية",
    ],
    safety: ["لطيف نسبياً — ارتدِ قفازات عند التعامل الكمي"],
    alternatives: ["Cocamide DEA", "SLES بزيادة طفيفة"],
    usedIn: ["cleaners"],
    tone: T.emerald,
  },
  {
    key: "butyl-glycol",
    name: "Butyl Glycol",
    latin: "Butyl Glycol / EGBE (2-Butoxyethanol)",
    role: "مذيب قاطع للدهون",
    description:
      "مذيب عضوي قوي يستخدم لإزالة الشحوم والزيوت. مفتاحي في منظفات الفرن والمحرك والزجاج (يساعد على التبخر السريع بدون خطوط). يذوب في الماء بنسب جيدة ويعطي قدرة قطع الدهون السريعة.",
    specs: [
      "الشكل: سائل شفاف برائحة خفيفة",
      "الكثافة: ~0.90 غ/سم³",
      "نقطة الوميض: ~62°م",
      "الذوبان: يمتزج مع الماء والكحولات",
    ],
    safety: [
      "قابل للاشتعال — ابتعد عن اللهب",
      "استخدم في مكان جيد التهوية",
      "تجنّب ملامسة الجلد لفترات طويلة",
    ],
    alternatives: ["Isopropanol (أضعف على الدهون)", "Propylene Glycol (للطبقات الخفيفة)"],
    usedIn: ["cleaners", "cars"],
    tone: T.amber,
  },
  {
    key: "isopropanol",
    name: "Isopropanol",
    latin: "Isopropyl Alcohol (IPA)",
    role: "كحول تنظيف سريع التبخر",
    description:
      "كحول سريع التبخر يستخدم في منظفات الزجاج والمساحات والمعطرات. يعطي جفافاً سريعاً بدون خطوط ويقتل بعض الجراثيم. قاعدته في بخاخات الزجاج مع الماء والـ Texapon القليل.",
    specs: [
      "الشكل: سائل شفاف برائحة كحولية",
      "النقاء: 99.5% أو 91% حسب الصنف",
      "الكثافة: ~0.786 غ/سم³",
      "نقطة الوميض: ~12°م (شديد الاشتعال)",
    ],
    safety: [
      "شديد الاشتعال — أبعد عن أي شرارة أو لهب",
      "استخدم في مكان جيد التهوية",
      "تجنّب الاستنشاق المباشر",
    ],
    alternatives: ["إيثانول (مطلق أو محوّل)", "Butyl Glycol (للدهون الثقيلة)"],
    usedIn: ["cleaners", "cars"],
    tone: T.amber,
  },
  {
    key: "propylene-glycol",
    name: "Propylene Glycol",
    latin: "Propylene Glycol (PG)",
    role: "مرطّب ومثبّت ومذيب مساعد",
    description:
      "سائل شفاف لزج قليل اللزوجة يستخدم كمرطب ولتحسين ثبات التركيبة وربط الماء بالمواد الأخرى. يعمل كحامل للروائح والأصباغ، ويمنع جفاف المنتجات السريعة التبخر. من أوسع المواد استخداماً في وصفاتنا.",
    specs: [
      "الشكل: سائل شفاف لزج بلا رائحة",
      "الكثافة: ~1.036 غ/سم³",
      "نقطة التجمد: ~-59°م",
      "الذوبان: يمتزج مع الماء والكحول والأحماض",
    ],
    safety: ["آمن نسبياً (يُستخدم في التجميل والأغذية)", "تجنّب ملامسة العين المباشرة"],
    alternatives: ["Glycerine (أثقل وأرخص)", "Butyl Glycol (للتنظيف الثقيل)"],
    usedIn: ["cleaners", "cars"],
    tone: T.emerald,
  },
  {
    key: "glycerine",
    name: "Glycerine",
    latin: "Glycerol / Glycerin",
    role: "مرطّب ومثبّت",
    description:
      "سكر كحولي سميك جداً يستخدم كمرطب (يحتفظ بالماء) ومادة مثبتة للتركيبات. يزيد كثافة المنتج ويمنع جفافه، ويُستخدم في منتجات تلميع التابلوه والصابون السائل.",
    specs: [
      "الشكل: سائل لزج شفاف",
      "النقاء: 99.5%",
      "الكثافة: ~1.26 غ/سم³",
      "الذوبان: يمتزج مع الماء والكحول",
    ],
    safety: ["آمن جداً", "لزج — نظّف السكب فوراً"],
    alternatives: ["Propylene Glycol"],
    usedIn: ["cleaners", "cars"],
    tone: T.emerald,
  },
  {
    key: "cetiol",
    name: "Cétiol C5",
    latin: "Coco-Caprylate / Caprate",
    role: "زيت تجميلي (Emollient)",
    description:
      "إستر زيتي خفيف مشتق من جوز الهند. يعمل كمادة مرطبة وتلميع في منتجات التابلوه وتجديد البلاستيك الخارجي. يعطي لمعة وملمس حريري دون دهون ثقيلة.",
    specs: [
      "الشكل: سائل زيتي شفاف فاتح",
      "الكثافة: ~0.86 غ/سم³",
      "الملمس: خفيف غير دهني",
      "يُمزج جيداً مع: الزيوت والكحولات والماء بوجود مذيب مساعد",
    ],
    safety: ["آمن على الجلد", "قابل للجفاف على السطح — أغلق العبوة"],
    alternatives: ["زيت معدني خفيف", "سيليكون سائل (لكن أثقل)"],
    usedIn: ["cars"],
    tone: T.violet,
  },
  {
    key: "citric-acid",
    name: "حمض الستريك",
    latin: "Citric Acid",
    role: "حمض تنظيف وإزالة تكلسات",
    description:
      "حمض عضوي طبيعي يستخدم لإزالة الترسبات الكلسية وتنظيف الحمامات وضبط pH. آمن نسبياً ويعمل ببطء لكنه فعال جداً على الجير. يُذاب أولاً في قليل من الماء قبل إضافته.",
    specs: [
      "الشكل: مسحوق بلوري أبيض",
      "النقاء: 99.5–100.5%",
      "pH (محلول 1%): ~2.2",
      "الذوبان: 59% في الماء عند 20°م",
    ],
    safety: [
      "يُهيّج العين — تجنّب الرش بالعين",
      "ارتدِ قفازات في التركيزات العالية",
      "لا تخلط مع الكلور مباشرة",
    ],
    alternatives: ["حمض اللاكتيك", "حمض الفورميك (أقوى لكن أخطر)"],
    usedIn: ["cleaners", "cars"],
    tone: T.amber,
  },
  {
    key: "naoh",
    name: "هيدروكسيد الصوديوم",
    latin: "Sodium Hydroxide (NaOH / Soda Caustic)",
    role: "قلوي قوي (تحييد وتنظيف)",
    description:
      "قلوي كاوي يستخدم لتحييد الأحماض (مثل LABSA) وكمنظف قوي للدهون المحروقة في أفران والمطابخ. تفاعله مع الماء طارد للحرارة بشدة — أضفه ببطء دائماً إلى الماء وليس العكس.",
    specs: [
      "الشكل: حبيبات أو رقائق بيضاء",
      "النقاء: 98–99%",
      "pH (محلول 1%): ~14",
      "تفاعله مع الماء: طارد للحرارة بشدة",
    ],
    safety: [
      "محرق بشدة للجلد والعين — معدات وقاية كاملة إلزامية",
      "أضف الحبيبات إلى الماء ببطء، وليس العكس أبداً",
      "خزن في عبوة محكمة بعيداً عن الرطوبة",
    ],
    alternatives: ["كربونات الصوديوم (أضعف بكثير)"],
    usedIn: ["cleaners"],
    tone: T.rose,
  },
  {
    key: "sodium-hypochlorite",
    name: "هيبوكلوريت الصوديوم",
    latin: "Sodium Hypochlorite (NaOCl)",
    role: "مبيض ومطهر (الكلور)",
    description:
      "المادة الفعالة في الجافيل: تبيّض وتعقّم بمفعول قوي. تُستخدم مخففة (15-16% نشط). لا يُخلط أبداً مع الأحماض أو الأمونيا أو العطور — ينتج غاز كلور سام.",
    specs: [
      "الشكل: سائل أصفر مخضر",
      "التركيز النشط: 12–16% (كـ Cl₂ فعّال)",
      "pH: 11–13 (قلوي ثابت)",
      "يتحلل بالضوء والحرارة — تخزين معتم بارد",
    ],
    safety: [
      "أبخرة مؤذية — تهوية جيدة إلزامية",
      "لا تخلط أبداً مع الأحماض أو الأمونيا (غاز كلور سام)",
      "عبوات معتمة بعيداً عن الشمس",
    ],
    alternatives: ["بيروكسيد الهيدروجين (أكثر أماناً لكن أضعف)"],
    usedIn: ["cleaners"],
    tone: T.rose,
  },
  {
    key: "hcl",
    name: "حمض الهيدروكلوريك",
    latin: "Hydrochloric Acid (HCl)",
    role: "حمض قوي لإزالة الإسمنت والصدأ",
    description:
      "حمض قوي جداً يستخدم لتنظيف الإسمنت والشوائب المعدنية وإزالة الصدأ. من أخطر المواد في المكتبة — استخدامه يتطلب تهوية قصوى ومعدات وقاية كاملة ولا يُخلط أبداً مع الكلور.",
    specs: [
      "الشكل: سائل شفاف إلى أصفر باهت",
      "التركيز: 30–33% تقريباً",
      "أبخرة خانقة قوية عند فتح العبوة",
    ],
    safety: [
      "محرق وأبخرة خانقة — معدات وقاية كاملة (قفازات، نظارات، كمامة)",
      "استخدم في الهواء الطلق أو بتهوية قصوى",
      "لا تخلط أبداً مع الكلور أو القلوات المركزة",
    ],
    alternatives: ["حمض الستريك المركز (أبطأ وأكثر أماناً)"],
    usedIn: ["cleaners"],
    tone: T.rose,
  },
  {
    key: "formol",
    name: "Formol",
    latin: "Formaldehyde Solution (Formalin)",
    role: "حافظ ومضاد بكتيري",
    description:
      "مادة حافظة تمنع نمو البكتيريا والعفن في المنتجات المائية. النسب المستخدمة صغيرة جداً (0.1–0.5%). يُضاف في آخر الخطوات بعد انتهاء التفاعلات. تُناقش سلامته في منتجات الجلد، لكنه شائع في الصناعات المنزلية التقليدية.",
    specs: [
      "الشكل: سائل شفاف برائحة نفاذة",
      "التركيز: 37% فورمالدهيد في الماء",
      "الجرعة النموذجية: 0.1 – 0.5%",
    ],
    safety: [
      "رائحة نفاذة — تجنّب الاستنشاق",
      "مسرطن محتمل بتركيزات عالية — التزم بالجرعات",
      "أبقِ بعيداً عن الأطفال",
    ],
    alternatives: [
      "مادة حافظة بديلة (Benzoate / Phenoxyethanol)",
    ],
    usedIn: ["cleaners", "cars"],
    tone: T.slate,
  },
  {
    key: "meg",
    name: "Mono Ethylene Glycol",
    latin: "MEG (Mono Ethylene Glycol)",
    role: "قاعدة مبرد المحرك",
    description:
      "الأساس في سائل تبريد المحرك: يخفض نقطة التجمد ويرفع نقطة الغليان. يُخلط مع الماء المقطر بنسبة ~50% مع مواد مثبطة للصدأ. سام عند الابتلاع رغم طعمه الحلو — أبقِه بعيداً عن الأطفال والحيوانات.",
    specs: [
      "الشكل: سائل شفاف لزج بلا رائحة",
      "الكثافة: ~1.113 غ/سم³",
      "نقطة التجمد (50%): ~-37°م",
      "نقطة الغليان: ~197°م",
    ],
    safety: [
      "سام عند الابتلاع — حافظ بعيداً عن الأطفال والحيوانات",
      "تجنّب ملامسة الجلد لفترات طويلة",
      "لا تُفرغ في المجاري (سام للبيئة)",
    ],
    alternatives: ["Propylene Glycol (مبرد أقل سمية — للسيارات الحديثة)"],
    usedIn: ["cars"],
    tone: T.violet,
  },
  {
    key: "fragrance",
    name: "العطر",
    latin: "Fragrance / Perfume Oil",
    role: "الرائحة النهائية للمنتج",
    description:
      "زيوت عطرية مركبة تُضاف في آخر الخطوات لتعطي المنتج رائحته المميزة (ليمون، مرسيليا، لافندر...). النسب صغيرة (0.1–0.5%) لأنها مركزة. تُذاب في Propylene Glycol أو كحول لتوزيع متجانس.",
    specs: [
      "الشكل: سائل زيتي مركز",
      "الجرعة النموذجية: 0.1 – 0.5%",
      "تُذاب في: PG أو إيثانول قبل الإضافة",
    ],
    safety: ["لا تلامس الجلد المركّز", "قابل للاشتعال — ابتعد عن اللهب"],
    alternatives: ["زيوت عطرية طبيعية (بجرعة مضاعفة)", "بدون عطر (منتج محايد)"],
    usedIn: ["cleaners", "cars"],
    tone: T.violet,
  },
  {
    key: "nacl",
    name: "ملح الطعام",
    latin: "Sodium Chloride (NaCl)",
    role: "مضاهئ لزوجة",
    description:
      "ملح الطعام العادي يستخدم لضبط اللزوجة في السوائل المنظفة. يُضاف تدريجياً مع التحريك — زيادته تُرقّق المنتج مرة أخرى، لذلك أضفه بالتدريج وراقب القوام.",
    specs: [
      "الشكل: بلورات بيضاء",
      "النقاء: طعام 99% أو صناعي",
      "الجرعة النموذجية: 0.5 – 2%",
      "ملاحظة: القمة ~2–3% ثم يبدأ بالترقيق",
    ],
    safety: ["آمن", "يُسبب تآكل الستانلس مع الوقت — استخدم أوعية بلاستيكية"],
    alternatives: ["ملح صناعي (أرخص)"],
    usedIn: ["cleaners", "cars"],
    tone: T.slate,
  },
  {
    key: "xanthan",
    name: "Xanthan Gum / CMC",
    latin: "Xanthan Gum / Carboxymethyl Cellulose",
    role: "مادة مثخنة (تكوين الجل)",
    description:
      "بوليمرات طبيعية تُثخن المحاليل المائية وتحول السائل إلى جل (مثل جل المراحيض). تُذاب ببطء مع التحريك المستمر أو تُخلط مسبقاً مع الجليسرين لمنع التكتل.",
    specs: [
      "الشكل: مسحوق أبيض خفيف",
      "الجرعة النموذجية: 0.3 – 1%",
      "تحتاج تحريكاً مستمراً حتى الذوبان التام",
    ],
    safety: ["آمن", "تتكتل بسرعة — اخلطها مسبقاً مع سائل آخر"],
    alternatives: ["ملح (للزوجة السائلة فقط)", " Carbomer (جل شفاف)"],
    usedIn: ["cleaners"],
    tone: T.slate,
  },
  {
    key: "ethanol",
    name: "إيثانول",
    latin: "Ethanol (Ethyl Alcohol)",
    role: "كحول مذيب ومعطر",
    description:
      "كحول إيثيلي يستخدم كمذيب للعطور وبخاخات التنظيف السريع. يتبخر بسرعة ويترك سطحاً نظيفاً. يستخدم أيضاً في بخاخات طارد الحشرات ومزيل الروائح.",
    specs: [
      "الشكل: سائل شفاف برائحة كحولية",
      "النقاء: 96% (مطلق) أو محوّل",
      "نقطة الوميض: ~13°م (شديد الاشتعال)",
    ],
    safety: ["شديد الاشتعال", "استخدم في مكان جيد التهوية", "تجنّب الاستنشاق المباشر"],
    alternatives: ["Isopropanol (أبطأ تبخراً وأقوى على الدهون)"],
    usedIn: ["cleaners", "cars"],
    tone: T.amber,
  },
  {
    key: "paraffin",
    name: "زيت البرافين",
    latin: "Paraffin Oil / Mineral Oil",
    role: "زيت تلميع وقاعدة شمع",
    description:
      "زيت معدني خفيف يستخدم كقاعدة لملمعات الخشب والأثاث. يحمل الشمع ويعطي لمعاناً وحماية سطحية. يُخلط مع الشمع الساخن على حمام مائي.",
    specs: [
      "الشكل: زيت شفاف لزج",
      "الكثافة: ~0.85 غ/سم³",
      "لا يمتزج بالماء — يُخلط مع مذيبات عضوية",
    ],
    safety: ["قابل للاشتعال بخفة", "سطح زلق — نظّف فوراً"],
    alternatives: ["Cétiol C5 (أخف)", "زيت سيليكون (لمعان أقوى)"],
    usedIn: ["cleaners"],
    tone: T.violet,
  },
  {
    key: "carnauba",
    name: "شمع الكرنوبا",
    latin: "Carnauba Wax",
    role: "شمع تلميع طبيعي",
    description:
      "أصلب الشموع الطبيعية، يستخدم في ملمع طلاء السيارة وملمع الخشب. يعطي طبقة حماية ولمعة طويلة الأمد. يُذاب على حمام مائي دافئ (60°م) مع الزيت والمذيب.",
    specs: [
      "الشكل: قشور أو كتل صفراء",
      "نقطة الانصهار: 82–86°م",
      "الأصل: نباتي (أوراق النخلة البرازيلية)",
    ],
    safety: ["اسبتخدم بحرارة — انتبه للحرق", "خزن بعيداً عن الحرارة"],
    alternatives: ["شمع العسل (أنعم)", "شمع بوليمري صناعي"],
    usedIn: ["cars", "cleaners"],
    tone: T.violet,
  },
  {
    key: "corrosion-inhibitor",
    name: "مثبّت الصدأ",
    latin: "Corrosion Inhibitor",
    role: "حماية المعدن في المبردات",
    description:
      "إضافة كيميائية تُمنع تآكل المعادن داخل نظام التبريد (الحديد، الألمنيوم، النحاس). ضرورية مع MEG لأن الجليكول الخام يسبب تآكلاً بمرور الوقت. تُضاف بنسبة 1–2%.",
    specs: [
      "الشكل: سائل أو مسحوق مركز",
      "الجرعة النموذجية: 1 – 2%",
    ],
    safety: ["اتباع تعليمات المورد", "تجنّب ملامسة العين"],
    alternatives: ["لا بديل — ضروري في مبرد المحرك"],
    usedIn: ["cars"],
    tone: T.slate,
  },
  {
    key: "anti-foam",
    name: "Anti-Foaming Agent",
    latin: "Defoamer / Anti-foam",
    role: "منع الرغوة في المبردات",
    description:
      "إضافة تمنع تكوّن الرغوة في سوائل التبريد أثناء دوران المضخة. بنسبة صغيرة جداً (0.1–0.3%) تحافظ على كفاءة التبريد وتمنع الفقاعات.",
    specs: ["الشكل: مستحلب سائل", "الجرعة النموذجية: 0.1 – 0.3%"],
    safety: ["آمن حسب تعليمات المورد"],
    alternatives: ["لا بديل مباشر"],
    usedIn: ["cars"],
    tone: T.slate,
  },
  {
    key: "cod",
    name: "C.O.D",
    latin: "COD (Complex Organic Detergent)",
    role: "منظف متخصص للعجلات",
    description:
      "منظف صناعي متخصص يستخدم في وصفة تجديد العجلات لإزالة الفرامل دَست والشحوم الصلبة. يُضاف بعد Texapon لزيادة القوة القطعية.",
    specs: ["الشكل: سائل بني فاتح", "الجرعة النموذجية: 3 – 5%"],
    safety: ["ارتدِ قفازات", "تجنّب ملامسة العين"],
    alternatives: ["Butyl Glycol (أقوى على الدهون)"],
    usedIn: ["cars"],
    tone: T.amber,
  },
  {
    key: "dye",
    name: "الملون",
    latin: "Colorant / Dye",
    role: "هوية بصرية للمنتج",
    description:
      "أصباغ سائلة مركزة تُضاف بنسبة ضئيلة (0.1–0.2%) لإعطاء المنتج لونه المميز (أزرق للزجاج، أخضر للتابلوه...). تُذاب أولاً في قليل من الماء لضمان توزيع متجانس.",
    specs: ["الشكل: سائل مركز", "الجرعة النموذجية: 0.05 – 0.2%"],
    safety: ["يُلطّخ الأيدي والأسطح — تعامل بحذر"],
    alternatives: ["بدون ملون (منتج شفاف)"],
    usedIn: ["cleaners", "cars"],
    tone: T.violet,
  },
  {
    key: "tea-tree",
    name: "زيت شجرة الشاي",
    latin: "Tea Tree Oil",
    role: "مطهر طبيعي",
    description:
      "زيت عطري بخصائص مضادة للبكتيريا والفطريات. يستخدم في المطهرات الطبيعية للأسطح. يُضاف في آخر الخطوات لأنه متطاير.",
    specs: ["الشكل: زيت شفاف فاتح برائحة عشبية", "الجرعة النموذجية: 0.5 – 1%"],
    safety: ["غير مُهيّج عادة", "ابتعد عن العين"],
    alternatives: ["زيت اللافندر (رائحة ألطف)", "مطهر صناعي"],
    usedIn: ["cleaners"],
    tone: T.emerald,
  },
  {
    key: "turpentine",
    name: "تربنتين",
    latin: "Turpentine",
    role: "مذيب للشمع والزيوت",
    description:
      "مذيب طبيعي مشتق من الصنوبر، يُستخدم في ملمع الخشب لإذابة الشمع وتوزيعه. قوي التبخر ورائحته مميزة.",
    specs: ["الشكل: سائل شفاف برائحة صنوبرية", "نقطة الوميض: ~35°م"],
    safety: ["قابل للاشتعال", "استخدم بتهوية جيدة"],
    alternatives: ["White Spirit (صناعي)"],
    usedIn: ["cleaners"],
    tone: T.amber,
  },
];

/** Tolerant lookup: matches on name/latin/key substrings. */
export function findMaterial(query: string): RawMaterialInfo | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const norm = (s: string) => s.toLowerCase().replace(/[éè]/g, "e");
  return (
    RAW_MATERIALS.find(
      (m) =>
        norm(m.name) === q ||
        norm(m.latin) === q ||
        m.key === q,
    ) ??
    RAW_MATERIALS.find(
      (m) =>
        norm(m.name).includes(q) ||
        norm(m.latin).includes(q) ||
        q.includes(norm(m.name)) ||
        q.includes(m.key),
    ) ??
    null
  );
}
