import { describe, expect, test } from "vitest";
import { getMonthRange, sanitizeMonth } from "./month";

describe("getMonthRange", () => {
  test("get range month for october", () => {
    expect(getMonthRange("2026-10")).toEqual({
      from: "2026-10-01",
      to: "2026-10-31",
    });
  });

  test("get range month for january", () => {
    expect(getMonthRange("2027-01")).toEqual({
      from: "2027-01-01",
      to: "2027-01-31",
    });
  });

  test("get range month for february", () => {
    expect(getMonthRange("2027-02")).toEqual({
      from: "2027-02-01",
      to: "2027-02-28",
    });
  });

  test("get range month for february of a leap year", () => {
    expect(getMonthRange("2028-02")).toEqual({
      from: "2028-02-01",
      to: "2028-02-29",
    });
  });

  test("get range month for december", () => {
    expect(getMonthRange("2026-12")).toEqual({
      from: "2026-12-01",
      to: "2026-12-31",
    });
  });
});

describe("sanitizeMonth", () => {
  test("current month", () => {
    expect(sanitizeMonth({ input: "2026-10", currentMonth: "2026-10" })).toBe(
      "2026-10",
    );
  });

  test("month before", () => {
    expect(sanitizeMonth({ input: "2026-09", currentMonth: "2026-10" })).toBe(
      "2026-09",
    );
  });

  test("month after", () => {
    expect(sanitizeMonth({ input: "2026-11", currentMonth: "2026-10" })).toBe(
      "2026-10",
    );
  });

  test("undefined", () => {
    expect(sanitizeMonth({ currentMonth: "2026-10" })).toBe("2026-10");
  });

  test.each(["2026-1", "abc", "2026-10-21", "2026-13"])(
    "invalid format - %s",
    (input) => {
      expect(sanitizeMonth({ input: input, currentMonth: "2026-10" })).toBe(
        "2026-10",
      );
    },
  );
});
