import { useI18n, type Lang } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

/** Cycles through the supported languages: AR → FR → EN → AR. */
const NEXT: Record<Lang, Lang> = { ar: "fr", fr: "en", en: "ar" };

/** Label shown on the pill for the current language. */
const LABEL: Record<Lang, string> = { ar: "ع", fr: "FR", en: "EN" };

const SWITCH_HINT: Record<Lang, string> = {
  ar: "Passer en français",
  fr: "Switch to English",
  en: "التبديل إلى العربية",
};

/** Small pill button that cycles the site language (AR ⇄ FR ⇄ EN). */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLang(NEXT[lang])}
      className={`gap-1.5 rounded-full px-3 font-bold ${className}`}
      aria-label={SWITCH_HINT[lang]}
      title={SWITCH_HINT[lang]}
    >
      <Languages className="size-4" />
      <span dir={lang === "ar" ? "ltr" : "rtl"}>{LABEL[lang]}</span>
    </Button>
  );
}
