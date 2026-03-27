"use client";

import { useState } from "react";
import { CollaboratorList } from "@/components/settings/collaborator-list";
import { CollaboratorModal } from "@/components/settings/collaborator-modal";
import type { Collaborator } from "@/types/survey";

const mockCollaborators: Collaborator[] = [
  {
    id: "1",
    userId: "user-1",
    surveyId: "survey-1",
    role: "EDITOR",
    user: {
      id: "user-1",
      name: "Kiss Péter",
      email: "peter.kiss@example.com",
    },
  },
  {
    id: "2",
    userId: "user-2",
    surveyId: "survey-1",
    role: "VIEWER",
    user: {
      id: "user-2",
      name: "Nagy Anna",
      email: "anna.nagy@example.com",
    },
  },
];

export default function SettingsPage() {
  const [surveyTitle, setSurveyTitle] = useState("Ügyfél elégedettségi kérdőív");
  const [surveyDescription, setSurveyDescription] = useState(
    "Mérd fel a vásárlóid elégedettségét a szolgáltatásaiddal kapcsolatban."
  );
  const [collaborators, setCollaborators] = useState<Collaborator[]>(mockCollaborators);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCollaborator = (email: string, role: "EDITOR" | "VIEWER") => {
    const newCollaborator: Collaborator = {
      id: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      surveyId: "survey-1",
      role,
      user: {
        id: crypto.randomUUID(),
        name: email.split("@")[0],
        email,
      },
    };
    setCollaborators([...collaborators, newCollaborator]);
    setIsModalOpen(false);
  };

  const handleRemoveCollaborator = (collaboratorId: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== collaboratorId));
  };

  const handleUpdateRole = (collaboratorId: string, role: "EDITOR" | "VIEWER") => {
    setCollaborators(
      collaborators.map((c) =>
        c.id === collaboratorId ? { ...c, role } : c
      )
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      {/* Page Header */}
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Beállítások
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Kezeld a kérdőív alapadatait és a szerkesztőtársakat
        </p>
      </header>

      {/* Survey Details Section */}
      <section
        className="mb-8 rounded-lg border border-border bg-card p-4 md:p-6"
        aria-labelledby="survey-details-heading"
      >
        <h2
          id="survey-details-heading"
          className="mb-4 text-lg font-semibold text-card-foreground md:text-xl"
        >
          Kérdőív adatai
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="survey-title"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Cím
            </label>
            <input
              type="text"
              id="survey-title"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              className="block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Add meg a kérdőív címét"
            />
          </div>
          <div>
            <label
              htmlFor="survey-description"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Leírás
            </label>
            <textarea
              id="survey-description"
              value={surveyDescription}
              onChange={(e) => setSurveyDescription(e.target.value)}
              rows={3}
              className="block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Rövid leírás a kérdőívről"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              Mentés
            </button>
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section
        className="rounded-lg border border-border bg-card p-4 md:p-6"
        aria-labelledby="collaborators-heading"
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="collaborators-heading"
            className="text-lg font-semibold text-card-foreground md:text-xl"
          >
            Szerkesztőtársak ({collaborators.length})
          </h2>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
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
            <span>Meghívás</span>
          </button>
        </div>

        <CollaboratorList
          collaborators={collaborators}
          onRemove={handleRemoveCollaborator}
          onUpdateRole={handleUpdateRole}
        />
      </section>

      {/* Collaborator Modal */}
      <CollaboratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCollaborator}
      />
    </div>
  );
}
