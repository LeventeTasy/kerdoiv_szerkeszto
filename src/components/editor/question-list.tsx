"use client";

import { QuestionItem } from "./question-item";
import type { Question } from "@/types/survey";

interface QuestionListProps {
  questions: Question[];
  onUpdateQuestion: (questionId: string, updates: Partial<Question>) => void;
  onDeleteQuestion: (questionId: string) => void;
  onReorderQuestions: (startIndex: number, endIndex: number) => void;
}

export function QuestionList({
  questions,
  onUpdateQuestion,
  onDeleteQuestion,
}: QuestionListProps) {
  return (
    <ul className="space-y-4" role="list" aria-label="Kerdesek listaja">
      {questions.map((question) => (
        <li key={question.id}>
          <QuestionItem
            question={question}
            onUpdate={(updates) => onUpdateQuestion(question.id, updates)}
            onDelete={() => onDeleteQuestion(question.id)}
          />
        </li>
      ))}
    </ul>
  );
}
