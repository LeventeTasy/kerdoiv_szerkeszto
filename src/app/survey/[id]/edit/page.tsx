"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getSurveyWithQuestions, saveSurveyWithQuestions, deleteSurvey } from "@/services/surveyService";
import type { Survey, Question, Option, QuestionType, ValidationError, SurveyStatus } from "@/types/survey";

// ==========================================
// Ikonok
// ==========================================

function ArrowLeftIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function PlusIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function TrashIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function GripIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    </svg>
  );
}

function CloseIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AlertIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

// ==========================================
// Típusok
// ==========================================

const questionTypeConfig: Record<QuestionType, { label: string; icon: React.ReactNode }> = {
  TEXT: {
    label: "Szöveges válasz",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  MULTIPLE_CHOICE: {
    label: "Egyválasztós",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  CHECKBOX: {
    label: "Többválasztós",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
};

// ==========================================
// Validáció
// ==========================================

function validateSurvey(survey: Survey, questions: Question[]): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!survey.title.trim()) {
    errors.push({ field: "title", message: "A kérdőív címe kötelező" });
  } else if (survey.title.length < 3) {
    errors.push({ field: "title", message: "A cím legalább 3 karakter legyen" });
  } else if (survey.title.length > 200) {
    errors.push({ field: "title", message: "A cím maximum 200 karakter lehet" });
  }

  if (survey.description && survey.description.length > 1000) {
    errors.push({ field: "description", message: "A leírás maximum 1000 karakter lehet" });
  }

  questions.forEach((question, qIndex) => {
    if (!question.title.trim()) {
      errors.push({
        field: `question-${qIndex}-title`,
        message: `A ${qIndex + 1}. kérdés szövege kötelező`,
      });
    }

    if (question.type !== "TEXT") {
      if (question.options.length < 2) {
        errors.push({
          field: `question-${qIndex}-options`,
          message: `A ${qIndex + 1}. kérdéshez legalább 2 válaszlehetőség szükséges`,
        });
      }

      question.options.forEach((option, oIndex) => {
        if (!option.text.trim()) {
          errors.push({
            field: `question-${qIndex}-option-${oIndex}`,
            message: `A ${qIndex + 1}. kérdés ${oIndex + 1}. opciója üres`,
          });
        }
      });
    }
  });

  return errors;
}

function getFieldError(errors: ValidationError[], field: string): string | undefined {
  return errors.find((e) => e.field === field)?.message;
}

// ==========================================
// Skeleton loader
// ==========================================

function EditorSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="h-8 w-3/4 rounded bg-muted"></div>
        <div className="mt-4 h-20 rounded bg-muted"></div>
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="h-6 w-1/2 rounded bg-muted"></div>
        <div className="mt-4 space-y-3">
          <div className="h-10 rounded bg-muted"></div>
          <div className="h-10 rounded bg-muted"></div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Input komponensek validációval
// ==========================================

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

function FormInput({ id, label, value, onChange, error, placeholder, required, maxLength }: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`block w-full rounded-lg border px-4 py-2.5 text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 ${
          error
            ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-destructive/30"
            : "border-border bg-background focus:border-primary focus:ring-ring"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive" role="alert">
          <AlertIcon className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
      {maxLength && (
        <p className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}

interface FormTextareaProps extends Omit<FormInputProps, "type"> {
  rows?: number;
}

function FormTextarea({ id, label, value, onChange, error, placeholder, required, maxLength, rows = 3 }: FormTextareaProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`block w-full rounded-lg border px-4 py-2.5 text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 resize-none ${
          error
            ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-destructive/30"
            : "border-border bg-background focus:border-primary focus:ring-ring"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive" role="alert">
          <AlertIcon className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
      {maxLength && (
        <p className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}

// ==========================================
// Opció komponens
// ==========================================

interface OptionEditorProps {
  option: Option;
  questionType: QuestionType;
  index: number;
  error?: string;
  canDelete: boolean;
  onUpdate: (text: string) => void;
  onDelete: () => void;
}

function OptionEditor({ option, questionType, index, error, canDelete, onUpdate, onDelete }: OptionEditorProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center border border-muted-foreground/40 ${
            questionType === "MULTIPLE_CHOICE" ? "rounded-full" : "rounded"
          }`}
          aria-hidden="true"
        />
        <label htmlFor={`option-${option.id}`} className="sr-only">
          {index + 1}. válaszlehetőség
        </label>
        <input
          type="text"
          id={`option-${option.id}`}
          value={option.text}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder={`${index + 1}. válaszlehetőség`}
          className={`flex-1 rounded-lg border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-destructive/30"
              : "border-border bg-background focus:border-primary focus:ring-ring"
          }`}
          aria-invalid={!!error}
        />
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`${index + 1}. válaszlehetőség törlése`}
          >
            <CloseIcon />
          </button>
        )}
      </div>
      {error && (
        <p className="ml-7 flex items-center gap-1 text-xs text-destructive" role="alert">
          <AlertIcon className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

// ==========================================
// Kérdés komponens
// ==========================================

interface QuestionEditorProps {
  question: Question;
  index: number;
  errors: ValidationError[];
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
}

function QuestionEditor({ question, index, errors, onUpdate, onDelete }: QuestionEditorProps) {
  const titleError = getFieldError(errors, `question-${index}-title`);
  const optionsError = getFieldError(errors, `question-${index}-options`);

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
        .map((opt, idx) => ({ ...opt, order: idx + 1 })),
    });
  };

  const handleTypeChange = (type: QuestionType) => {
    const updates: Partial<Question> = { type };
    
    // Ha váltunk TEXT-ről választós típusra, adjunk hozzá alapértelmezett opciókat
    if (type !== "TEXT" && question.options.length === 0) {
      updates.options = [
        { id: crypto.randomUUID(), text: "", order: 1 },
        { id: crypto.randomUUID(), text: "", order: 2 },
      ];
    }
    
    onUpdate(updates);
  };

  return (
    <article className="rounded-lg border border-border bg-card p-4 md:p-5">
      {/* Fejléc */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="cursor-grab text-muted-foreground hover:text-foreground">
            <GripIcon />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {index + 1}
          </span>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Kérdés törlése"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Kérdés szövege */}
      <div className="mb-4 space-y-1.5">
        <label htmlFor={`question-${question.id}-title`} className="block text-sm font-medium text-foreground">
          Kérdés szövege <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id={`question-${question.id}-title`}
          value={question.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Írd be a kérdés szövegét..."
          className={`block w-full rounded-lg border px-4 py-2.5 text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 ${
            titleError
              ? "border-destructive bg-destructive/5 focus:border-destructive focus:ring-destructive/30"
              : "border-border bg-background focus:border-primary focus:ring-ring"
          }`}
          aria-invalid={!!titleError}
          aria-describedby={titleError ? `question-${question.id}-error` : undefined}
        />
        {titleError && (
          <p id={`question-${question.id}-error`} className="flex items-center gap-1.5 text-sm text-destructive" role="alert">
            <AlertIcon className="h-4 w-4 shrink-0" />
            {titleError}
          </p>
        )}
      </div>

      {/* Típus és Kötelező */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor={`question-${question.id}-type`} className="text-sm font-medium text-muted-foreground">
            Típus:
          </label>
          <select
            id={`question-${question.id}-type`}
            value={question.type}
            onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Object.entries(questionTypeConfig).map(([type, config]) => (
              <option key={type} value={type}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
        
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
          />
          <span className="text-sm text-muted-foreground">Kötelező</span>
        </label>
      </div>

      {/* Válaszlehetőségek */}
      {question.type !== "TEXT" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Válaszlehetőségek</p>
            {optionsError && (
              <p className="flex items-center gap-1 text-xs text-destructive" role="alert">
                <AlertIcon className="h-3 w-3" />
                {optionsError}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            {question.options.map((option, oIndex) => (
              <OptionEditor
                key={option.id}
                option={option}
                questionType={question.type}
                index={oIndex}
                error={getFieldError(errors, `question-${index}-option-${oIndex}`)}
                canDelete={question.options.length > 1}
                onUpdate={(text) => handleUpdateOption(option.id, text)}
                onDelete={() => handleDeleteOption(option.id)}
              />
            ))}
          </div>
          
          <button
            type="button"
            onClick={handleAddOption}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <PlusIcon />
            Új opció hozzáadása
          </button>
        </div>
      )}

      {/* Szöveges válasz előnézet */}
      {question.type === "TEXT" && (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 px-3 py-6 text-center text-sm text-muted-foreground">
          A válaszolónak szöveges mezőt fog látni
        </div>
      )}
    </article>
  );
}

// ==========================================
// Kérdés hozzáadása gomb
// ==========================================

interface AddQuestionButtonProps {
  onAdd: (type: QuestionType) => void;
}

function AddQuestionButton({ onAdd }: AddQuestionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-border bg-card px-6 py-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <PlusIcon className="h-5 w-5" />
        Új kérdés hozzáadása
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-card p-2 shadow-lg">
            {Object.entries(questionTypeConfig).map(([type, config]) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  onAdd(type as QuestionType);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <span className="text-muted-foreground">{config.icon}</span>
                {config.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ==========================================
// Mentés sikeres üzenet
// ==========================================

function SaveSuccessToast({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 shadow-lg">
      <CheckIcon className="h-5 w-5 text-green-500" />
      <span className="text-sm font-medium text-green-500">Sikeresen mentve!</span>
      <button
        type="button"
        onClick={onClose}
        className="rounded p-1 text-green-500/70 hover:text-green-500"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

// ==========================================
// Fő Editor komponens
// ==========================================

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const surveyId = params.id as string;
  const isNew = surveyId === "new";

  const [survey, setSurvey] = useState<Survey>({
    id: isNew ? "new" : surveyId,
    title: "",
    description: "",
    status: "DRAFT" as SurveyStatus,
    ownerId: "temp-user",
    ownerName: "Felhasználó",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Kérdőív betöltése
  useEffect(() => {
    async function loadSurvey() {
      if (isNew) return;
      
      setIsLoading(true);
      setLoadError(null);
      
      try {
        const result = await getSurveyWithQuestions(surveyId);
        if (result.success && result.data) {
          setSurvey(result.data);
          setQuestions(result.data.questions || []);
        } else {
          setLoadError(result.error || "Nem sikerült betölteni a kérdőívet.");
        }
      } catch (err) {
        setLoadError("Hiba történt a betöltés során.");
        console.error("Betöltési hiba:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadSurvey();
  }, [surveyId, isNew]);

  // Mentés kezelése
  const handleSave = useCallback(async () => {
    const validationErrors = validateSurvey(survey, questions);
    setErrors(validationErrors);
    
    if (validationErrors.length > 0) {
      // Görgetés az első hibához
      const firstErrorField = validationErrors[0].field;
      const element = document.querySelector(`[aria-describedby="${firstErrorField}-error"], [id^="question-"][id*="${firstErrorField}"]`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const result = await saveSurveyWithQuestions(survey, questions);
      
      if (result.success && result.data) {
        setShowSaveSuccess(true);
        
        // Ha új kérdőív volt, átirányítás a szerkesztő oldalra az új ID-vel
        if (isNew) {
          router.replace(`/survey/${result.data.id}/edit`);
        } else {
          setSurvey(result.data);
        }
      } else {
        setErrors([{ field: "general", message: result.error || "Mentési hiba történt." }]);
      }
    } catch (err) {
      setErrors([{ field: "general", message: "Nem sikerült menteni a kérdőívet." }]);
      console.error("Mentési hiba:", err);
    } finally {
      setIsSaving(false);
    }
  }, [survey, questions, isNew, router]);

  // Kérdés műveletek
  const handleAddQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title: "",
      type,
      required: false,
      order: questions.length + 1,
      options: type !== "TEXT" ? [
        { id: crypto.randomUUID(), text: "", order: 1 },
        { id: crypto.randomUUID(), text: "", order: 2 },
      ] : [],
    };
    setQuestions([...questions, newQuestion]);
    // Hiba törlése
    setErrors((prev) => prev.filter((e) => !e.field.startsWith("question-")));
  };

  const handleUpdateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, ...updates } : q))
    );
    // Töröljük a kapcsolódó hibákat
    const qIndex = questions.findIndex((q) => q.id === questionId);
    setErrors((prev) => prev.filter((e) => !e.field.includes(`question-${qIndex}`)));
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions((prev) =>
      prev
        .filter((q) => q.id !== questionId)
        .map((q, idx) => ({ ...q, order: idx + 1 }))
    );
  };

  // Hibák megjelenítése
  const generalError = getFieldError(errors, "general");
  const titleError = getFieldError(errors, "title");
  const descriptionError = getFieldError(errors, "description");

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        <EditorSkeleton />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/50 bg-destructive/5 px-6 py-12 text-center">
          <AlertIcon className="mb-4 h-12 w-12 text-destructive" />
          <h2 className="text-lg font-semibold text-foreground">Hiba történt</h2>
          <p className="mt-1 text-sm text-muted-foreground">{loadError}</p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Vissza az irányítópultra
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
      {/* Felső műveletsáv */}
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon />
          Vissza
        </Link>
        <div className="flex items-center gap-3">
          {isSaving && (
            <span className="text-xs text-muted-foreground">Mentés...</span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isSaving ? "Mentés..." : "Mentés"}
          </button>
        </div>
      </div>

      {/* Általános hiba */}
      {generalError && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3">
          <AlertIcon className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{generalError}</p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Kérdőív fejléc */}
        <section className="rounded-lg border border-border bg-card p-4 md:p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Kérdőív adatai</h2>
          
          <div className="space-y-4">
            <FormInput
              id="survey-title"
              label="Kérdőív címe"
              value={survey.title}
              onChange={(value) => {
                setSurvey({ ...survey, title: value });
                setErrors((prev) => prev.filter((e) => e.field !== "title"));
              }}
              error={titleError}
              placeholder="Add meg a kérdőív címét..."
              required
              maxLength={200}
            />
            
            <FormTextarea
              id="survey-description"
              label="Leírás"
              value={survey.description}
              onChange={(value) => {
                setSurvey({ ...survey, description: value });
                setErrors((prev) => prev.filter((e) => e.field !== "description"));
              }}
              error={descriptionError}
              placeholder="Rövid leírás a kérdőívről (opcionális)..."
              maxLength={1000}
              rows={3}
            />
          </div>
        </section>

        {/* Kérdések */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Kérdések ({questions.length})
          </h2>
          
          {questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <QuestionEditor
                  key={question.id}
                  question={question}
                  index={index}
                  errors={errors}
                  onUpdate={(updates) => handleUpdateQuestion(question.id, updates)}
                  onDelete={() => handleDeleteQuestion(question.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-border bg-card/50 px-6 py-8 text-center">
              <p className="text-muted-foreground">
                Még nincsenek kérdések. Adj hozzá az első kérdést!
              </p>
            </div>
          )}
        </section>

        {/* Új kérdés gomb */}
        <div className="flex justify-center">
          <AddQuestionButton onAdd={handleAddQuestion} />
        </div>
      </div>

      {/* Mentés sikeres toast */}
      {showSaveSuccess && (
        <SaveSuccessToast onClose={() => setShowSaveSuccess(false)} />
      )}
    </div>
  );
}
