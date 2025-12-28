import { SaturdayStatus } from "@/stores/timeTable.store";

export const monthMap: { [key: number]: string } = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const dayMap = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export const dayMapFull = new Map([
  ["Monday", 1],
  ["Tuesday", 2],
  ["Wednesday", 3],
  ["Thursday", 4],
  ["Friday", 5],
  ["Saturday", 6],
]);

export const dayMapFullInverse = new Map([
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
]);

export const saturdayOrderMap = new Map([
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [0, "Leave"],
]);

export const saturdayOrderMapReverse = new Map([
  ["Monday", SaturdayStatus.Monday],
  ["Tuesday", SaturdayStatus.Tuesday],
  ["Wednesday", SaturdayStatus.Wednesday],
  ["Thursday", SaturdayStatus.Thursday],
  ["Friday", SaturdayStatus.Friday],
  ["Leave", SaturdayStatus.Leave],
]);

export const subjectCodeMap: Record<string, string> = {
  CS23401: "DBMS", // key: string, value: string
  CS23402: "CA",
  CS23403: "FST",
  CS23404: "DAA",
  MA23C03: "Math",
  SDC: "SDC",
  IOC: "IOC",
  AUDIT: "Audit",
};

export const subjectNameMap: Record<string, string> = {
  DBMS: "CS23401",
  CA: "CS23402",
  FST: "CS23403",
  DAA: "CS23404",
  Math: "MA23C03",
  SDC: "SDC",
  IOC: "IOC",
  Audit: "AUDIT",
};
