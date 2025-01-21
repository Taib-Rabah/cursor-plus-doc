import "./global.scss";

import { Inter, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});



export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
