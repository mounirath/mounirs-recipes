import { useId, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Home, Leaf, ShieldCheck, Wallet } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { useI18n } from "@/i18n";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation drawer (Material-style NavigationDrawer).
 *
 * A hamburger button drawing three stacked lines toggles an off-canvas
 * <nav> panel that slides in from the left over a scrim (shadcn Sheet
 * side="left" = Radix modal dialog). While open, body scroll is locked
 * (Radix RemoveScroll); Escape and scrim taps close it; `aria-expanded`
 * and `aria-controls` stay in sync on the trigger; focus returns to the
 * hamburger button on close.
 */
export function MobileMenu() {
  const { t, dir } = useI18n();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const navId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ForwardIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const links = [
    { href: "#sections", label: t("nav.sections"), icon: Home },
    { href: "#features", label: t("nav.why"), icon: ShieldCheck },
    { href: "#pricing", label: t("nav.offers"), icon: Wallet },
  ] as const;

  const line = (openTransform: string) =>
    cn(
      "h-0.5 w-5 rounded-full bg-foreground transition-transform duration-200",
      open && openTransform,
    );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Hamburger — three stacked lines that morph into an X while open */}
      <SheetTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={open ? navId : undefined}
          aria-label={t("nav.menu")}
          className="inline-flex size-10 flex-col items-center justify-center gap-[5px] rounded-xl border border-border/70 bg-card shadow-soft transition-colors hover:bg-muted md:hidden"
        >
          <span className={line("translate-y-[7px] rotate-45")} />
          <span className={cn(line(""), open && "scale-x-0 opacity-0")} />
          <span className={line("-translate-y-[7px] -rotate-45")} />
        </button>
      </SheetTrigger>

      {/* Off-canvas drawer sliding in from the left over a scrim */}
      <SheetContent
        side="left"
        id={navId}
        onCloseAutoFocus={(event) => {
          // Return focus to the hamburger button on close
          event.preventDefault();
          triggerRef.current?.focus();
        }}
        className="w-80 max-w-[85vw] p-0"
      >
        <SheetHeader className="border-b border-border/60 p-5 pe-12 text-start">
          <SheetTitle className="flex items-center gap-2.5 text-base">
            <BrandMark className="size-8 shadow-soft" />
            Formule DZ
          </SheetTitle>
          <SheetDescription className="text-xs">
            {t("brand.tagline")}
          </SheetDescription>
        </SheetHeader>

        <nav aria-label={t("nav.menu")} className="flex flex-col gap-1 p-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <link.icon className="size-4 text-primary" />
              {link.label}
            </a>
          ))}
          <Link
            to="/home-recipes"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Leaf className="size-4 text-emerald-500" />
            {t("free.title")}
          </Link>
        </nav>

        <div className="mt-auto border-t border-border/60 p-4">
          <Button
            asChild
            className="w-full rounded-xl bg-primary text-primary-foreground shadow-soft hover:bg-primary/90"
          >
            <Link to={isAuthenticated ? "/recipes" : "/auth?returnTo=/recipes"} onClick={() => setOpen(false)}>
              {isAuthenticated ? t("nav.recipes") : t("nav.login")}
              <ForwardIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
