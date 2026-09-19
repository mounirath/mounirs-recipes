/** Shared parsing helpers for recipe percentages and steps. */

export function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export interface PercentageLine {
  name: string;
  pct: number | null;
}

/** Parse one "name: x%" line, handling ranges like "15-16%". */
export function parsePercentageLine(line: string): PercentageLine {
  const range = line.match(/^(.+?)\s*[:：]\s*(\d+(?:[.,]\d+)?)\s*[-–]\s*(\d+(?:[.,]\d+)?)\s*%$/);
  if (range) {
    const a = parseFloat(range[2].replace(",", "."));
    const b = parseFloat(range[3].replace(",", "."));
    return { name: range[1].trim(), pct: (a + b) / 2 };
  }
  const m = line.match(/^(.+?)\s*[:：]\s*(\d+(?:[.,]\d+)?)\s*%$/);
  if (m) return { name: m[1].trim(), pct: parseFloat(m[2].replace(",", ".")) };
  const pctOnly = line.match(/(\d+(?:[.,]\d+)?)\s*%/);
  const name =
    line
      .replace(/(\d+(?:[.,]\d+)?)\s*%/, "")
      .replace(/[:：\-–]\s*$/, "")
      .trim() || "مكوّن";
  return { name, pct: pctOnly ? parseFloat(pctOnly[1].replace(",", ".")) : null };
}

export interface CalcLine {
  name: string;
  pct: number;
}

/** Structured parse used by the batch calculator. */
export function parseCalcLines(text: string): {
  lines: CalcLine[];
  unresolved: string[];
} {
  const lines: CalcLine[] = [];
  const unresolved: string[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const { name, pct } = parsePercentageLine(line);
    if (pct !== null) lines.push({ name, pct });
    else unresolved.push(name);
  }
  return { lines, unresolved };
}

export function formatKg(qty: number): string {
  if (qty < 0.0005) return "0";
  if (qty < 1) return qty.toFixed(3);
  return qty.toFixed(2);
}

export function formatGrams(qty: number): string {
  const g = qty * 1000;
  if (g < 0.5) return "0";
  if (g < 100) return g.toFixed(1);
  return Math.round(g).toLocaleString("en-US");
}
