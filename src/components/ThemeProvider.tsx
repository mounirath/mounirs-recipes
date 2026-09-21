import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/** App-wide light/dark provider — persists choice in localStorage, defaults to system. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
