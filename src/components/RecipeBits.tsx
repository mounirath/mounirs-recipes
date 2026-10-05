import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/i18n";
import {
  AlertTriangle,
  Check,
  Copy,
  Scale,
  Sigma,
} from "lucide-react";
import {
  formatGrams,
  formatKg,
  parseCalcLines,
  parseLines,
  parsePercentageLine,
} from "@/lib/recipe-utils";

/* ------------------------------------------------------------------ */
/* Percentage bars                                                     */
/* ------------------------------------------------------------------ */

export function PercentageBars({ text }: { text: string }) {
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
            )}
          </div>
        );
      })}
      {lines.every((l) => parsePercentageLine(l).pct === null) && (
        <p className="whitespace-pre-line text-sm leading-relaxed">{text}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Batch calculator (1 kg → 1000 kg)                                   */
/* ------------------------------------------------------------------ */

const PRESETS = [1, 5, 10, 25, 50, 100, 250, 500, 1000];

export function BatchCalculator({
  percentages,
  title,
}: {
  percentages: string;
  title: string;
}) {
  const { t } = useI18n();
  const [batch, setBatch] = useState<number>(10);
  const [batchText, setBatchText] = useState<string>("10");
  const [copied, setCopied] = useState(false);

  const { lines } = useMemo(() => parseCalcLines(percentages), [percentages]);
  const totalPct = lines.reduce((s, l) => s + l.pct, 0);

  const setBatchSafe = (v: number) => {
    const clamped = Math.min(1000, Math.max(1, Math.round(v * 100) / 100));
    setBatch(clamped);
    setBatchText(String(clamped));
  };

  const commitText = () => {
    const v = parseFloat(batchText.replace(",", "."));
    if (Number.isFinite(v)) setBatchSafe(v);
    else setBatchText(String(batch));
  };

  const copyTable = async () => {
    const header = `${title} — ${t("calc.copyHeader", { batch })}\n`;
    const rows = lines
      .map(
        (l) =>
          `${l.name}: ${formatKg((l.pct / 100) * batch)} ${t("calc.kg")} (${formatGrams((l.pct / 100) * batch)} ${t("calc.gCol")})`,
      )
      .join("\n");
    const footer = `\n${t("calc.copyTotal", { total: totalPct.toFixed(1) })}`;
    try {
      await navigator.clipboard.writeText(header + rows + footer);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore silently
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-primary/15 bg-primary/5 p-4">
      {/* Batch size control */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Scale className="size-4" />
          </span>
          <div>
            <p className="text-sm font-bold">{t("calc.title")}</p>
            <p className="text-[11px] leading-tight text-muted-foreground">
              {t("calc.range")}
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={batchText}
            onChange={(e) => setBatchText(e.target.value)}
            onBlur={commitText}
            onKeyDown={(e) => e.key === "Enter" && commitText()}
            inputMode="decimal"
            dir="ltr"
            className="h-10 w-24 rounded-lg text-center font-mono font-bold"
            aria-label={t("calc.batchSize")}
          />
          <span className="text-sm font-semibold text-muted-foreground">
            {t("calc.kg")}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyTable}
            className="ms-auto gap-1.5"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? t("calc.copied") : t("calc.copy")}
          </Button>
        </div>
      </div>

      <Slider
        value={[batch]}
        min={1}
        max={1000}
        step={1}
        onValueChange={(v) => setBatchSafe(v[0] ?? 1)}
        aria-label={t("calc.batchSize")}
      />

      {/* Presets */}
      <div className="flex flex-wrap gap-1.5" dir="ltr">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setBatchSafe(p)}
            className={`rounded-full border px-2.5 py-1 text-xs font-bold transition-colors ${
              batch === p
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/70 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {p} kg
          </button>
        ))}
      </div>

      {/* Computed table */}
      <div className="overflow-x-auto rounded-lg border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/50 text-xs text-muted-foreground">
              <th className="px-3 py-2 text-start font-semibold">
                {t("calc.material")}
              </th>
              <th className="px-3 py-2 text-center font-semibold">
                {t("calc.pct")}
              </th>
              <th className="px-3 py-2 text-center font-semibold">
                {t("calc.kgCol")}
              </th>
              <th className="px-3 py-2 text-end font-semibold">
                {t("calc.gCol")}
              </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => {
              const qty = (l.pct / 100) * batch;
              return (
                <tr
                  key={i}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="break-words px-3 py-2 font-medium">{l.name}</td>
                  <td className="px-3 py-2 text-center font-mono text-xs text-muted-foreground" dir="ltr">
                    {l.pct}%
                  </td>
                  <td className="px-3 py-2 text-center font-mono font-bold text-primary" dir="ltr">
                    {formatKg(qty)}
                  </td>
                  <td className="px-3 py-2 text-end font-mono text-muted-foreground" dir="ltr">
                    {formatGrams(qty)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-border/60 bg-muted/40 text-xs">
              <td className="px-3 py-2 font-bold" colSpan={1}>
                <span className="inline-flex items-center gap-1">
                  <Sigma className="size-3.5" />
                  {t("calc.total")}
                </span>
              </td>
              <td className="px-3 py-2 text-center font-mono" dir="ltr">
                {totalPct.toFixed(1)}%
              </td>
              <td className="px-3 py-2 text-center font-mono font-bold" dir="ltr">
                {formatKg((totalPct / 100) * batch)}
              </td>
              <td className="px-3 py-2 text-end font-mono" dir="ltr">
                {formatGrams((totalPct / 100) * batch)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {Math.abs(totalPct - 100) > 0.5 && (
        <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300">
          <AlertTriangle className="mb-0.5 inline size-3.5" />{" "}
          {t("calc.sumWarning", { total: totalPct.toFixed(1) })}
        </p>
      )}

      {lines.length === 0 && (
        <Badge variant="outline" className="text-xs">
          {t("calc.noLines")}
        </Badge>
      )}
    </div>
  );
}
