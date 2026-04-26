"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Survey, SurveyStatus } from "@/types/survey";

// ==========================================
// Ikonok
// ==========================================

function QuestionIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MoreIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  );
}

// ==========================================
// Státusz konfiguráció
// ==========================================

const statusConfig: Record<SurveyStatus, { label: string; className: string }> = {
  DRAFT: { label: "Piszkozat", className: "bg-muted text-muted-foreground" },
  PUBLISHED: { label: "Publikált", className: "bg-green-500/20 text-green-400" },
  CLOSED: { label: "Lezárt", className: "bg-amber-500/20 text-amber-400" },
};

function StatusBadge({ status }: { status: SurveyStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}

// ==========================================
// Survey Card komponens
// ==========================================

interface SurveyCardProps {
  survey: Survey;
  onOptionsClick?: (survey: Survey) => void;
}

export function SurveyCard({ survey, onOptionsClick }: SurveyCardProps) {
  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(survey.updatedAt));
  }, [survey.updatedAt]);

  const isoDate = useMemo(() => {
    return new Date(survey.updatedAt).toISOString();
  }, [survey.updatedAt]);

  return (
    <article
      className="group relative flex flex-col rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md focus-within:ring-2 focus-within:ring-ring md:p-5 lg:p-6"
      aria-labelledby={`survey-title-${survey.id}`}
    >
      {/* Fejléc */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            id={`survey-title-${survey.id}`}
            className="truncate text-base font-semibold text-card-foreground md:text-lg"
          >
            <Link
              href={`/survey/${survey.id}/edit`}
              className="after:absolute after:inset-0 focus-visible:outline-none"
              aria-describedby={`survey-desc-${survey.id}`}
            >
              {survey.title}
            </Link>
          </h3>
          <div className="mt-1">
            <StatusBadge status={survey.status} />
          </div>
        </div>
        {onOptionsClick && (
          <button
            type="button"
            className="relative z-10 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onOptionsClick(survey)}
            aria-label={`${survey.title} opciók`}
          >
            <MoreIcon />
          </button>
        )}
      </div>

      {/* Leírás */}
      <p
        id={`survey-desc-${survey.id}`}
        className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground"
      >
        {survey.description || "Nincs leírás megadva"}
      </p>

      {/* Lábléc */}
      <footer className="flex flex-wrap items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <QuestionIcon />
          <span>{survey.questionCount ?? 0} kérdés</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <time dateTime={isoDate}>{formattedDate}</time>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`/survey/${survey.id}/edit`}
            className="relative z-10 rounded-md px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`${survey.title} szerkesztése`}
          >
            Szerkesztés
          </Link>
          <Link
            href={`/survey/${survey.id}/settings`}
            className="relative z-10 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`${survey.title} beállításai`}
          >
            Beállítások
          </Link>
        </div>
      </footer>
    </article>
  );
}

export type { Survey };
