import { cn } from "@/lib/utils";

/** Brand logo (teal circle + white flask) — sized via className. */
export function BrandMark({ className = "size-9" }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt=""
      aria-hidden
      className={cn("shrink-0 select-none rounded-full", className)}
      draggable={false}
    />
  );
}
