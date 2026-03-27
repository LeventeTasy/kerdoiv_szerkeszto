"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Irányítópult" },
  { href: "/survey/1/edit", label: "Szerkesztő (Példa)" },
  { href: "/settings", label: "Beállítások" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary">
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Kérdőív Szerkesztő</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                  <li key={item.href}>
                    <Link
                        href={item.href}
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
              );
            })}
          </ul>

          <div className="hidden items-center md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">U</div>
          </div>

          <button
              className="md:hidden p-2 text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "Bezár" : "Menü"}
          </button>
        </nav>
      </header>
  );
}