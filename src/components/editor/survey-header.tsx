"use client";

interface SurveyHeaderProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

export function SurveyHeader({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: SurveyHeaderProps) {
  return (
    <section
      className="rounded-lg border border-border bg-card p-4 md:p-6"
      aria-labelledby="survey-header-heading"
    >
      <h2 id="survey-header-heading" className="sr-only">
        Kerdoiv fejlec
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="survey-title"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Kerdoiv cime
          </label>
          <input
            type="text"
            id="survey-title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base font-semibold text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring md:text-lg"
            placeholder="Add meg a kerdoiv cimet"
          />
        </div>
        <div>
          <label
            htmlFor="survey-description"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Leiras (opcionalis)
          </label>
          <textarea
            id="survey-description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={2}
            className="block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="Rovid leiras a kerdoivrol"
          />
        </div>
      </div>
    </section>
  );
}
