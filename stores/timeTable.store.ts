import { create } from "zustand";

enum SaturdayStatus {
  Leave,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}

type TimeTableStore = {
  id: string;
  timeTable: string[];
  saturdayStatus: SaturdayStatus;
  setTimeTable: (tt: string[]) => void;
  changeSubject: (index: number, newSubjectCode: string) => void;
  setSaturdayStatus: (saturdayStatus: SaturdayStatus) => void;
  setId: (id: string) => void;
};

export const useTimeTableStore = create<TimeTableStore>((set) => ({
  timeTable: ["", "", "", "", "", "", "", ""],
  id: "",
  saturdayStatus: SaturdayStatus.Leave,
  setTimeTable: (tt: string[]) => set({ timeTable: tt }),
  changeSubject: (index: number, newSubjectCode: string) =>
    set((state) => {
      const tt = [...state.timeTable];
      tt[index] = newSubjectCode;
      return { timeTable: tt };
    }),
  setId: (id: string) => set({ id: id }),
  setSaturdayStatus: (saturdayStatus: SaturdayStatus) =>
    set({ saturdayStatus: saturdayStatus }),
}));
