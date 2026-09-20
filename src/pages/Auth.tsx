import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n";
import { LangToggle } from "@/components/LangToggle";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  KeyRound,
  Loader2,
  Mail,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/recipes",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

type Step = "signIn" | { email: string; pendingCode?: string };

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const { t, dir } = useI18n();
  const ForwardIcon = dir === "rtl" ? ArrowLeft : ArrowRight;
  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<Step>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Access code captured before signing in
  const [accessCode, setAccessCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : t("auth.emailError"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      // Signed in — if a code was captured, redeem it on the recipes gate;
      // otherwise proceed (gate will ask for the code).
      if (accessCode.trim()) {
        navigate(`${redirect}?code=${encodeURIComponent(accessCode.trim())}`);
      } else {
        navigate(redirect);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(t("auth.otpError"));
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <FlaskConical className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Mounir Formule
          </span>
        </a>
        <div className="flex items-center gap-2">
          <LangToggle />
          <Button asChild variant="ghost" size="sm" className="gap-1.5">
            <a href="/">
              {t("auth.back")}
              <BackIcon className="size-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Auth content */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full min-w-[320px] max-w-md overflow-hidden rounded-2xl border-border/70 pb-0 shadow-soft-lg">
          {step === "signIn" ? (
            <>
              <CardHeader className="text-center">
                <div className="mb-2 flex justify-center">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FlaskConical className="size-7" />
                  </span>
                </div>
                <CardTitle className="text-xl">{t("auth.title")}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {t("auth.subtitle")}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleEmailSubmit}>
                <CardContent className="space-y-3">
                  {/* Access code (step 1) */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <KeyRound className="size-3.5" />
                      {t("auth.code")}
                    </label>
                    <Input
                      value={accessCode}
                      onChange={(e) => {
                        setAccessCode(e.target.value.toUpperCase());
                        setCodeError(null);
                      }}
                      placeholder="XXXXXXXX"
                      dir="ltr"
                      maxLength={8}
                      className="h-11 rounded-xl text-center font-mono text-lg font-bold tracking-widest"
                      autoComplete="off"
                    />
                    {codeError && (
                      <p className="text-sm font-medium text-destructive">
                        {codeError}
                      </p>
                    )}
                  </div>

                  {/* Email (step 2) */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Mail className="size-3.5" />
                      {t("auth.email")}
                    </label>
                    <div className="relative flex items-center gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute start-3 top-3 size-4 text-muted-foreground" />
                        <Input
                          name="email"
                          placeholder="name@example.com"
                          type="email"
                          dir="ltr"
                          className="h-11 rounded-xl px-9 text-left"
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        size="icon"
                        className="size-11 shrink-0 rounded-xl shadow-soft"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <ForwardIcon className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm font-medium text-destructive">
                      {error}
                    </p>
                  )}
                  <p className="pt-1 text-center text-xs leading-relaxed text-muted-foreground">
                    {t("auth.hint")}
                  </p>
                </CardContent>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="mt-2 text-center">
                <CardTitle>{t("auth.otpTitle")}</CardTitle>
                <CardDescription dir="ltr" className="text-left">
                  {t("auth.otpSent")} {step.email}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleOtpSubmit}>
                <CardContent className="pb-4">
                  <input type="hidden" name="email" value={step.email} />
                  <input type="hidden" name="code" value={otp} />

                  <div className="flex justify-center" dir="ltr">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          otp.length === 6 &&
                          !isLoading
                        ) {
                          const form = (e.target as HTMLElement).closest(
                            "form",
                          );
                          if (form) {
                            form.requestSubmit();
                          }
                        }
                      }}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {error && (
                    <p className="mt-3 text-center text-sm font-medium text-destructive">
                      {error}
                    </p>
                  )}
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    {t("auth.noCode")}{" "}
                    <Button
                      variant="link"
                      className="h-auto p-0"
                      onClick={() => setStep("signIn")}
                    >
                      {t("auth.resend")}
                    </Button>
                  </p>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button
                    type="submit"
                    className="h-11 w-full rounded-xl shadow-soft"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="me-2 size-4 animate-spin" />
                        {t("auth.verify")}
                      </>
                    ) : (
                      <>
                        {t("auth.confirm")}
                        <ForwardIcon className="ms-2 size-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("signIn")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {t("auth.otherEmail")}
                  </Button>
                </CardFooter>
              </form>
            </>
          )}

          <div className="rounded-b-lg border-t bg-muted/60 px-6 py-4 text-center text-xs text-muted-foreground">
            {t("auth.footer")}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
