import { describe, expect, test } from "vitest";
import { formatDuration, formatPace } from "./format";

describe("formatPace", () => {
  test("returns 5:00 when input is 300", () => {
    expect(formatPace(300)).toBe("5:00");
  });

  test("returns 5:12 when input is 312", () => {
    expect(formatPace(312)).toBe("5:12");
  });

  test("returns 5:00 when input is 299.6", () => {
    expect(formatPace(299.6)).toBe("5:00");
  });

  test("returns 1:00 when input is 59.5", () => {
    expect(formatPace(59.5)).toBe("1:00");
  });

  test("returns null when input is null", () => {
    expect(formatPace(null)).toBe(null);
  });
});

describe("formatDuration", () => {
  test("formats duration for 0 input value", () => {
    expect(formatDuration(0)).toBe("0:00");
  });

  test("returns 0:59 for 59 input value", () => {
    expect(formatDuration(59)).toBe("0:59");
  });

  test("returns 1:00 for 59.6 input value", () => {
    expect(formatDuration(59.6)).toBe("1:00");
  });

  test("returns 59:59 for 3599 input value", () => {
    expect(formatDuration(3599)).toBe("59:59");
  });

  test("returns 1:00:00 for 3599.6 input value", () => {
    expect(formatDuration(3599.6)).toBe("1:00:00");
  });

  test("returns 1:00:00 for 3600 input value", () => {
    expect(formatDuration(3600)).toBe("1:00:00");
  });

  test("returns 1:02:05 for 3725 input value", () => {
    expect(formatDuration(3725)).toBe("1:02:05");
  });

  test("returns null for null input value", () => {
    expect(formatDuration(null)).toBe(null);
  });

  test("returns null for negative input value", () => {
    expect(formatDuration(-67)).toBe(null);
  });
});
