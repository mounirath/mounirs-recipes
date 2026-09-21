import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { useI18n } from "@/i18n";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

/**
 * Post-payment landing page. Chargily redirects here after the hosted
 * checkout; the webhook has (or will shortly) activated the subscription.
 * We poll access status briefly so the user sees the confirmation.
 */
export default function PaymentSuccess() {
  const { t } = useI18n();
  const accessStatus = useQuery(api.access.status, {});
  const [searchParams] = useSearchParams();
  const failed = searchParams.get("failed") === "1";
  const [checks, setChecks] = useState(0);
  const timer = useRef<number | null>(null);

  const hasAccess = accessStatus?.hasAccess === true;

  useEffect(() => {
    if (failed || hasAccess || checks >= 8) return;
    timer.current = window.setTimeout(() => setChecks((c) => c + 1), 1500);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [failed, hasAccess, checks]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <BrandMark className="size-9 shadow-soft" />
            <span className="text-lg font-extrabold tracking-tight">
              Formule DZ
            </span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-8 text-center shadow-soft-lg"
        >
          {failed ? (
            <>
              <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <XCircle className="size-7" />
              </span>
              <h1 className="text-2xl font-extrabold">{t("pay.failedTitle")}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("pay.failedText")}
              </p>
            </>
          ) : hasAccess ? (
            <>
              <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-7" />
              </span>
              <h1 className="text-2xl font-extrabold">{t("pay.successTitle")}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("pay.successText")}
              </p>
              <Button asChild size="lg" className="mt-6 w-full rounded-xl">
                <Link to="/recipes">{t("pay.goRecipes")}</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Loader2 className="size-7 animate-spin" />
              </span>
              <h1 className="text-2xl font-extrabold">{t("pay.pendingTitle")}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("pay.pendingText")}
              </p>
              {checks >= 8 && (
                <Button asChild size="lg" className="mt-6 w-full rounded-xl">
                  <Link to="/recipes">{t("pay.goRecipes")}</Link>
                </Button>
              )}
            </>
          )}
          <Link
            to="/"
            className="mt-4 inline-block text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            {t("pay.backHome")}
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
