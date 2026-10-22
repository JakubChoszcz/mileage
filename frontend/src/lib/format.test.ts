import { describe, expect, test } from "vitest";
import { convertPaceToString } from "./format";

describe("convertPaceToString", () => {
  test("returns 5:00 when input is 300", () => {
    expect(convertPaceToString(300)).toBe("5:00");
  });

  test("returns 5:12 when input is 312", () => {
    expect(convertPaceToString(312)).toBe("5:12");
  });

  test("returns 5:00 when input is 299.6", () => {
    expect(convertPaceToString(299.6)).toBe("5:00");
  });

  test("returns 1:00 when input is 59.5", () => {
    expect(convertPaceToString(59.5)).toBe("1:00");
  });

  test("returns null when input is null", () => {
    expect(convertPaceToString(null)).toBe(null);
  });
});
