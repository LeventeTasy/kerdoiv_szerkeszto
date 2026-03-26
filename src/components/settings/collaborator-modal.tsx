"use client";

import { useState, useEffect, useRef } from "react";

interface CollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: string, role: "EDITOR" | "VIEWER") => void;
}

export function CollaboratorModal({
  isOpen,
  onClose,
  onAdd,
}: CollaboratorModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"EDITOR" | "VIEWER">("EDITOR");
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      emailInputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setEmail("");
      setRole("EDITOR");
      setError("");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Az e-mail cim megadasa kotelezo");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ervenytelen e-mail cim");
      return;
    }

    onAdd(email, role);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-card-foreground"
          >
            Szerkesztotars meghivasa
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Bezaras"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="collaborator-email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                E-mail cim
              </label>
              <input
                ref={emailInputRef}
                type="email"
                id="collaborator-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`block w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  error ? "border-destructive" : "border-border focus:border-primary"
                }`}
                placeholder="pelda@email.com"
                aria-describedby={error ? "email-error" : undefined}
                aria-invalid={error ? "true" : "false"}
              />
              {error && (
                <p
                  id="email-error"
                  className="mt-1.5 text-sm text-destructive"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="collaborator-role"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Szerepkor
              </label>
              <select
                id="collaborator-role"
                value={role}
                onChange={(e) => setRole(e.target.value as "EDITOR" | "VIEWER")}
                className="block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="EDITOR">Szerkeszto - szerkesztheti a kerdoivet</option>
                <option value="VIEWER">Megtekintonek - csak megtekintheti</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Megse
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              Meghivas elkuldese
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
