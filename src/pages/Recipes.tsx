import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import {
  AlertTriangle,
  Car,
  FlaskConical,
  Home,
  KeyRound,
  ListOrdered,
  Loader2,
  LogOut,
  Scale,
  Search,
  X,
  Youtube,
} from "lucide-react";

type Recipe = Doc<"recipes">;

const categoryMeta = {
  cleaners: {
    label: "منظفات منزلية",
    short: "منزلي",
    icon: Home,
    chip: "bg-primary/10 text-primary border-primary/20",
    dot: "bg-primary",
    heading: "القسم الأول: وصفات المنظفات المنزلية",
    headingAccent: "border-primary",
  },
  cars: {
    label: "العناية بالسيارات",
    short: "سيارات",
    icon: Car,
    chip: "bg-cyan-600/10 text-cyan-600 border-cyan-600/20",
    dot: "bg-cyan-600",
    heading: "القسم الثاني: وصفات العناية بالسيارات",
    headingAccent: "border-cyan-600",
  },
} as const;

function getYoutubeEmbed(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.split("/")[1]}?rel=0`;
    }
    if (u.searchParams.has("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}?rel=0`;
    }
    if (u.pathname.includes("/embed/")) return trimmed;
  } catch {
    return null;
  }
  return null;
}

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parsePercentageLine(line: string): { name: string; pct: number | null } {
  const m = line.match(/(.+?)\s*[:：]\s*(\d+(?:\.\d+)?)\s*%/);
  if (m) return { name: m[1].trim(), pct: parseFloat(m[2]) };
  const pctOnly = line.match(/(\d+(?:\.\d+)?)\s*%/);
  return { name: line.replace(/\d+(?:\.\d+)?\s*%/, "").trim() || "مكوّن", pct: pctOnly ? parseFloat(pctOnly[1]) : null };
}

function PercentageBars({ text }: { text: string }) {
  const lines = parseLines(text);
  return (
    <div className="space-y-2.5">
      {lines.map((line, i) => {
        const { name, pct } = parsePercentageLine(line);
        return (
          <div key={i}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold">{name}</span>
              <span className="font-mono text-muted-foreground" dir="ltr">
                {pct !== null ? `${pct}%` : ""}
              </span>
            </div>
            {pct !== null && (
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              ) }
          </div>
        );
      })}
      {lines.every((l) => parsePercentageLine(l).pct === null) && (
        <p className="whitespace-pre-line text-sm leading-relaxed">{text}</p>
        )}
    </div>
  );
}

function RecipeDialog({
  recipe,
  open,
  onOpenChange,
}: {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  if (!recipe) return null;
  const embed = recipe.videoUrl ? getYoutubeEmbed(recipe.videoUrl) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-border/60 bg-muted/40 px-6 py-5 text-right">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="outline"
              className={`gap-1.5 ${categoryMeta[recipe.category].chip}`}
            >
              {(() => {
                const Icon = categoryMeta[recipe.category].icon;
                return <Icon className="size-3.5" />;
              })()}
              {categoryMeta[recipe.category].label}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold leading-snug">
            {recipe.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            تفاصيل وصفة {recipe.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 px-6 py-6">
          {recipe.percentages.trim() !== "" && (
            <section>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
                <Scale className="size-4" />
                النسب المئوية
              </h4>
              <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                {recipe.percentages.includes("%") ? (
                  <PercentageBars text={recipe.percentages} />
                ) : (
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {recipe.percentages}
                  </p>
                )}
              </div>
            </section>
          )}

          <section>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-600">
              <ListOrdered className="size-4" />
              طريقة التحضير
            </h4>
            <ol className="space-y-2.5">
              {parseLines(recipe.steps).map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-3 text-sm leading-relaxed"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-xs font-bold text-emerald-600">
                    {i + 1}
                  </span>
                  <span>{step.replace(/^\d+[.)-]\s*/, "")}</span>
                </li>
              ))}
            </ol>
          </section>

          {recipe.warnings && recipe.warnings.trim() !== "" && (
            <section>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-destructive">
                <AlertTriangle className="size-4" />
                تحذيرات السلامة
              </h4>
              <div className="space-y-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                {parseLines(recipe.warnings).map((w, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm leading-relaxed text-destructive">
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                    {w}
                  </p>
                ))}
              </div>
            </section>
          )}

          {embed && (
            <section>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold">
                <Youtube className="size-4 text-red-500" />
                فيديو توضيحي
              </h4>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-black shadow-soft">
                <iframe
                  src={embed}
                  title={`فيديو: ${recipe.title}`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RecipeCard({
  recipe,
  onSelect,
}: {
  recipe: Recipe;
  onSelect: (r: Recipe) => void;
}) {
  const meta = categoryMeta[recipe.category];
  const Icon = meta.icon;
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(recipe)}
      className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card p-5 text-right shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <Badge variant="outline" className={`gap-1.5 ${meta.chip}`}>
          <Icon className="size-3.5" />
          {meta.short}
        </Badge>
        {recipe.videoUrl && recipe.videoUrl.trim() !== "" && (
          <Youtube className="size-4 text-red-500/80" />
        )}
      </div>
      <h3 className="mb-2 line-clamp-2 font-bold leading-snug group-hover:text-primary transition-colors">
        {recipe.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {parseLines(recipe.steps)[0] ?? ""}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
        عرض التفاصيل
        <ArrowIcon />
      </span>
    </motion.button>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

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

export default function Recipes() {
  const { user, signOut } = useAuth();
  const recipes = useQuery(api.recipes.list, {});
  const ensureSeed = useMutation(api.recipes.ensureSeed);
  const accessStatus = useQuery(api.access.status, {});
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | "cleaners" | "cars">("all");
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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
        {/* Welcome + search */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              مكتبة الوصفات
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              ابحث وتصفّح الوصفات المتاحة لاشتراكك
            </p>
          </div>
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث في الوصفات..."
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

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <CategoryPill
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="الكل"
            count={(recipes?.length ?? 0)}
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
              >
                <Skeleton className="mb-4 h-5 w-20 rounded-full" />
                <Skeleton className="mb-2 h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-1.5 h-4 w-5/6" />
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

        {/* Results */}
        {filtered.length > 0 && (
          <>
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((r) => (
                  <RecipeCard
                    key={r._id}
                    recipe={r}
                    onSelect={(rec) => {
                      setSelected(rec);
                      setDialogOpen(true);
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </main>

      <RecipeDialog
        recipe={selected}
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setSelected(null);
        }}
      />

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
            <AlertDialogAction onClick={handleSignOut} className="bg-destructive text-white hover:bg-destructive/90">
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
