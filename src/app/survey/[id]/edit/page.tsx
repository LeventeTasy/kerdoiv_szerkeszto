"use client";

import { useState } from "react";
import { SurveyHeader } from "@/components/editor/survey-header";
import { QuestionList } from "@/components/editor/question-list";
import { AddQuestionButton } from "@/components/editor/add-question-button";
import type { Question } from "@/types/survey";

export default function EditorPage() {
  const [title, setTitle] = useState("Új kérdőív");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title: "",
      type,
      order: questions.length + 1,
      options: type !== "TEXT" ? [{ id: crypto.randomUUID(), text: "", order: 1 }] : [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q))
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(
      questions
        .filter((q) => q.id !== questionId)
        .map((q, index) => ({ ...q, order: index + 1 }))
    );
  };

  const handleReorderQuestions = (startIndex: number, endIndex: number) => {
    const result = Array.from(questions);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setQuestions(result.map((q, index) => ({ ...q, order: index + 1 })));
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      {/* Page Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Kérdőív szerkesztő
          </h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Add hozzá és szerkeszd a kérdéseket
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Mentés</span>
        </button>
      </header>

      {/* Survey Header Section */}
      <SurveyHeader
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />

      {/* Questions Section */}
      <section className="mt-8" aria-label="Kérdések">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground md:text-xl">
            Kérdések ({questions.length})
          </h2>
        </div>

        {questions.length > 0 ? (
          <QuestionList
            questions={questions}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onReorderQuestions={handleReorderQuestions}
          />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 px-6 py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Még nincsenek kérdések
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Add hozzá az első kérdést a lenti gombokkal
            </p>
          </div>
        )}

        {/* Add Question Buttons */}
        <AddQuestionButton onAddQuestion={handleAddQuestion} />
      </section>
    </div>
  );
}
