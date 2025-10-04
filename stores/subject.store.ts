import { create } from "zustand";

type Subject = {
  id: string;
  subjectCode: string;
  subjectTitle: string;
  contactHoursPerWeek: number;
};

type SubjectStore = {
  currentSubject: Subject | null;
  setCurrentSubject: (subject: Subject) => void;
};

export const useSubjectStore = create<SubjectStore>((set) => ({
  currentSubject: null,
  setCurrentSubject: (subject: Subject) => set({ currentSubject: subject }),
}));
