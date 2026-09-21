import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BatchCalculator } from "@/components/RecipeBits";
import { MaterialsSection } from "@/components/MaterialsSection";
import { BrandMark } from "@/components/BrandMark";
import { LangToggle } from "@/components/LangToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n";
import { findMaterial, localizeMaterial } from "@/lib/materials";
import { parseLines } from "@/lib/recipe-utils";
import {
  AlertTriangle,
  Beaker,
  Car,
  ChevronDown,
  CookingPot,
  FlaskConical,
  Home,
  KeyRound,
  Leaf,
  Loader2,
  LogOut,
  Scale,
  Search,
  X,
} from "lucide-react";

type Recipe = Doc<"recipes">;
type Category = "all" | "cleaners" | "cars" | "natural" | "homemade";

const CATEGORY_ICON = {
  cleaners: Home,
  cars: Car,
  natural: Leaf,
  homemade: CookingPot,
} as const;

const CATEGORY_CHIP = {
  cleaners: "bg-amber-400/10 text-amber-700 dark:text-amber-300 border-amber-400/25",
  cars: "bg-sky-400/12 text-sky-700 dark:text-sky-300 border-sky-400/25",
  natural: "bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 border-emerald-400/25",
  homemade: "bg-rose-400/10 text-rose-700 dark:text-rose-300 border-rose-400/25",
} as const;
type MainView = "recipes" | "materials";

/**
 * Localized recipe content for the active language.
 * English falls back to the French translation, then to Arabic.
 */
function recipeView(r: Recipe, lang: "ar" | "fr" | "en") {
  const wantEn = lang === "en";
  const useFr = (wantEn || lang === "fr") && !!r.titleFr;
  return {
    title: useFr ? r.titleFr! : r.title,
    percentages:
      useFr && r.percentagesFr ? r.percentagesFr : r.percentages ?? "",
    steps: useFr && r.stepsFr ? r.stepsFr : r.steps ?? "",
    warnings: useFr && r.warningsFr ? r.warningsFr : r.warnings ?? "",
    /** UI language showing untranslated (Arabic) recipe content. */
    isArabicContent: lang !== "ar" && !r.titleFr,
  };
}

/* ------------------------------------------------------------------ */
/* Access gate (localized)                                             */
/* ------------------------------------------------------------------ */

function AccessGate({ onUnlocked }: { onUnlocked: () => void }) {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const redeem = useMutation(api.access.redeem);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length !== 8) {
      setError(t("recipes.gate.badLength"));
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await redeem({ code: code.trim() });
      if (res.ok) {
        onUnlocked();
      } else {
        setError(
          res.reason === "used"
            ? t("access.usedByOther")
            : t("access.badCode"),
        );
      }
    } catch {
      setError(t("recipes.gate.error"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-8 text-center shadow-soft-lg">
        <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <KeyRound className="size-7" />
        </span>
        <h2 className="mb-1 text-xl font-bold">{t("recipes.gate.title")}</h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {t("recipes.gate.text")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError(null);
            }}
            placeholder="XXXXXXXX"
            dir="ltr"
            maxLength={8}
            className="h-12 rounded-xl text-center font-mono text-xl font-bold tracking-widest"
            autoComplete="off"
            autoFocus
          />
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
          <Button
            type="submit"
            className="h-11 w-full rounded-xl shadow-soft"
            disabled={busy}
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              t("recipes.gate.activate")
            )}
          </Button>
        </form>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          {t("recipes.gate.durations")}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {t("recipes.gate.noCode")}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Recipe card: header row + inline expandable details                 */
/* ------------------------------------------------------------------ */

function MaterialChip({ name }: { name: string }) {
  const { lang } = useI18n();
  const info = findMaterial(name);
  if (!info) return null;
  const view = localizeMaterial(info, lang);
  return (
    <span
      title={`${view.name} — ${view.role}`}
      className="inline-flex cursor-help items-center gap-1 rounded-full border border-border/70 bg-muted/60 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
    >
      <FlaskConical className="size-2.5" />
      {view.name}
    </span>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const view = recipeView(recipe, lang);
  const cat = recipe.category;
  const meta = {
    icon: CATEGORY_ICON[cat],
    chip: CATEGORY_CHIP[cat],
    short:
      cat === "cars"
        ? t("recipes.cat.cars.short")
        : cat === "natural"
          ? t("recipes.cat.natural.short")
          : cat === "homemade"
            ? t("recipes.cat.homemade.short")
            : t("recipes.cat.cleaners.short"),
  };
  const Icon = meta.icon;
  const firstMaterials = parseLines(view.percentages)
    .slice(0, 3)
    .map((l) => l.split(/[:：]/)[0]?.trim() ?? "")
    .filter(Boolean);
  const stepCount = parseLines(view.steps).length;
  // Arabic recipe content displayed inside a French (LTR) page
  const contentRtl = view.isArabicContent;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow duration-300 ${
        open
          ? "border-primary/40 shadow-soft-lg"
          : "border-border/70 hover:shadow-soft-lg"
      }`}
    >
      {/* Header row — always visible */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 rounded-2xl p-4 text-start focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/70 sm:p-5"
      >
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${meta.chip}`}
        >
          <Icon className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-bold leading-snug">
            {view.title}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className={`shrink-0 text-[10px] ${meta.chip}`}
            >
              {meta.short}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {stepCount} {t("recipes.steps")}
            </span>
            {firstMaterials[0] && (
              <span className="hidden truncate text-[11px] text-muted-foreground sm:inline">
                · {firstMaterials.join(" · ")}
              </span>
            )}
          </span>
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Inline expandable details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/60"
          >
            <div className="space-y-6 p-4 sm:p-5">
              {/* Percentages */}
              {view.percentages.trim() !== "" && (
                <section dir={contentRtl ? "rtl" : undefined}>
                  <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-primary">
                    <Scale className="size-4" />
                    {t("recipes.pct.title")}
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {parseLines(view.percentages).map((line, i) => {
                      const [name, pct] = line.split(/[:：]/);
                      return (
                        <div
                          key={i}
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
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {firstMaterials.map((m) => (
                      <MaterialChip key={m} name={m} />
                    ))}
                  </div>
                </section>
              )}

              {/* Calculator */}
              <section>
                <BatchCalculator
                  percentages={view.percentages}
                  title={view.title}
                />
              </section>

              {/* Steps */}
              <section dir={contentRtl ? "rtl" : undefined}>
                <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <Beaker className="size-4" />
                  {t("recipes.stepsTitle")}
                </h4>
                <ol className="space-y-2">
                  {parseLines(view.steps).map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-3 text-sm leading-relaxed"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {i + 1}
                      </span>
                      <span>{step.replace(/^\d+[.)-]\s*/, "")}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Warnings */}
              {view.warnings && view.warnings.trim() !== "" && (
                <section dir={contentRtl ? "rtl" : undefined}>
                  <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-destructive">
                    <AlertTriangle className="size-4" />
                    {t("recipes.warningsTitle")}
                  </h4>
                  <div className="space-y-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                    {parseLines(view.warnings).map((w, i) => (
                      <p
                        key={i}
                        className="flex items-start gap-2 text-sm leading-relaxed text-destructive"
                      >
                        <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                        {w}
                      </p>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */

export default function Recipes() {
  const { user, signOut } = useAuth();
  const { t, lang } = useI18n();
  const recipes = useQuery(api.recipes.list, {});
  const ensureSeed = useMutation(api.recipes.ensureSeed);
  const backfillFrench = useMutation(api.recipes.backfillFrench);
  const importNaturalBatch = useMutation(api.recipes.importNaturalBatch);
  const importNaturalFormulas = useMutation(api.recipes.importNaturalFormulas);
  const importHomemadeFormulas = useMutation(api.recipes.importHomemadeFormulas);
  const accessStatus = useQuery(api.access.status, {});
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<MainView>("recipes");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [signOutDialog, setSignOutDialog] = useState(false);
  const seededRef = useRef(false);
  const pendingCode = searchParams.get("code");

  // Auto-redeem a code passed from the auth page (?code=...)
  const redeem = useMutation(api.access.redeem);
  useEffect(() => {
    if (!pendingCode || accessStatus?.hasAccess) return;
    let cancelled = false;
    void (async () => {
      try {
        const res = await redeem({ code: pendingCode });
        if (!cancelled && res.ok) {
          setSearchParams({}, { replace: true });
        }
      } catch {
        // leave the code in the URL; the gate lets the user retry manually
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pendingCode, accessStatus?.hasAccess, redeem, setSearchParams]);

  // Catalog self-heal: run the idempotent sync once per load. The server-side
  // marker guard makes repeat calls cheap no-ops. Also backfill French
  // localization on rows that are missing it (no-op after the first pass).
  useEffect(() => {
    if (recipes == null || seededRef.current) return;
    seededRef.current = true;
    void ensureSeed();
    void backfillFrench();
    void importNaturalBatch();
    void importNaturalFormulas();
    void importHomemadeFormulas();
  }, [
    recipes,
    ensureSeed,
    backfillFrench,
    importNaturalBatch,
    importNaturalFormulas,
    importHomemadeFormulas,
  ]);

  const filtered = useMemo(() => {
    if (!recipes) return [];
    const q = query.trim().toLowerCase();
    return recipes
      .filter((r) => (category === "all" ? true : r.category === category))
      .filter(
        (r) =>
          q === "" ||
          r.title.toLowerCase().includes(q) ||
          (r.titleFr ?? "").toLowerCase().includes(q) ||
          r.steps.toLowerCase().includes(q) ||
          (r.percentages ?? "").toLowerCase().includes(q),
      )
      .sort((a, b) => a.order - b.order);
  }, [recipes, query, category]);

  const grouped = useMemo(
    () => ({
      cleaners: filtered.filter((r) => r.category === "cleaners"),
      cars: filtered.filter((r) => r.category === "cars"),
      natural: filtered.filter((r) => r.category === "natural"),
      homemade: filtered.filter((r) => r.category === "homemade"),
    }),
    [filtered],
  );

  const cleanersCount = recipes?.filter((r) => r.category === "cleaners").length ?? 0;
  const carsCount = recipes?.filter((r) => r.category === "cars").length ?? 0;
  const naturalCount = recipes?.filter((r) => r.category === "natural").length ?? 0;
  const homemadeCount = recipes?.filter((r) => r.category === "homemade").length ?? 0;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const catMeta = {
    cleaners: {
      heading: t("recipes.cat.cleaners.heading"),
      sub: t("recipes.cat.cleaners.sub"),
      label: t("recipes.cat.cleaners"),
      icon: Home,
      chip: CATEGORY_CHIP.cleaners,
    },
    cars: {
      heading: t("recipes.cat.cars.heading"),
      sub: t("recipes.cat.cars.sub"),
      label: t("recipes.cat.cars"),
      icon: Car,
      chip: CATEGORY_CHIP.cars,
    },
    natural: {
      heading: t("recipes.cat.natural.heading"),
      sub: t("recipes.cat.natural.sub"),
      label: t("recipes.cat.natural"),
      icon: Leaf,
      chip: CATEGORY_CHIP.natural,
    },
    homemade: {
      heading: t("recipes.cat.homemade.heading"),
      sub: t("recipes.cat.homemade.sub"),
      label: t("recipes.cat.homemade"),
      icon: CookingPot,
      chip: CATEGORY_CHIP.homemade,
    },
  } as const;

  // Signed in but has not redeemed an access code yet
  if (accessStatus != null && !accessStatus.hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-6xl 2xl:max-w-[110rem] items-center justify-between px-4 sm:px-6">
            <a href="/" className="flex items-center gap-2.5">
              <BrandMark className="size-9 shadow-soft" />
              <span className="text-lg font-bold tracking-tight">
                Formule DZ
              </span>
            </a>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LangToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-1.5"
              >
                <LogOut className="size-4" />
                {t("recipes.signout")}
              </Button>
            </div>
          </div>
        </header>
        <AccessGate
          onUnlocked={() => {
            setSearchParams({}, { replace: true });
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl 2xl:max-w-[110rem] items-center justify-between gap-3 px-4 sm:px-6">
          <a href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <FlaskConical className="size-5" />
            </span>
            <span className="hidden text-lg font-bold tracking-tight sm:block">
              Formule DZ
            </span>
          </a>
          <span className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate font-medium text-foreground">
              {user?.email ?? user?.name ?? t("recipes.subscriber")}
            </span>
            {accessStatus?.pkg && (
              <Badge
                variant="outline"
                className="shrink-0 border-primary/30 bg-primary/10 text-[10px] text-primary"
              >
                {accessStatus.pkg === "all"
                  ? t("recipes.pkg.all")
                  : accessStatus.pkg === "home"
                    ? t("recipes.pkg.home")
                    : t("recipes.pkg.cars")}
              </Badge>
            )}
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LangToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSignOutDialog(true)}
              className="gap-2"
            >
              <LogOut className="size-4" />
              {t("recipes.signout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl 2xl:max-w-[110rem] px-4 py-8 sm:px-6 sm:py-10">
        {/* Title + search */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {view === "recipes"
                ? t("recipes.title")
                : t("recipes.materialsTitle")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {view === "recipes"
                ? t("recipes.subtitle")
                : t("recipes.materialsSubtitle")}
            </p>
          </div>
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                view === "recipes"
                  ? t("recipes.searchRecipes")
                  : t("recipes.searchMaterials")
              }
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
        </div>

        {/* View tabs: recipes | materials */}
        <div className="mb-6 inline-flex w-full rounded-xl border border-border/70 bg-card p-1 shadow-soft sm:w-auto">
          {(
            [
              { id: "recipes" as const, label: t("recipes.tabRecipes"), icon: Beaker },
              { id: "materials" as const, label: t("recipes.tabMaterials"), icon: FlaskConical },
            ]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setView(tab.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors sm:flex-none ${
                view === tab.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {view === "materials" ? (
          <MaterialsSection searchQuery={query} onSearchChange={setQuery} />
        ) : (
          <>
            {/* Category filters */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <CategoryPill
                active={category === "all"}
                onClick={() => setCategory("all")}
                label={t("recipes.cat.all")}
                count={recipes?.length ?? 0}
              />
              <CategoryPill
                active={category === "cleaners"}
                onClick={() => setCategory("cleaners")}
                label={t("recipes.cat.cleaners")}
                count={cleanersCount}
              />
              <CategoryPill
                active={category === "cars"}
                onClick={() => setCategory("cars")}
                label={t("recipes.cat.cars")}
                count={carsCount}
              />
              <CategoryPill
                active={category === "natural"}
                onClick={() => setCategory("natural")}
                label={t("recipes.cat.natural")}
                count={naturalCount}
              />
              <CategoryPill
                active={category === "homemade"}
                onClick={() => setCategory("homemade")}
                label={t("recipes.cat.homemade")}
                count={homemadeCount}
              />
            </div>

            {/* Loading skeleton */}
            {recipes === undefined && (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
                  >
                    <Skeleton className="size-11 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-3.5 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {recipes != null && recipes.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FlaskConical className="size-6" />
                </div>
                <h3 className="mb-1 font-bold">{t("recipes.empty.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("recipes.empty.text")}
                </p>
              </div>
            )}

            {/* No search results */}
            {recipes != null && recipes.length > 0 && filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Search className="size-6" />
                </div>
                <h3 className="mb-1 font-bold">{t("recipes.noResults.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("recipes.noResults.text")}
                </p>
              </div>
            )}

            {/* Grouped sections */}
            {filtered.length > 0 && (
              <div className="space-y-10">
                {(["cleaners", "cars", "natural", "homemade"] as const).map((cat) => {
                  const list = grouped[cat];
                  if (list.length === 0) return null;
                  const meta = catMeta[cat];
                  const Icon = meta.icon;
                  return (
                    <section key={cat}>
                      {/* Section heading */}
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className={`flex size-10 items-center justify-center rounded-xl border ${meta.chip}`}
                        >
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <h2 className="text-lg font-extrabold tracking-tight">
                            {meta.heading}
                            <span className="text-muted-foreground">: </span>
                            {meta.sub}
                          </h2>
                          <p className="text-xs text-muted-foreground">
                            {list.length} {t("recipes.count")}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {list.map((r, i) => (
                          <div key={r._id} className="relative">
                            <span
                              className="absolute -start-1 top-5 z-10 hidden select-none font-mono text-xs font-bold text-muted-foreground/50 sm:block"
                              aria-hidden
                            >
                              {String(r.order || i + 1).padStart(2, "0")}
                            </span>
                            <RecipeCard recipe={r} />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      <AlertDialog open={signOutDialog} onOpenChange={setSignOutDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader className="text-start">
            <AlertDialogTitle>{t("recipes.signoutTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("recipes.signoutText")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>{t("recipes.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {t("recipes.signoutConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function CategoryPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
        active
          ? "border-primary bg-primary text-primary-foreground shadow-soft"
          : "border-border/70 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
          active ? "bg-primary-foreground/20" : "bg-muted"
        }`}
        dir="ltr"
      >
        {count}
      </span>
    </button>
  );
}
