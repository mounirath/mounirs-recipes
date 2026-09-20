import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

/** Small pill button that toggles the site language (AR ⇄ FR). */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLang(lang === "ar" ? "fr" : "ar")}
      className={`gap-1.5 rounded-full px-3 font-bold ${className}`}
      aria-label={lang === "ar" ? "Passer en français" : "التبديل إلى العربية"}
      title={lang === "ar" ? "Passer en français" : "التبديل إلى العربية"}
    >
      <Languages className="size-4" />
      <span dir={lang === "ar" ? "ltr" : "rtl"}>{lang === "ar" ? "FR" : "ع"}</span>
    </Button>
  );
}
