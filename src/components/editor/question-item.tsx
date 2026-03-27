"use client";

import { OptionItem } from "./option-item";
import type { Question, Option } from "@/types/survey";

interface QuestionItemProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
}

const questionTypeLabels: Record<Question["type"], string> = {
  TEXT: "Szöveges válasz",
  MULTIPLE_CHOICE: "Egyválasztós",
  CHECKBOX: "Többválasztós",
};

const questionTypeIcons: Record<Question["type"], React.ReactNode> = {
  TEXT: (
    <svg
      className="h-4 w-4"
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
  MULTIPLE_CHOICE: (
    <svg
      className="h-4 w-4"
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
  CHECKBOX: (
    <svg
      className="h-4 w-4"
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
};

export function QuestionItem({ question, onUpdate, onDelete }: QuestionItemProps) {
  const handleAddOption = () => {
    const newOption: Option = {
      id: crypto.randomUUID(),
      text: "",
      order: question.options.length + 1,
    };
    onUpdate({ options: [...question.options, newOption] });
  };

  const handleUpdateOption = (optionId: string, text: string) => {
    onUpdate({
      options: question.options.map((opt) =>
        opt.id === optionId ? { ...opt, text } : opt
      ),
    });
  };

  const handleDeleteOption = (optionId: string) => {
    onUpdate({
      options: question.options
        .filter((opt) => opt.id !== optionId)
        .map((opt, index) => ({ ...opt, order: index + 1 })),
    });
  };

  return (
    <article
      className="rounded-lg border border-border bg-card p-4 md:p-5"
      aria-labelledby={`question-${question.id}-title`}
    >
      {/* Question Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {question.order}
          </span>
          <span className="flex items-center gap-1.5">
            {questionTypeIcons[question.type]}
            {questionTypeLabels[question.type]}
          </span>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Kérdés törlése"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Question Title Input */}
      <div className="mb-4">
        <label htmlFor={`question-${question.id}-title`} className="sr-only">
          Kérdés szövege
        </label>
        <input
          type="text"
          id={`question-${question.id}-title`}
          value={question.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Írd be a kérdés szövegét..."
        />
      </div>

      {/* Options for Multiple Choice / Checkbox */}
      {question.type !== "TEXT" && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Válaszlehetőségek
          </p>
          <ul className="space-y-2" role="list">
            {question.options.map((option) => (
              <li key={option.id}>
                <OptionItem
                  option={option}
                  questionType={question.type}
                  onUpdate={(text) => handleUpdateOption(option.id, text)}
                  onDelete={() => handleDeleteOption(option.id)}
                  canDelete={question.options.length > 1}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleAddOption}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              className="h-4 w-4"
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
            Új opció hozzáadása
          </button>
        </div>
      )}

      {/* Text Answer Preview */}
      {question.type === "TEXT" && (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 px-3 py-6 text-center text-sm text-muted-foreground">
          A válaszolónak szöveges mezőt fog látni
        </div>
      )}
    </article>
  );
}
