import { useTheme } from "next-themes";
import { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n";

/** Pill button toggling light ⇄ dark, styled like LangToggle. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t, lang } = useI18n();
  // Avoid SSR/hydration mismatch: render placeholder until mounted
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const label = isDark
    ? lang === "fr"
      ? "Mode clair"
      : "الوضع الفاتح"
    : lang === "fr"
      ? "Mode sombre"
      : "الوضع الداكن";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`gap-1.5 rounded-full px-3 font-bold ${className}`}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      <span className="sr-only">{label}</span>
    </Button>
  );
}
