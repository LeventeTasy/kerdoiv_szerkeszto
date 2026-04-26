export type SurveyStatus = 'piszkozat' | 'közzétett' | 'lezárt';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: 'szöveges' | 'egyválasztós' | 'többválasztós';
  title: string;
  options?: Option[];
}

export interface Survey {
  id?: string;
  title: string;
  description: string;
  status: SurveyStatus;
  createdAt?: number; // Számként tároljuk, könnyebb rendezni! ✨
  updatedAt?: number;
  ownerId: string; // Kapcsolat a User-hez
  questions: Question[];
}

export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface Response {
  id: string;
  surveyId: string;
  userId?: string;
  answers: Record<string, string | string[]>;
  submittedAt: number;
}