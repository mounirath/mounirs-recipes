import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "sonner";
import {
  Car,
  Copy,
  FlaskConical,
  Home,
  KeyRound,
  Loader2,
  Lock,
  LogOut,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";

type Recipe = Doc<"recipes">;
type Subscriber = {
  _id: string;
  email: string | null;
  name: string | null;
  _creationTime: number;
  subscription: {
    pkg: "home" | "cars" | "all";
    duration: "month" | "year" | "lifetime";
    expiresAt: number | undefined;
    active: boolean;
  } | null;
};

const PKG_LABELS: Record<string, string> = {
  home: "باقة منزلية",
  cars: "باقة سيارات",
  all: "كل الباقات",
  none: "بدون باقة",
};

const DURATION_LABELS: Record<string, string> = {
  month: "شهر",
  year: "سنة",
  lifetime: "مدى الحياة",
};

const emptyForm = {
  title: "",
  category: "cleaners" as "cleaners" | "cars",
  percentages: "",
  steps: "",
  warnings: "",
  videoUrl: "",
};

export default function Admin() {
  const { isLoading: authLoading, isAuthenticated, user, signOut } = useAuth();
  const isAdmin = useQuery(api.admin.checkIsAdmin, {});
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<Id<"recipes"> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<Id<"recipes"> | null>(null);
  const [subSearch, setSubSearch] = useState("");

  const recipes = useQuery(
    api.admin.listAllRecipes,
    isAdmin === true ? {} : "skip",
  );
  const subscribers = useQuery(
    api.admin.listSubscribers,
    isAdmin === true ? {} : "skip",
  );
  const accessCodes = useQuery(
    api.admin.listAccessCodes,
    isAdmin === true ? {} : "skip",
  );

  const createRecipe = useMutation(api.admin.createRecipe);
  const updateRecipe = useMutation(api.admin.updateRecipe);
  const deleteRecipe = useMutation(api.admin.deleteRecipe);
  const generateAccessCode = useMutation(api.admin.generateAccessCode);
  const deleteAccessCode = useMutation(api.admin.deleteAccessCode);
  const setSubscription = useMutation(api.admin.setSubscription);
  const revokeSubscription = useMutation(api.admin.revokeSubscription);

  const [subEditor, setSubEditor] = useState<{
    email: string;
    pkg: "home" | "cars" | "all";
    duration: "month" | "year" | "lifetime";
  } | null>(null);
  const [subBusy, setSubBusy] = useState(false);

  const openSubEditor = (s: Subscriber) => {
    setSubEditor({
      email: s.email ?? "",
      pkg: s.subscription?.pkg ?? "all",
      duration: s.subscription?.duration ?? "month",
    });
  };

  const saveSubscription = async () => {
    if (!subEditor) return;
    setSubBusy(true);
    try {
      await setSubscription({
        email: subEditor.email,
        pkg: subEditor.pkg,
        duration: subEditor.duration,
      });
      toast.success(`تم تحديث اشتراك ${subEditor.email}`);
      setSubEditor(null);
    } catch {
      toast.error("تعذّر حفظ الاشتراك");
    } finally {
      setSubBusy(false);
    }
  };

  const handleRevoke = async (email: string) => {
    await revokeSubscription({ email });
    toast.success(`تم إلغاء اشتراك ${email}`);
  };

  const [generating, setGenerating] = useState(false);
  const [codeNote, setCodeNote] = useState("");
  const [deleteCodeId, setDeleteCodeId] = useState<Id<"accessCodes"> | null>(
    null,
  );

  const handleGenerateCode = async () => {
    setGenerating(true);
    try {
      const code = await generateAccessCode({
        note: codeNote.trim() || undefined,
      });
      setCodeNote("");
      toast.success(`تم توليد الكود: ${code}`, {
        description: "انقر على زر النسخ لنسخه",
        duration: 6000,
      });
    } catch {
      toast.error("تعذّر توليد الكود، حاول مرة أخرى");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`تم نسخ ${code}`);
    } catch {
      toast.error("تعذّر النسخ — انسخ الكود يدوياً");
    }
  };

  const handleDeleteCode = async () => {
    if (!deleteCodeId) return;
    await deleteAccessCode({ id: deleteCodeId });
    setDeleteCodeId(null);
    toast.success("تم حذف الكود");
  };

  // Redirect non-admins away
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate("/auth?returnTo=%2Fadmin", { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading || isAdmin === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isAuthenticated && isAdmin === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <Lock className="size-7" />
        </span>
        <h1 className="text-xl font-bold">غير مصرح بالدخول</h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          هذه المنطقة مخصصة للإدارة فقط. إذا كنت تملك حساب الأدمن، سجّل الدخول
          بالبريد الإلكتروني المخصص للإدارة.
        </p>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/recipes">مكتبة الوصفات</Link>
          </Button>
          <Button asChild>
            <Link to="/">الصفحة الرئيسية</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (r: Recipe) => {
    setEditingId(r._id);
    setForm({
      title: r.title,
      category: r.category,
      percentages: r.percentages ?? "",
      steps: r.steps ?? "",
      warnings: r.warnings ?? "",
      videoUrl: r.videoUrl ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.steps.trim()) return;
    setSaving(true);
    try {
      const nextOrder = Math.max(0, ...(recipes ?? []).map((r) => r.order)) + 1;
      const payload = {
        title: form.title.trim(),
        category: form.category,
        percentages: form.percentages,
        steps: form.steps,
        warnings: form.warnings.trim() || undefined,
        videoUrl: form.videoUrl.trim() || undefined,
        order: editingId
          ? (recipes?.find((r) => r._id === editingId)?.order ?? nextOrder)
          : nextOrder,
      };
      if (editingId) {
        await updateRecipe({ id: editingId, ...payload });
      } else {
        await createRecipe(payload);
      }
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteRecipe({ id: deleteId });
    setDeleteId(null);
    if (editingId === deleteId) resetForm();
  };

  const filteredSubs = (subscribers ?? []).filter((s) => {
    const q = subSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      (s.email ?? "").toLowerCase().includes(q) ||
      (s.name ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <FlaskConical className="size-5" />
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-bold tracking-tight">
                Mounir Formule
              </span>
              <span className="block text-xs text-muted-foreground">
                لوحة الإدارة
              </span>
            </div>
          </div>
          <span className="truncate text-sm text-muted-foreground">
            {user?.email}
          </span>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/recipes">الوصفات</Link>
            </Button>
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
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard
            icon={FlaskConical}
            label="إجمالي الوصفات"
            value={recipes?.length ?? 0}
          />
          <StatCard
            icon={Home}
            label="منظفات منزلية"
            value={recipes?.filter((r) => r.category === "cleaners").length ?? 0}
          />
          <StatCard
            icon={Car}
            label="العناية بالسيارات"
            value={recipes?.filter((r) => r.category === "cars").length ?? 0}
          />
          <StatCard
            icon={Users}
            label="المشتركون"
            value={subscribers?.length ?? 0}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Recipe form */}
          <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-bold">
                <Plus className="size-4 text-primary" />
                {editingId ? "تعديل وصفة" : "إضافة وصفة جديدة"}
              </h2>
              {editingId && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                  className="gap-1 text-muted-foreground"
                >
                  <X className="size-4" />
                  إلغاء التعديل
                </Button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    القسم
                  </label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((f) => ({
                        ...f,
                        category: v as "cleaners" | "cars",
                      }))
                    }
                  >
                    <SelectTrigger className="w-full rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleaners">منظفات منزلية</SelectItem>
                      <SelectItem value="cars">العناية بالسيارات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    عنوان الوصفة
                  </label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="مثال: معطر أرضيات"
                    className="rounded-xl"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  النسب المئوية (سطر لكل مكوّن)
                </label>
                <Textarea
                  value={form.percentages}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, percentages: e.target.value }))
                  }
                  placeholder={"ماء مقطر: 80%\nكحول إيثيلي: 19%"}
                  className="min-h-20 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  طريقة التحضير *
                </label>
                <Textarea
                  value={form.steps}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, steps: e.target.value }))
                  }
                  placeholder={"1. ...\n2. ..."}
                  className="min-h-28 rounded-xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  تحذيرات السلامة
                </label>
                <Textarea
                  value={form.warnings}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, warnings: e.target.value }))
                  }
                  placeholder="قابل للاشتعال..."
                  className="min-h-16 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  رابط فيديو يوتيوب (اختياري)
                </label>
                <Input
                  dir="ltr"
                  value={form.videoUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, videoUrl: e.target.value }))
                  }
                  placeholder="https://youtube.com/watch?v=..."
                  className="rounded-xl text-left"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  type="submit"
                  className="flex-1 rounded-xl shadow-soft"
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : editingId ? (
                    "حفظ التعديلات"
                  ) : (
                    "إضافة الوصفة"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="rounded-xl"
                >
                  مسح
                </Button>
              </div>
            </form>
          </section>

          {/* Recipes list + subscribers */}
          <div className="space-y-6 lg:col-span-3">
            <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 font-bold">
                  <KeyRound className="size-4 text-primary" />
                  أكواد الوصول
                </h2>
                <Badge variant="outline" className="shrink-0 text-xs">
                  8 خانات
                </Badge>
              </div>
              <div className="mb-4 flex gap-2">
                <Input
                  value={codeNote}
                  onChange={(e) => setCodeNote(e.target.value)}
                  placeholder="ملاحظة (اختياري) — مثال: باقة أكتوبر"
                  className="h-10 rounded-xl text-sm"
                />
                <Button
                  type="button"
                  onClick={handleGenerateCode}
                  disabled={generating}
                  className="h-10 shrink-0 gap-1.5 rounded-xl shadow-soft"
                >
                  {generating ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                  توليد كود
                </Button>
              </div>
              {accessCodes == null ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 rounded-xl" />
                  ))}
                </div>
              ) : accessCodes.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  لا توجد أكواد بعد — ولّد أول كود وشاركه مع مشتركينك.
                </p>
              ) : (
                <div className="max-h-64 space-y-2 overflow-y-auto pl-1">
                  {accessCodes
                    .slice()
                    .sort((a, b) => b._creationTime - a._creationTime)
                    .map((c) => (
                      <div
                        key={c._id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/50 px-3 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span
                            className={`font-mono text-sm font-bold tracking-widest ${
                              c.usedByEmail ? "text-muted-foreground line-through" : "text-primary"
                            }`}
                            dir="ltr"
                          >
                            {c.code}
                          </span>
                          {c.note && (
                            <span className="truncate text-xs text-muted-foreground">
                              {c.note}
                            </span>
                          )}
                          {c.usedByEmail ? (
                            <Badge
                              variant="outline"
                              className="shrink-0 border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-600"
                            >
                              مستخدم
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="shrink-0 border-emerald-500/30 bg-emerald-500/10 text-[10px] text-emerald-600"
                            >
                              متاح
                            </Badge>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => handleCopyCode(c.code)}
                            title="نسخ"
                          >
                            <Copy className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteCodeId(c._id)}
                            title="حذف"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </section>
            <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
              <h2 className="mb-4 font-bold">الوصفات الحالية</h2>
              {recipes == null ? (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 rounded-xl" />
                  ))}
                </div>
              ) : recipes.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  لا توجد وصفات بعد — أضف أول وصفة من النموذج.
                </p>
              ) : (
                <div className="max-h-96 space-y-2 overflow-y-auto pl-1">
                  {recipes
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((r) => (
                      <div
                        key={r._id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/50 p-3 transition-colors hover:border-primary/30"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <Badge
                            variant="outline"
                            className={`shrink-0 gap-1 ${
                              r.category === "cleaners"
                                ? "border-primary/20 bg-primary/10 text-primary"
                                : "border-cyan-600/20 bg-cyan-600/10 text-cyan-600"
                            }`}
                          >
                            {r.category === "cleaners" ? (
                              <Home className="size-3" />
                            ) : (
                              <Car className="size-3" />
                            )}
                            {r.category === "cleaners" ? "منزلي" : "سيارات"}
                          </Badge>
                          <span className="truncate text-sm font-semibold">
                            {r.title}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => startEdit(r)}
                            title="تعديل"
                          >
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(r._id)}
                            title="حذف"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 font-bold">
                  <Users className="size-4 text-primary" />
                  إدارة الأعضاء والاشتراكات
                </h2>
                <div className="relative w-44">
                  <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={subSearch}
                    onChange={(e) => setSubSearch(e.target.value)}
                    placeholder="بحث بالبريد..."
                    className="h-9 rounded-xl pr-9 text-sm"
                  />
                </div>
              </div>
              {subscribers == null ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 rounded-xl" />
                  ))}
                </div>
              ) : filteredSubs.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  لا يوجد أعضاء بعد.
                </p>
              ) : (
                <div className="max-h-96 space-y-2 overflow-y-auto pl-1">
                  {(filteredSubs as Subscriber[]).map((s) => {
                    const sub = s.subscription;
                    return (
                      <div
                        key={s._id}
                        className="rounded-xl border border-border/60 bg-background/50 px-3 py-2.5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium" dir="ltr">
                              {s.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              مسجّل {new Date(s._creationTime).toLocaleDateString("ar")}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-1.5">
                            {sub && sub.active ? (
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${
                                  sub.pkg === "all"
                                    ? "border-primary/30 bg-primary/10 text-primary"
                                    : sub.pkg === "home"
                                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                                      : "border-cyan-600/30 bg-cyan-600/10 text-cyan-600"
                                }`}
                              >
                                {PKG_LABELS[sub.pkg]}
                                {" · "}
                                {DURATION_LABELS[sub.duration]}
                              </Badge>
                            ) : sub && !sub.active ? (
                              <Badge
                                variant="outline"
                                className="border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-600"
                              >
                                منتهي
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] text-muted-foreground">
                                بدون باقة
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => openSubEditor(s)}
                              title="تعديل الاشتراك"
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            {sub && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-destructive hover:text-destructive"
                                onClick={() => handleRevoke(s.email ?? "")}
                                title="إلغاء الاشتراك"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            )}
                          </div>
                        </div>
                        {sub && sub.active && sub.expiresAt && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            ينتهي: {new Date(sub.expiresAt).toLocaleDateString("ar")}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Delete confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader className="text-right">
            <AlertDialogTitle>حذف الوصفة؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف الوصفة نهائياً ولا يمكن التراجع عن ذلك.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              حذف نهائي
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Subscription editor */}
      <AlertDialog
        open={subEditor !== null}
        onOpenChange={(o) => !o && setSubEditor(null)}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader className="text-right">
            <AlertDialogTitle>تعديل الاشتراك</AlertDialogTitle>
            <AlertDialogDescription dir="ltr" className="text-left">
              {subEditor?.email}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {subEditor && (
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  الباقة
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["home", "cars", "all"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSubEditor({ ...subEditor, pkg: p })}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                        subEditor.pkg === p
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary/40"
                      }`
                    }
                    >
                      {PKG_LABELS[p]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  المدة
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["month", "year", "lifetime"] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() =>
                        setSubEditor({ ...subEditor, duration: d })
                      }
                      className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                        subEditor.duration === d
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary/40"
                      }`
                    }
                    >
                      {DURATION_LABELS[d]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={saveSubscription}
              disabled={subBusy}
              className="shadow-soft"
            >
              {subBusy ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "حفظ الاشتراك"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Code delete confirmation */}
      <AlertDialog open={deleteCodeId !== null} onOpenChange={(o) => !o && setDeleteCodeId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader className="text-right">
            <AlertDialogTitle>حذف كود الوصول؟</AlertDialogTitle>
            <AlertDialogDescription>
              لن يتمكن من يستخدم هذا الكود من الاشتراك بعد الحذف.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCode}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              حذف نهائي
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
      <div className="mb-2 flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <p className="text-2xl font-extrabold tabular-nums" dir="ltr">
        {value}
      </p>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
