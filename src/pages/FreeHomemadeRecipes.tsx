import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BrandMark } from "@/components/BrandMark";
import { LangToggle } from "@/components/LangToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BatchCalculator } from "@/components/RecipeBits";
import { useI18n } from "@/i18n";
import { HOMEMADE_FORMULAS } from "@/convex/recipeDataHomemade";
import { parseLines } from "@/lib/recipe-utils";
import { CookingPot, Lock, Search, X } from "lucide-react";

/**
 * Free preview page — open to everyone, no account required.
 * Shows the full "homemade recipes" collection (data-only, no DB access)
 * to attract visitors toward the paid sections.
 */
export default function FreeHomemadeRecipes() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");

  const isRtl = lang === "ar";
  const fr = lang !== "ar";

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HOMEMADE_FORMULAS;
    return HOMEMADE_FORMULAS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.titleFr ?? "").toLowerCase().includes(q) ||
        r.percentages.toLowerCase().includes(q) ||
        r.percentagesFr.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? "rtl" : "ltr"}>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl 2xl:max-w-[110rem] items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <BrandMark className="size-9 shadow-soft" />
            <span className="text-lg font-extrabold tracking-tight">
              Formule DZ
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <Button asChild className="rounded-xl">
              <Link to="/auth?returnTo=/recipes">
                {t("free.cta.signIn")}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl 2xl:max-w-[110rem] px-4 py-10 sm:px-6">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-rose-400/25 bg-rose-400/10 text-rose-700 dark:text-rose-300">
              <CookingPot className="size-7" />
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("free.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            {t("free.subtitle")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t("free.badge")}
          </div>
        </div>

        {/* Search */}
        <div className="relative mx-auto mb-8 w-full max-w-md">
          <Search className="absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("recipes.searchRecipes")}
            className="h-11 rounded-xl bg-card ps-10 shadow-soft"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={t("recipes.clearSearch")}
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {list.map((r, i) => {
            const title = fr ? r.titleFr || r.title : r.title;
            const percentages = fr ? r.percentagesFr : r.percentages;
            const steps = fr ? r.stepsFr : r.steps;
            const warnings = fr ? r.warningsFr : r.warnings;
            const contentRtl = fr && !r.titleFr;
            const stepCount = parseLines(steps).length;
            return (
              <motion.div
                key={r.title}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft"
              >
                <div className="flex items-center gap-4 p-4 sm:p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-rose-400/25 bg-rose-400/10 text-rose-700 dark:text-rose-300">
                    <CookingPot className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="block truncate font-bold leading-snug">
                      {title}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="shrink-0 border-rose-400/25 bg-rose-400/10 text-[10px] text-rose-700 dark:text-rose-300"
                      >
                        {t("recipes.cat.homemade.short")}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {stepCount} {t("recipes.steps")}
                      </span>
                    </p>
                  </div>
                  <span
                    className="hidden shrink-0 select-none font-mono text-xs font-bold text-muted-foreground/50 sm:block"
                    aria-hidden
                  >
                    {String(r.order).padStart(2, "0")}
                  </span>
                </div>

                <div className="space-y-6 border-t border-border/60 p-4 sm:p-5">
                  <section dir={contentRtl ? "rtl" : undefined}>
                    <h4 className="mb-2.5 text-sm font-bold text-primary">
                      {t("recipes.pct.title")}
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {parseLines(percentages).map((line, j) => {
                        const [name, pct] = line.split(/[:：]/);
                        return (
                          <div
                            key={j}
                            className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-muted/40 px-3 py-2"
                          >
                            <span className="text-xs font-semibold">
                              {name?.trim()}
                            </span>
                            <span
                              className="font-mono text-xs font-bold text-primary"
                              dir="ltr"
                            >
                              {pct?.trim() ?? ""}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <section dir={contentRtl ? "rtl" : undefined}>
                    <h4 className="mb-2.5 text-sm font-bold text-primary">
                      {t("recipes.stepsTitle")}
                    </h4>
                    <ol className="space-y-1.5">
                      {parseLines(steps).map((s, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm leading-relaxed"
                        >
                          <span className="font-bold text-primary">
                            {j + 1}.
                          </span>
                          <span>{s.replace(/^\d+[.)]\s*/, "")}</span>
                        </li>
                      ))}
                    </ol>
                  </section>

                  {warnings && (
                    <section dir={contentRtl ? "rtl" : undefined}>
                      <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-4">
                        <h4 className="mb-1 text-sm font-bold text-yellow-700 dark:text-yellow-300">
                          ⚠️ {t("recipes.warningsTitle")}
                        </h4>
                        <p className="whitespace-pre-line text-sm leading-relaxed text-yellow-800 dark:text-yellow-200/90">
                          {warnings}
                        </p>
                      </div>
                    </section>
                  )}

                  <section>
                    <BatchCalculator percentages={percentages} title={title} />
                  </section>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Upsell banner */}
        <div className="mt-12 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-transparent p-8 text-center">
          <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="size-6" />
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {t("free.upsell.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            {t("free.upsell.text")}
          </p>
          <Button asChild size="lg" className="mt-6 rounded-xl px-8">
            <Link to="/#pricing">
              {t("free.upsell.cta")}
            </Link>
          </Button>
        </div>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Formule DZ — {t("footer.rights")}
      </footer>
    </div>
  );
}
