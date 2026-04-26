"use client";

import type { Collaborator } from "@/types/survey";

interface CollaboratorListProps {
  collaborators: Collaborator[];
  onRemove: (collaboratorId: string) => void;
  onUpdateRole: (collaboratorId: string, role: "EDITOR" | "VIEWER") => void;
}

const roleLabels: Record<Collaborator["role"], string> = {
  EDITOR: "Szerkeszto",
  VIEWER: "Megtekinto",
};

export function CollaboratorList({
  collaborators,
  onRemove,
  onUpdateRole,
}: CollaboratorListProps) {
  if (collaborators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 px-6 py-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-foreground">
          Meg nincsenek szerkesztotarsak
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Hivj meg masokat a kerdoiv szerkesztesehez
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border" role="list">
      {collaborators.map((collaborator) => (
        <li
          key={collaborator.id}
          className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary"
              aria-hidden="true"
            >
              {collaborator.user?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {collaborator.user?.name || "Ismeretlen felhasznalo"}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {collaborator.user?.email || ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <label htmlFor={`role-${collaborator.id}`} className="sr-only">
              Szerepkor beallitasa
            </label>
            <select
              id={`role-${collaborator.id}`}
              value={collaborator.role}
              onChange={(e) =>
                onUpdateRole(collaborator.id, e.target.value as "EDITOR" | "VIEWER")
              }
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="EDITOR">{roleLabels.EDITOR}</option>
              <option value="VIEWER">{roleLabels.VIEWER}</option>
            </select>
            <button
              type="button"
              onClick={() => onRemove(collaborator.id)}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${collaborator.user?.name || "Felhasznalo"} eltavolitasa`}
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
        </li>
      ))}
    </ul>
  );
}
