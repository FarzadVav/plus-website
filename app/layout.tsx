import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import "./globals.css";
import Header from "@/components/static/header/header";

export const metadata: Metadata = {
  title: "Plus | پلاس",
  description: "پلاس",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
