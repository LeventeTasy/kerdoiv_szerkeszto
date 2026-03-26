import type { Option, Question } from "@/types/survey";

interface OptionItemProps {
  option: Option;
  questionType: Question["type"];
  onUpdate: (text: string) => void;
  onDelete: () => void;
  canDelete: boolean;
}

export function OptionItem({
  option,
  questionType,
  onUpdate,
  onDelete,
  canDelete,
}: OptionItemProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Visual indicator based on question type */}
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center border border-muted-foreground/40 ${
          questionType === "MULTIPLE_CHOICE" ? "rounded-full" : "rounded"
        }`}
        aria-hidden="true"
      />

      {/* Option input */}
      <label htmlFor={`option-${option.id}`} className="sr-only">
        {option.order}. válaszlehetőség
      </label>
      <input
        type="text"
        id={`option-${option.id}`}
        value={option.text}
        onChange={(e) => onUpdate(e.target.value)}
        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder={`${option.order}. válaszlehetőség`}
      />

      {/* Delete button */}
      {canDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${option.order}. válaszlehetőség törlése`}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
