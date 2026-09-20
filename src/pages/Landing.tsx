import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LangToggle } from "@/components/LangToggle";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  CalendarClock,
  Car,
  CheckCircle2,
  FlaskConical,
  Home,
  Infinity as InfinityIcon,
  CookingPot,
  Leaf,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Landing() {
  const { isLoading, isAuthenticated } = useAuth();
  const { t, lang, dir } = useI18n();
  const ForwardIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const ctaHref = isAuthenticated ? "/recipes" : "/auth?returnTo=%2Frecipes";

  const featureItems = [
    { icon: Scale, titleKey: "features.calc.title", textKey: "features.calc.text" },
    { icon: ShieldCheck, titleKey: "features.safety.title", textKey: "features.safety.text" },
    { icon: FlaskConical, titleKey: "features.materials.title", textKey: "features.materials.text" },
  ] as const;

  const sections = [
    {
      id: "cleaners" as const,
      icon: Home,
      chip: "bg-amber-400/10 text-amber-300",
      titleKey: "sections.cleaners.title",
      subtitleKey: "sections.cleaners.subtitle",
      descKey: "sections.cleaners.desc",
    },
    {
      id: "cars" as const,
      icon: Car,
      chip: "bg-cyan-400/10 text-cyan-300",
      titleKey: "sections.cars.title",
      subtitleKey: "sections.cars.subtitle",
      descKey: "sections.cars.desc",
    },
    {
      id: "natural" as const,
      icon: Leaf,
      chip: "bg-emerald-400/10 text-emerald-300",
      titleKey: "sections.natural.title",
      subtitleKey: "sections.natural.subtitle",
      descKey: "sections.natural.desc",
    },
    {
      id: "homemade" as const,
      icon: CookingPot,
      chip: "bg-rose-400/10 text-rose-300",
      titleKey: "sections.homemade.title",
      subtitleKey: "sections.homemade.subtitle",
      descKey: "sections.homemade.desc",
    },
  ];

  /* Pricing offers — package / duration / price */
  const pricingOffers = [
    {
      icon: Home,
      pkgKey: "pricing.pkg.home",
      durationKey: "pricing.dur.month",
      price: lang === "fr" ? "2 000 DA" : "2,000 دج",
      noteKey: "pricing.note.month",
      chip: "bg-amber-400/10 text-amber-300 border-amber-400/25",
    },
    {
      icon: Car,
      pkgKey: "pricing.pkg.cars",
      durationKey: "pricing.dur.month",
      price: lang === "fr" ? "1 500 DA" : "1,500 دج",
      noteKey: "pricing.note.month",
      chip: "bg-cyan-400/10 text-cyan-300 border-cyan-400/25",
    },
    {
      icon: Home,
      pkgKey: "pricing.pkg.home",
      durationKey: "pricing.dur.year",
      price: lang === "fr" ? "5 000 DA" : "5,000 دج",
      noteKey: "pricing.note.year",
      saveKey: "pricing.save58",
      chip: "bg-amber-400/10 text-amber-300 border-amber-400/25",
      highlight: true,
    },
    {
      icon: Car,
      pkgKey: "pricing.pkg.cars",
      durationKey: "pricing.dur.year",
      price: lang === "fr" ? "4 000 DA" : "4,000 دج",
      noteKey: "pricing.note.year",
      saveKey: "pricing.save56",
      chip: "bg-cyan-400/10 text-cyan-300 border-cyan-400/25",
      highlight: true,
    },
    {
      icon: Sparkles,
      pkgKey: "pricing.pkg.all",
      durationKey: "pricing.dur.lifetime",
      price: lang === "fr" ? "15 000 DA" : "15,000 دج",
      noteKey: "pricing.note.lifetime",
      chip: "bg-amber-400/15 text-amber-300 border-amber-400/40",
      featured: true,
    },
  ];

  const packages = [
    {
      icon: Home,
      titleKey: "pricing.pkg.home",
      descKey: "pricing.pkg.home.desc",
      chip: "bg-amber-400/10 text-amber-300 border-amber-400/25",
    },
    {
      icon: Car,
      titleKey: "pricing.pkg.cars",
      descKey: "pricing.pkg.cars.desc",
      chip: "bg-cyan-400/10 text-cyan-300 border-cyan-400/25",
    },
    {
      icon: Sparkles,
      titleKey: "pricing.pkg.all",
      descKey: "pricing.pkg.all.desc",
      chip: "bg-amber-400/15 text-amber-300 border-amber-400/40",
      featured: true,
    },
  ];

  const durations = [
    {
      icon: CalendarClock,
      titleKey: "pricing.dur.month",
      textKey: "pricing.dur.month.text",
    },
    {
      icon: CalendarClock,
      titleKey: "pricing.dur.year",
      textKey: "pricing.dur.year.text",
    },
    {
      icon: InfinityIcon,
      titleKey: "pricing.dur.lifetime",
      textKey: "pricing.dur.lifetime.text",
    },
  ];

  const notes = ["inside.n1", "inside.n2", "inside.n3", "inside.n4", "inside.n5", "inside.n6"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
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
              {t("nav.sections")}
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              {t("nav.why")}
            </a>
            <a href="#pricing" className="transition-colors hover:text-primary">
              {t("nav.offers")}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <LangToggle />
            <Button asChild className="bg-primary text-primary-foreground shadow-soft hover:bg-primary/90">
              <Link to={ctaHref}>
                {isAuthenticated ? t("nav.recipes") : t("nav.login")}
                <ForwardIcon className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — deep navy with gold accents */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-transparent to-transparent" />
          <div className="absolute -top-32 right-1/2 h-[480px] w-[720px] translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
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
              className="mb-6 gap-1.5 border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-amber-300"
            >
              <Sparkles className="size-3.5" />
              {t("hero.badge")}
            </Badge>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.2] tracking-tight sm:text-6xl sm:leading-[1.15]">
              {t("hero.title1")}
              <span className="text-primary"> {t("hero.title2")}</span>
            </h1>
            <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-primary px-8 text-base text-primary-foreground shadow-soft-lg hover:bg-primary/90"
              >
                <Link to={ctaHref}>
                  <Beaker className="size-5" />
                  {t("hero.explore")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-border/70 bg-card/60 px-8 text-base backdrop-blur"
              >
                <a href="#pricing">
                  <Wallet className="size-4" />
                  {t("hero.viewOffers")}
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              <Lock className="mb-0.5 inline size-3" /> {t("hero.lockNote")}
            </p>
          </motion.div>

          {/* Floating preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sections.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-border/70 bg-card p-6 text-start shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-10 items-center justify-center rounded-xl ${s.chip}`}
                  >
                    <s.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {t(s.titleKey)}
                    </p>
                    <h3 className="font-bold">{t(s.subtitleKey)}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(s.descKey)}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-y border-border/60 bg-card/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {featureItems.map((f) => (
              <div key={f.titleKey} className="text-center sm:text-start">
                <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 sm:mx-0">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{t(f.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(f.textKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing offers table */}
      <section
        id="pricing"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 gap-1.5 border border-amber-400/25 bg-amber-400/10 text-amber-300"
          >
            <Wallet className="size-3.5" />
            {t("pricing.badge")}
          </Badge>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("pricing.title")}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Offers table */}
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft-lg">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/50 text-xs text-muted-foreground">
                  <th className="px-4 py-3.5 text-start font-bold sm:px-6">
                    {t("pricing.table.pkg")}
                  </th>
                  <th className="px-4 py-3.5 text-center font-bold sm:px-6">
                    {t("pricing.table.duration")}
                  </th>
                  <th className="px-4 py-3.5 text-end font-bold sm:px-6">
                    {t("pricing.table.price")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingOffers.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border/40 transition-colors last:border-0 ${
                      row.featured
                        ? "bg-amber-400/[0.07]"
                        : row.highlight
                          ? "bg-muted/30"
                          : ""
                    }`}
                  >
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex size-9 shrink-0 items-center justify-center rounded-lg border ${row.chip}`}
                        >
                          <row.icon className="size-4" />
                        </span>
                        <div>
                          <p className="font-bold">{t(row.pkgKey)}</p>
                          {row.featured && (
                            <Badge className="mt-1 border-none bg-amber-400 text-[10px] text-amber-950">
                              {t("pricing.best")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center sm:px-6">
                      <span className="rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs font-bold">
                        {t(row.durationKey)}
                      </span>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {t(row.noteKey)}
                        {row.saveKey && (
                          <span className="font-bold text-emerald-400">
                            {" — "}
                            {t(row.saveKey)}
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-end sm:px-6">
                      <span
                        className={`font-mono text-lg font-extrabold ${
                          row.featured ? "text-amber-300" : "text-foreground"
                        }`}
                        dir="ltr"
                      >
                        {row.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border/60 bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground sm:px-6">
            {t("pricing.howto")}
          </div>
        </div>

        {/* Package contents */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.titleKey}
              className={`relative rounded-2xl border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 ${
                p.featured
                  ? "border-amber-400/30 shadow-soft-lg"
                  : "border-border/70"
              }`}
            >
              {p.featured && (
                <Badge className="absolute -top-2.5 start-6 border-none bg-amber-400 text-[10px] text-amber-950">
                  {t("pricing.mostValue")}
                </Badge>
              )}
              <span
                className={`mb-4 flex size-11 items-center justify-center rounded-xl border ${p.chip}`}
              >
                <p.icon className="size-5" />
              </span>
              <h3 className="mb-1.5 text-lg font-bold">{t(p.titleKey)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(p.descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Durations */}
        <div className="mt-10 rounded-2xl border border-border/70 bg-card p-6 shadow-soft sm:p-8">
          <h3 className="mb-5 text-center font-bold">{t("pricing.durationsTitle")}</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {durations.map((d) => (
              <div
                key={d.titleKey}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
                  <d.icon className="size-4" />
                </span>
                <div>
                  <p className="font-bold">{t(d.titleKey)}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {t(d.textKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            {t("pricing.renew")}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button
            asChild
            size="lg"
            className="h-12 bg-primary px-8 text-base text-primary-foreground shadow-soft-lg hover:bg-primary/90"
          >
            <Link to={ctaHref}>
              <Beaker className="size-5" />
              {t("pricing.activate")}
            </Link>
          </Button>
        </div>
      </section>

      {/* Sections teaser + access note */}
      <section
        id="sections"
        className="mx-auto w-full max-w-6xl border-t border-border/60 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge
              variant="secondary"
              className="mb-4 border border-amber-400/25 bg-amber-400/10 text-amber-300"
            >
              {t("inside.badge")}
            </Badge>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t("inside.title")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t("inside.text")}
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "inside.li1",
                "inside.li2",
                "inside.li3",
                "inside.li4",
                "inside.li5",
              ].map((k) => (
                <li
                  key={k}
                  className="flex items-center gap-2.5 text-sm font-medium"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-amber-300" />
                  {t(k)}
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-primary text-primary-foreground shadow-soft hover:bg-primary/90"
            >
              <Link to={ctaHref}>
                {t("inside.cta")}
                <ForwardIcon className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft-lg sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="font-bold">{t("inside.notesTitle")}</h3>
              <Badge variant="outline" className="shrink-0 text-xs">
                {t("inside.notesBadge")}
              </Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {notes.map((k) => (
                <p
                  key={k}
                  className="rounded-xl border border-border/60 bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground"
                >
                  {t(k)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
          <div className="flex items-center gap-2 text-amber-300">
            <FlaskConical className="size-5" />
            <span className="text-lg font-bold">Mounir Formule</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("brand.tagline")}
          </p>
          <p className="text-xs text-muted-foreground/70">
            &copy; {new Date().getFullYear()} {t("footer.rights")}
          </p>
          <Link
            to="/admin"
            className="text-xs text-muted-foreground/50 underline decoration-dotted underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            {t("footer.admin")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
