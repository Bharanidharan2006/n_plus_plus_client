import { create } from "zustand";

type Subject = {
  id: string;
  subjectCode: string;
  subjectTitle: string;
  contactHoursPerWeek: number;
};

type SubjectStore = {
  subjects: Subject[];
  currentSubject: Subject | null;
  setCurrentSubject: (subject: Subject) => void;
  setSubjects: (subjects: Subject[]) => void;
};

export const useSubjectStore = create<SubjectStore>((set) => ({
  subjects: [],
  currentSubject: null,
  setCurrentSubject: (subject: Subject) => set({ currentSubject: subject }),
  setSubjects: (subjects: Subject[]) => set({ subjects: subjects }),
}));
