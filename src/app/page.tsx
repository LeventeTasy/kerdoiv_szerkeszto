"use client";

import { useState } from "react";
import { SurveyCard, type Survey } from "@/components/survey-card";
import { CreateSurveyButton } from "@/components/create-survey-button";

// Mock data - később adatbázisból fog jönni
const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Ügyfél elégedettségi kérdőív",
    description:
      "Mérd fel a vásárlóid elégedettségét a szolgáltatásaiddal kapcsolatban.",
    updatedAt: new Date("2026-03-25T10:30:00"),
    questionCount: 12,
  },
  {
    id: "2",
    title: "Munkavállalói feedback",
    description:
      "Gyűjts visszajelzéseket a csapatodtól a munkahelyi környezetről és a folyamatokról.",
    updatedAt: new Date("2026-03-24T14:15:00"),
    questionCount: 8,
  },
  {
    id: "3",
    title: "Termék visszajelzés",
    description:
      "Értékeld az új termék funkcionalitását és használhatóságát a felhasználók szemszögéből.",
    updatedAt: new Date("2026-03-20T09:00:00"),
    questionCount: 15,
  },
  {
    id: "4",
    title: "Eseményszervezés felmérés",
    description: "Tervezd meg a következő céges rendezvényt a résztvevők igényei alapján.",
    updatedAt: new Date("2026-03-18T16:45:00"),
    questionCount: 6,
  },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [surveys] = useState<Survey[]>(mockSurveys);

  const filteredSurveys = surveys.filter(
    (survey) =>
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      {/* Page Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            Kérdőívek
          </h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Kezeld és szerkeszd a kérdőíveidet
          </p>
        </div>
        <CreateSurveyButton />
      </header>

      {/* Search and Filter Section */}
      <section className="mb-6 md:mb-8" aria-label="Keresés és szűrés">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-md">
            <label htmlFor="search-surveys" className="sr-only">
              Kérdőívek keresése
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search-surveys"
              placeholder="Keresés cím vagy leírás alapján..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Survey Count */}
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {filteredSurveys.length}
            </span>{" "}
            kérdőív találat
          </p>
        </div>
      </section>

      {/* Survey Grid */}
      {filteredSurveys.length > 0 ? (
        <section aria-label="Kérdőív lista">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filteredSurveys.map((survey) => (
              <li key={survey.id}>
                <SurveyCard survey={survey} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section
          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 px-6 py-12 text-center md:py-16"
          aria-label="Nincs találat"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted md:h-16 md:w-16">
            <svg
              className="h-6 w-6 text-muted-foreground md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-foreground md:text-xl">
            Nincs találat
          </h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground md:text-base">
            {searchQuery
              ? `Nem található kérdőív "${searchQuery}" keresésre.`
              : "Még nincsenek kérdőíveid. Hozd létre az elsőt!"}
          </p>
          {!searchQuery && (
            <div className="mt-6">
              <CreateSurveyButton />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
