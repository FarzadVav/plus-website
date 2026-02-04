import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import "./globals.css";
import Header from "@/components/static/header/header";

export const metadata: Metadata = {
  title: "Plus | پلاس",
  description: "Plus | پلاس",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
      </head>
      <body className="antialiased dark">
        <Header />
        {children}
      </body>
    </html>
  );
}
