import type { Metadata } from "next";
import ".//globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import TopNav from "@/components/ui/topNav";
import BottomNav from "@/components/ui/bottomNav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Stock Picker",
  description: "Created by Jaya DeHart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <TopNav />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
