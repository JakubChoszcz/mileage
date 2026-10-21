import { describe, expect, test } from "vitest";
import { getMonthRange } from "./month";

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
