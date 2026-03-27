"use client";

import { useState } from "react";
import Link from "next/link";
import { SurveyHeader } from "@/components/editor/survey-header";
import { QuestionList } from "@/components/editor/question-list";
import { AddQuestionButton } from "@/components/editor/add-question-button";
// KULCSLÉPÉS: Importáljuk a hivatalos típusaidat a fájlból!
import type { Survey, Question } from "@/types/survey";

// Megmondjuk a TypeScriptnek, hogy ez pontosan egy "Survey" típusú objektum
const mockSurvey: Survey = {
  id: "1",
  title: "Ügyfél elégedettségi kérdőív",
  description: "Mérd fel a vásárlóid elégedettségét a szolgáltatásaiddal kapcsolatban.",
  ownerId: "felhasznalo-1", // Ez kötelező a te Survey típusodban
  updatedAt: new Date(),    // Ez is kötelező a típusodban
  questions: [
    {
      id: "q1",
      title: "Milyen gyakran veszed igénybe a szolgáltatásainkat?",
      type: "MULTIPLE_CHOICE",
      order: 1,
      options: [
        { id: "o1", text: "Naponta", order: 1 },
        { id: "o2", text: "Hetente", order: 2 },
        { id: "o3", text: "Havonta", order: 3 },
        { id: "o4", text: "Ritkábban", order: 4 },
      ],
    },
    {
      id: "q2",
      title: "Mi tetszik a leginkább a termékünkben?",
      type: "TEXT",
      order: 2,
      options: [],
    },
  ],
};

export default function EditorPage() {
  // Megmondjuk a Reactnek, hogy az állapot is egy "Survey"
  const [survey, setSurvey] = useState<Survey>(mockSurvey);

  // --- CÍM ÉS LEÍRÁS KEZELŐK ---
  const handleTitleChange = (newTitle: string) => {
    setSurvey({ ...survey, title: newTitle });
  };

  const handleDescriptionChange = (newDescription: string) => {
    setSurvey({ ...survey, description: newDescription });
  };

  // --- KÉRDÉS KEZELŐ FÜGGVÉNYEK ---

  const handleAddQuestion = (type: string) => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      title: "Új kérdés",
      type: (type === "MULTIPLE_CHOICE" || type === "CHECKBOX" ? type : "TEXT") as Question["type"],
      order: (survey.questions?.length || 0) + 1,
      options: [],
    };
    setSurvey({ ...survey, questions: [...(survey.questions || []), newQuestion] });
  };

  // Itt most már Partial<Question>-t kérünk, ahogy a QuestionList komponensed elvárja
  const handleUpdateQuestion = (questionId: string, updates: Partial<Question>) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions?.map((q) => (q.id === questionId ? { ...q, ...updates } : q)) || [],
    }));
  };

  const handleDeleteQuestion = (questionId: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== questionId) || [],
    }));
  };

  // ÚJ: A QuestionList fájlod startIndex-et és endIndex-et vár! Ezt is javítottuk.
  const handleReorderQuestions = (startIndex: number, endIndex: number) => {
    setSurvey((prev) => {
      if (!prev.questions) return prev;

      const newQuestions = Array.from(prev.questions);
      const [removed] = newQuestions.splice(startIndex, 1);
      newQuestions.splice(endIndex, 0, removed);

      // Kérdések sorrendjének (order) frissítése az új helyük alapján
      const updatedQuestions = newQuestions.map((q, idx) => ({ ...q, order: idx + 1 }));

      return { ...prev, questions: updatedQuestions };
    });
  };

  return (
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        {/* Top Action Bar */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Vissza
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Mentve: 14:32</span>
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
              Közzététel
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SurveyHeader
              title={survey.title}
              description={survey.description}
              onTitleChange={handleTitleChange}
              onDescriptionChange={handleDescriptionChange}
          />

          <QuestionList
              questions={survey.questions || []}
              onUpdateQuestion={handleUpdateQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onReorderQuestions={handleReorderQuestions}
          />

          <div className="mt-4 flex justify-center">
            <AddQuestionButton onAddQuestion={handleAddQuestion} />
          </div>
        </div>
      </div>
  );
}