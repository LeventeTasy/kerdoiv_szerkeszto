import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kerdoiv Szerkeszto",
  description: "Modern kerdoiv szerkeszto alkalmazas",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="hu"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1">{children}</main>
      </body>
      </html>
  );
}
