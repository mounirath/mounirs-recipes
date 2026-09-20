import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RAW_MATERIALS, localizeMaterial, type LocalizedMaterial } from "@/lib/materials";
import { useI18n } from "@/i18n";
import {
  AlertTriangle,
  ArrowLeftRight,
  Beaker,
  CheckCircle2,
  FlaskConical,
  Info,
  Search,
  ShieldCheck,
} from "lucide-react";

function MaterialDialog({
  material,
  onClose,
}: {
  material: LocalizedMaterial | null;
  onClose: () => void;
}) {
  const { t } = useI18n();
  if (!material) return null;
  return (
    <Dialog open={!!material} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-0 sm:max-w-xl">
        <DialogHeader className="border-b border-border/60 bg-muted/40 px-6 py-5 text-start">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className={`gap-1.5 ${material.tone.chip}`}>
              <FlaskConical className="size-3.5" />
              {t("materials.badge")}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold leading-snug">
            {material.name}
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-muted-foreground" dir="ltr">
            {material.latin}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 py-6">
          <section>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
              <Info className="size-4" />
              {t("materials.roleTitle")}
            </h4>
            <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
              <Badge variant="outline" className={`mb-2 text-xs ${material.tone.chip}`}>
                {material.role}
              </Badge>
              <p className="text-sm leading-relaxed">{material.description}</p>
            </div>
          </section>

          <section>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-300">
              <CheckCircle2 className="size-4" />
              {t("materials.specsTitle")}
            </h4>
            <ul className="space-y-2">
              {material.specs.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/40 p-3 text-sm leading-relaxed"
                >
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-blue-300" />
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-destructive">
              <AlertTriangle className="size-4" />
              {t("materials.safetyTitle")}
            </h4>
            <div className="space-y-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              {material.safety.map((s) => (
                <p key={s} className="flex items-start gap-2 text-sm leading-relaxed text-destructive">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                  {s}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-300">
              <ArrowLeftRight className="size-4" />
              {t("materials.altTitle")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {material.alternatives.map((a) => (
                <Badge
                  key={a}
                  variant="outline"
                  className="border-emerald-400/20 bg-emerald-400/5 text-xs text-emerald-300"
                >
                  {a}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MaterialsSection({
  searchQuery,
}: {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}) {
  const { t, lang } = useI18n();
  const [selected, setSelected] = useState<LocalizedMaterial | null>(null);

  const localized = useMemo(
    () => RAW_MATERIALS.map((m) => localizeMaterial(m, lang)),
    [lang],
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return localized;
    return localized.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.latin.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q),
    );
  }, [localized, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Beaker className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">
              {t("materials.intro.title")}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t("materials.intro.text")}
            </p>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Search className="size-3.5" />
          {t("materials.intro.searchHint")}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Search className="size-6" />
          </div>
          <h3 className="mb-1 font-bold">{t("materials.noResults.title")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("materials.noResults.text")}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setSelected(m)}
              className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card p-5 text-start shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold leading-snug transition-colors group-hover:text-primary">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground" dir="ltr">
                    {m.latin}
                  </p>
                </div>
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${m.tone.iconBg}`}
                >
                  <FlaskConical className="size-5" />
                </span>
              </div>
              <Badge variant="outline" className={`mb-2 w-fit text-[11px] ${m.tone.chip}`}>
                {m.role}
              </Badge>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {m.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                {t("materials.viewSpecs")}
                <svg
                  className={`size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5`}
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
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Safety note */}
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 sm:p-5">
        <p className="flex items-start gap-2 text-sm leading-relaxed text-amber-300">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" />
          {t("materials.safetyNote")}
        </p>
      </div>

      <MaterialDialog material={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
