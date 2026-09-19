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
import { findMaterial } from "@/lib/materials";
import { parseLines } from "@/lib/recipe-utils";
import {
  AlertTriangle,
  Beaker,
  Car,
  ChevronDown,
  FlaskConical,
  Home,
  KeyRound,
  Loader2,
  LogOut,
  Scale,
  Search,
  X,
} from "lucide-react";

type Recipe = Doc<"recipes">;
type Category = "all" | "cleaners" | "cars";
type MainView = "recipes" | "materials";

const categoryMeta = {
  cleaners: {
    label: "منظفات منزلية",
    short: "منزلي",
    icon: Home,
    chip: "bg-amber-400/10 text-amber-300 border-amber-400/25",
    heading: "القسم الأول",
    sub: "وصفات المنظفات المنزلية",
    accent: "from-primary/10",
  },
  cars: {
    label: "العناية بالسيارات",
    short: "سيارات",
    icon: Car,
    chip: "bg-cyan-400/10 text-cyan-300 border-cyan-400/25",
    heading: "القسم الثاني",
    sub: "وصفات العناية بالسيارات",
    accent: "from-cyan-400/10",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Access gate (unchanged behavior)                                    */
/* ------------------------------------------------------------------ */

function AccessGate({ onUnlocked }: { onUnlocked: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const redeem = useMutation(api.access.redeem);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length !== 8) {
      setError("أدخل كوداً مكوناً من 8 خانات");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await redeem({ code: code.trim() });
      if (res.ok) {
        onUnlocked();
      } else {
        setError(res.message);
      }
    } catch {
      setError("حدث خطأ، حاول مرة أخرى");
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
        <h2 className="mb-1 text-xl font-bold">تنشيط الاشتراك</h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          أدخل رمز الاشتراك المكوّن من 8 خانات للوصول إلى مكتبة الوصفات
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
            {busy ? <Loader2 className="size-4 animate-spin" /> : "تفعيل الكود"}
          </Button>
        </form>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          المدد المتاحة: <span className="font-semibold">شهر</span> (ينتهي
          تلقائياً بعد 30 يوماً) · <span className="font-semibold">سنة</span>
          (ينتهي بعد 365 يوماً) ·{" "}
          <span className="font-semibold">مدى الحياة</span> (لا ينتهي أبداً).
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          لا تملك رمزاً؟ تواصل معنا للحصول على اشتراك.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Recipe card: header row + inline expandable details                 */
/* ------------------------------------------------------------------ */

function MaterialChip({ name }: { name: string }) {
  const info = findMaterial(name);
  if (!info) return null;
  return (
    <span
      title={`${info.name} — ${info.role}`}
      className="inline-flex cursor-help items-center gap-1 rounded-full border border-border/70 bg-muted/60 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
    >
      <FlaskConical className="size-2.5" />
      {info.name}
    </span>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
  const meta = categoryMeta[recipe.category];
  const Icon = meta.icon;
  const firstMaterials = parseLines(recipe.percentages)
    .slice(0, 3)
    .map((l) => l.split(/[:：]/)[0]?.trim() ?? "")
    .filter(Boolean);
  const stepCount = parseLines(recipe.steps).length;

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
        className="flex w-full items-center gap-4 p-4 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
      >
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${meta.chip}`}
        >
          <Icon className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-bold leading-snug transition-colors group-hover:text-primary">
            {recipe.title}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className={`shrink-0 text-[10px] ${meta.chip}`}
            >
              {meta.short}
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {stepCount} خطوات
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
              {recipe.percentages.trim() !== "" && (
                <section>
                  <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-primary">
                    <Scale className="size-4" />
                    النسب المئوية
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {parseLines(recipe.percentages).map((line, i) => {
                      const [name, pct] = line.split(/[:：]/);
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-muted/40 px-3 py-2"
                        >
                          <span className="text-xs font-semibold">{name?.trim()}</span>
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
                  percentages={recipe.percentages}
                  title={recipe.title}
                />
              </section>

              {/* Steps */}
              <section>
                <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <Beaker className="size-4" />
                  طريقة التحضير
                </h4>
                <ol className="space-y-2">
                  {parseLines(recipe.steps).map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-3 text-sm leading-relaxed"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-bold text-emerald-400">
                        {i + 1}
                      </span>
                      <span>{step.replace(/^\d+[.)-]\s*/, "")}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Warnings */}
              {recipe.warnings && recipe.warnings.trim() !== "" && (
                <section>
                  <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-destructive">
                    <AlertTriangle className="size-4" />
                    تحذيرات السلامة
                  </h4>
                  <div className="space-y-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                    {parseLines(recipe.warnings).map((w, i) => (
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
  const recipes = useQuery(api.recipes.list, {});
  const ensureSeed = useMutation(api.recipes.ensureSeed);
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
  // marker guard makes repeat calls cheap no-ops.
  useEffect(() => {
    if (recipes == null || seededRef.current) return;
    seededRef.current = true;
    void ensureSeed();
  }, [recipes, ensureSeed]);

  const filtered = useMemo(() => {
    if (!recipes) return [];
    const q = query.trim().toLowerCase();
    return recipes
      .filter((r) => (category === "all" ? true : r.category === category))
      .filter(
        (r) =>
          q === "" ||
          r.title.toLowerCase().includes(q) ||
          r.steps.toLowerCase().includes(q) ||
          (r.percentages ?? "").toLowerCase().includes(q),
      )
      .sort((a, b) => a.order - b.order);
  }, [recipes, query, category]);

  const grouped = useMemo(
    () => ({
      cleaners: filtered.filter((r) => r.category === "cleaners"),
      cars: filtered.filter((r) => r.category === "cars"),
    }),
    [filtered],
  );

  const cleanersCount = recipes?.filter((r) => r.category === "cleaners").length ?? 0;
  const carsCount = recipes?.filter((r) => r.category === "cars").length ?? 0;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  // Signed in but has not redeemed an access code yet
  if (accessStatus != null && !accessStatus.hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <a href="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                <FlaskConical className="size-5" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Mounir Formule
              </span>
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-1.5"
            >
              <LogOut className="size-4" />
              خروج
            </Button>
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
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <FlaskConical className="size-5" />
            </span>
            <span className="hidden text-lg font-bold tracking-tight sm:block">
              Mounir Formule
            </span>
          </a>
          <span className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate font-medium text-foreground">
              {user?.email ?? user?.name ?? "مشترك"}
            </span>
            {accessStatus?.pkg && (
              <Badge
                variant="outline"
                className="shrink-0 border-primary/30 bg-primary/10 text-[10px] text-primary"
              >
                {accessStatus.pkg === "all"
                  ? "كل الباقات"
                  : accessStatus.pkg === "home"
                    ? "باقة منزلية"
                    : "باقة سيارات"}
              </Badge>
            )}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSignOutDialog(true)}
            className="gap-2"
          >
            <LogOut className="size-4" />
            خروج
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Title + search */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {view === "recipes" ? "مكتبة الوصفات" : "قسم المواد الأولية"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {view === "recipes"
                ? "اضغط على أي وصفة لعرض النسب وحاسبة الدفعة وخطوات التحضير"
                : "مواصفات كل مادة أولية، إرشادات السلامة، والبدائل المتاحة"}
            </p>
          </div>
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                view === "recipes" ? "ابحث في الوصفات..." : "ابحث في المواد..."
              }
              className="h-11 rounded-xl bg-card pr-10 shadow-soft"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="مسح البحث"
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
              { id: "recipes" as const, label: "الوصفات", icon: Beaker },
              { id: "materials" as const, label: "المواد الأولية", icon: FlaskConical },
            ]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setView(t.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors sm:flex-none ${
                view === t.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="size-4" />
              {t.label}
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
                label="الكل"
                count={recipes?.length ?? 0}
              />
              <CategoryPill
                active={category === "cleaners"}
                onClick={() => setCategory("cleaners")}
                label="منظفات منزلية"
                count={cleanersCount}
              />
              <CategoryPill
                active={category === "cars"}
                onClick={() => setCategory("cars")}
                label="العناية بالسيارات"
                count={carsCount}
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
                <h3 className="mb-1 font-bold">لا توجد وصفات بعد</h3>
                <p className="text-sm text-muted-foreground">
                  سيتم إضافة الوصفات قريباً — تابعنا لمزيد من التركيبات.
                </p>
              </div>
            )}

            {/* No search results */}
            {recipes != null && recipes.length > 0 && filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Search className="size-6" />
                </div>
                <h3 className="mb-1 font-bold">لا نتائج مطابقة</h3>
                <p className="text-sm text-muted-foreground">
                  جرّب كلمات بحث مختلفة أو غيّر التصنيف.
                </p>
              </div>
            )}

            {/* Grouped sections */}
            {filtered.length > 0 && (
              <div className="space-y-10">
                {(["cleaners", "cars"] as const).map((cat) => {
                  const list = grouped[cat];
                  if (list.length === 0) return null;
                  const meta = categoryMeta[cat];
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
                            {list.length} وصفة
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {list.map((r, i) => (
                          <div key={r._id} className="relative">
                            <span
                              className="absolute -right-1 top-5 z-10 hidden select-none font-mono text-xs font-bold text-muted-foreground/50 sm:block"
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
          <AlertDialogHeader className="text-right">
            <AlertDialogTitle>تسجيل الخروج؟</AlertDialogTitle>
            <AlertDialogDescription>
              ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى الوصفات.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              خروج
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
