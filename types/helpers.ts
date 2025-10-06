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

export const subjectCodeMap: Record<string, string> = {
  CS23301: "SWE", // key: string, value: string
  CS23302: "DSA",
  CS23303: "DSD",
  CS23304: "Java",
  MA23C05: "Math",
  CS23U01: "Stds",
  CS23S01: "SDC",
  UC23U01: "UHV",
};

export const subjectNameMap: Record<string, string> = {
  SWE: "CS23301",
  DSA: "CS23302",
  DSD: "CS23303",
  Java: "CS23304",
  Math: "MA23C05",
  Stds: "CS23U01",
  SDC: "CS23S01",
  UHV: "UC23U01",
};
