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
  timeTable: string[];
  saturdayStatus: SaturdayStatus;
  setTimeTable: (tt: string[]) => void;
  changeSubject: (index: number, newSubjectCode: string) => void;
  setSaturdayStatus: (saturdayStatus: SaturdayStatus) => void;
};

export const useTimeTableStore = create<TimeTableStore>((set) => ({
  timeTable: ["", "", "", "", "", "", "", ""],
  saturdayStatus: SaturdayStatus.Leave,
  setTimeTable: (tt: string[]) => set({ timeTable: tt }),
  changeSubject: (index: number, newSubjectCode: string) =>
    set((state) => {
      const tt = [...state.timeTable];
      tt[index] = newSubjectCode;
      return { timeTable: tt };
    }),
  setSaturdayStatus: (saturdayStatus: SaturdayStatus) =>
    set({ saturdayStatus: saturdayStatus }),
}));
