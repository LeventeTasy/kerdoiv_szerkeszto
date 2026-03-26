"use client";

import { useState } from "react";
import type { Question } from "@/types/survey";

interface AddQuestionButtonProps {
  onAddQuestion: (type: Question["type"]) => void;
}

const questionTypes: {
  type: Question["type"];
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "TEXT",
    label: "Szöveges",
    description: "Szabad szöveges válasz mező",
    icon: (
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
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    ),
  },
  {
    type: "MULTIPLE_CHOICE",
    label: "Egyválasztós",
    description: "Egy válasz kiválasztása",
    icon: (
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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    type: "CHECKBOX",
    label: "Többválasztós",
    description: "Több válasz is kiválasztható",
    icon: (
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
];

export function AddQuestionButton({ onAddQuestion }: AddQuestionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card/50 px-4 py-4 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          Új kérdés hozzáadása
        </button>
      ) : (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              Válassz kérdéstípust
            </h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Bezárás"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {questionTypes.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => {
                  onAddQuestion(item.type);
                  setIsOpen(false);
                }}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background p-4 text-center transition-all hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
