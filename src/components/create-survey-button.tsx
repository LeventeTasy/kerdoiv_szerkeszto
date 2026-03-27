"use client";

import Link from "next/link";

export function CreateSurveyButton() {
  return (
      <Link
          href="/survey/new/edit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] md:px-5 md:py-3"
          aria-label="Új kérdőív létrehozása"
      >
        <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
        >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Új kérdőív</span>
      </Link>
  );
}