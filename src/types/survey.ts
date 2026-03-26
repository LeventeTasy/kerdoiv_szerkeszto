export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  updatedAt: Date;
  questions?: Question[];
}

export interface Collaborator {
  id: string;
  surveyId: string;
  userId: string;
  role: "EDITOR" | "VIEWER";
  user?: User;
}

export interface Question {
  id: string;
  surveyId?: string;
  title: string;
  type: "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX";
  order: number;
  options: Option[];
}

export interface Option {
  id: string;
  questionId?: string;
  text: string;
  order: number;
}
