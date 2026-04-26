import { db } from "@/lib/firebase";
import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where
} from "firebase/firestore";
import { Survey } from "@/types/survey";

const SURVEY_COLLECTION = "surveys";

export const surveyService = {
  // CREATE
  async createSurvey(survey: Omit<Survey, "id" | "createdAt" | "updatedAt">) {
    const docRef = await addDoc(collection(db, SURVEY_COLLECTION), {
      ...survey,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return docRef.id;
  },

  // READ (All for a user)
  async getSurveys(userId: string) {
    // Sima query, hogy ne dobjon Index hibát a Firestore! 💅
    const q = query(
        collection(db, SURVEY_COLLECTION),
        where("ownerId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Survey));
  },

  // UPDATE
  async updateSurvey(id: string, survey: Partial<Survey>) {
    const docRef = doc(db, SURVEY_COLLECTION, id);
    await updateDoc(docRef, {
      ...survey,
      updatedAt: Date.now(),
    });
  },

  // DELETE
  async deleteSurvey(id: string) {
    const docRef = doc(db, SURVEY_COLLECTION, id);
    await deleteDoc(docRef);
  }
};