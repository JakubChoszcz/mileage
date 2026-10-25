import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

// RRRR-MM date format
export function getMonthRange(month: string): {
  from: string;
  to: string;
} {
  return {
    from: dayjs(month).startOf("month").format("YYYY-MM-DD"),
    to: dayjs(month).endOf("month").format("YYYY-MM-DD"),
  };
}

// RRRR-MM date format
export function sanitizeMonth({
  input,
  currentMonth,
}: {
  input?: string;
  currentMonth: string;
}): string {
  if (!input) return currentMonth;

  if (!dayjs(input, "YYYY-MM", true).isValid()) return currentMonth;

  if (input > currentMonth) return currentMonth;

  return input;
}
