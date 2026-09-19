import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.svg";
import {
  ArrowLeft,
  Beaker,
  CalendarClock,
  Car,
  CheckCircle2,
  FlaskConical,
  Home,
  Infinity as InfinityIcon,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const featureItems = [
  {
    icon: Scale,
    title: "حاسبة دفعات ذكية",
    text: "احسب كميات كل مادة من 1 كغ إلى 1000 كغ بضغطة زر — بدون حساب يدوي.",
  },
  {
    icon: ShieldCheck,
    title: "أمان في الاستخدام",
    text: "تحذيرات سلامة واضحة مع كل تركيبة وكل مادة أولية لاستخدام مسؤول.",
  },
  {
    icon: FlaskConical,
    title: "قسم المواد الأولية",
    text: "مواصفات كل مادة، وظيفتها، وبدائلها المتاحة عند عدم توفرها.",
  },
];

const sections = [
  {
    id: "cleaners",
    icon: Home,
    title: "القسم الأول",
    subtitle: "منظفات منزلية",
    description:
      "مطهرات أسطح، معطرات أرضيات، سوائل جلي — تركيبات يومية لبيت أكثر نظافة.",
    color: "text-primary",
    chip: "bg-primary/10 text-primary",
  },
  {
    id: "cars",
    icon: Car,
    title: "القسم الثاني",
    subtitle: "العناية بالسيارات",
    description:
      "ملمعات، شامبو، منظف داخلي — كل ما يحتاجه طلاء سيارتك ومقصورتها.",
    color: "text-cyan-600",
    chip: "bg-cyan-600/10 text-cyan-600",
  },
] as const;

export default function Landing() {
  const { isLoading, isAuthenticated } = useAuth();

  const ctaHref = isAuthenticated ? "/recipes" : "/auth?returnTo=%2Frecipes";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <FlaskConical className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Mounir Formule
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
            <a href="#sections" className="transition-colors hover:text-foreground">
              الأقسام
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              لماذا نحن
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              الاشتراكات
            </a>
          </nav>
          <Button asChild className="shadow-soft">
            <Link to={ctaHref}>
              {isAuthenticated ? "الوصفات" : "دخول المشتركين"}
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 right-1/2 h-[480px] w-[720px] translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 border border-primary/15 bg-primary/10 px-3 py-1.5 text-primary"
            >
              <Sparkles className="size-3.5" />
              منصة وصفات حصرية للمشتركين
            </Badge>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.2] tracking-tight sm:text-6xl sm:leading-[1.15]">
              وصفات احترافية مع حاسبة
              <span className="text-primary"> ومواد أولية موثوقة</span>
            </h1>
            <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              مكتبة وصفات المنظفات والعناية بالسيارات، مع حاسبة دفعات من 1 إلى
              1000 كغ، ومواصفات كاملة لكل مادة أولية.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-base shadow-soft-lg">
                <Link to={ctaHref}>
                  <Beaker className="size-5" />
                  استكشف الوصفات
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <a href="#sections">
                  تعرّف على الأقسام
                  <ArrowLeft className="size-4" />
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              <Lock className="mb-0.5 inline size-3" /> الوصول للمحتوى يتطلب
              اشتراكاً فعّالاً
            </p>
          </motion.div>

          {/* Floating preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2"
          >
            {sections.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-border/70 bg-card p-6 text-right shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-10 items-center justify-center rounded-xl ${s.chip}`}
                  >
                    <s.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {s.title}
                    </p>
                    <h3 className="font-bold">{s.subtitle}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-y border-border/60 bg-card/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {featureItems.map((f) => (
              <div key={f.title} className="text-center sm:text-right">
                <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mx-0">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions: packages & durations */}
      <section id="pricing" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
            <CalendarClock className="size-3.5" />
            الباقات والمدد
          </Badge>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            اختر الباقة المناسبة لك
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            كل باقة تُفعَّل بكود اشتراك من الإدارة، وبمدة تناسبك: شهر، سنة، أو
            مدى الحياة.
          </p>
        </div>

        {/* Packages */}
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              pkg: "home" as const,
              icon: Home,
              title: "باقة وصفات منزلية",
              desc: "القسم الأول كاملاً: المنظفات المنزلية — 23 وصفة عملية.",
              chip: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
            },
            {
              pkg: "cars" as const,
              icon: Car,
              title: "باقة عناية بالسيارات",
              desc: "القسم الثاني كاملاً: العناية بالسيارات — 11 وصفة احترافية.",
              chip: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
            },
            {
              pkg: "all" as const,
              icon: Sparkles,
              title: "كل الباقات",
              desc: "القسمان معاً: 34 وصفة بكل المكتبة — الخيار الأوفر.",
              chip: "bg-primary/10 text-primary border-primary/20",
              featured: true,
            },
          ].map((p) => (
            <div
              key={p.pkg}
              className={`relative rounded-2xl border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 ${
                p.featured ? "border-primary/40 shadow-soft-lg" : "border-border/70"
              }`}
            >
              {p.featured && (
                <Badge className="absolute -top-2.5 right-6 border-none bg-primary text-[10px] text-primary-foreground">
                  الأوفر
                </Badge>
              )}
              <span
                className={`mb-4 flex size-11 items-center justify-center rounded-xl border ${p.chip}`}
              >
                <p.icon className="size-5" />
              </span>
              <h3 className="mb-1.5 text-lg font-bold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Durations */}
        <div className="mt-10 rounded-2xl border border-border/70 bg-card p-6 shadow-soft sm:p-8">
          <h3 className="mb-5 text-center font-bold">مدد الاشتراك</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: CalendarClock,
                title: "شهر",
                text: "ينتهي تلقائياً بعد 30 يوماً — مثالي للتجربة.",
              },
              {
                icon: CalendarClock,
                title: "سنة",
                text: "ينتهي بعد 365 يوماً — أفضل للاستمرار.",
              },
              {
                icon: InfinityIcon,
                title: "مدى الحياة",
                text: "لا ينتهي أبداً — وصول دائم بلا تجديد.",
              },
            ].map((d) => (
              <div
                key={d.title}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <d.icon className="size-4" />
                </span>
                <div>
                  <p className="font-bold">{d.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {d.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            انتهت مدتك؟ تواصل مع الإدارة لتجديد اشتراكك بنفس الباقة أو ترقيتها.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="h-12 px-8 text-base shadow-soft-lg">
            <Link to={ctaHref}>
              <Beaker className="size-5" />
              فعّل اشتراكك الآن
            </Link>
          </Button>
        </div>
      </section>

      {/* Sections teaser + access note */}
      <section id="sections" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              داخل المنصة
            </Badge>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              قسمان، عشرات الوصفات، تجربة واحدة
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              بعد دخولك برمز الاشتراك ستجد جميع الوصفات مصنفة في قسمين واضحين،
              مع بحث فوري وعرض تفصيلي لكل وصفة: النسب، خطوات التحضير، تحذيرات
              السلامة والفيديو التوضيحي.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "بحث فوري في كل الوصفات والمواد الأولية",
                "حاسبة دفعات مدمجة: من 1 كغ إلى 1000 كغ لكل وصفة",
                "قسم المواد الأولية: المواصفات والسلامة والبدائل",
                "تصنيف واضح بين المنظفات المنزلية والعناية بالسيارات",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm font-medium">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 shadow-soft">
              <Link to={ctaHref}>
                ابدأ الآن
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft-lg sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-bold">ملاحظات هامة لجميع الوصفات</h3>
              <Badge variant="outline" className="text-xs">
                تأكد قبل البدء
              </Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "النسب المئوية: احرص على دقة القياس بميزان حساس.",
                "الترتيب: أضف المكونات بالترتيب المذكور لضمان التجانس.",
                "التحريك: استخدم خلاطاً كهربائياً أو حرك يدوياً باستمرار.",
                "السلامة: ارتدِ قفازات ونظارات وكمامات عند التعامل مع المواد الكيميائية.",
                "التخزين: خزن المنتجات في مكان بارد وجاف بعيداً عن الشمس.",
                "الصلاحية: معظم المنتجات تبقى صالحة من 12 إلى 18 شهراً.",
              ].map((t) => (
                <p
                  key={t}
                  className="rounded-xl border border-border/60 bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground"
                >
                  {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
          <div className="flex items-center gap-2 text-primary">
            <FlaskConical className="size-5" />
            <span className="text-lg font-bold">Mounir Formule</span>
          </div>
          <p className="text-sm text-muted-foreground">
            وصفات التنظيف والعناية — صُممت بعناية فائقة.
          </p>
          <p className="text-xs text-muted-foreground/70">
            &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
          <Link
            to="/admin"
            className="text-xs text-muted-foreground/50 underline decoration-dotted underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            دخول الإدارة
          </Link>
        </div>
      </footer>
    </div>
  );
}
