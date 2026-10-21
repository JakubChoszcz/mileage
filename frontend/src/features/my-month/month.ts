import dayjs from "dayjs";

// RRRR-MM format
export function getMonthRange(month: string): {
  from: string;
  to: string;
} {
  return {
    from: dayjs(month).startOf("month").format("YYYY-MM-DD"),
    to: dayjs(month).endOf("month").format("YYYY-MM-DD"),
  };
}
