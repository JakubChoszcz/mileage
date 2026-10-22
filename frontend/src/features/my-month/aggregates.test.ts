import { describe, expect, test } from "vitest";
import { getAveragePace, getLongestRun, getTotalDistance } from "./aggregates";

describe("getAveragePace", () => {
  test("returns total average pace from runs", () =>
    expect(
      getAveragePace([
        {
          distanceMeters: 10000,
          durationSeconds: 3000,
        },
        {
          distanceMeters: 1000,
          durationSeconds: 240,
        },
      ]),
    ).toBe(3240 / 11));

  test("returns average pace from run", () =>
    expect(
      getAveragePace([
        {
          distanceMeters: 5000,
          durationSeconds: 1500,
        },
      ]),
    ).toBe(300));

  test("returns total average pace from runs when one run has distanceMeters equals 0", () =>
    expect(
      getAveragePace([
        {
          distanceMeters: 5000,
          durationSeconds: 1500,
        },
        {
          distanceMeters: 0,
          durationSeconds: 1000,
        },
      ]),
    ).toBe(500));

  test("returns null for empty array", () =>
    expect(getAveragePace([])).toBe(null));

  test("returns null when distanceMeters is 0", () =>
    expect(
      getAveragePace([
        {
          distanceMeters: 0,
          durationSeconds: 120,
        },
      ]),
    ).toBe(null));
});

describe("getTotalDistance", () => {
  test("returns 0 when input array is empty", () => {
    expect(getTotalDistance([])).toBe(0);
  });

  test("returns total distance from runs", () => {
    expect(
      getTotalDistance([
        {
          distanceMeters: 5000,
        },
        {
          distanceMeters: 3000,
        },
        {
          distanceMeters: 1500,
        },
      ]),
    ).toBe(9500);
  });
});

describe("getLongestRun", () => {
  test("returns the longest run from an array of runs", () => {
    expect(
      getLongestRun([
        { distanceMeters: 100 },
        { distanceMeters: 20000 },
        { distanceMeters: 3000 },
      ]),
    ).toEqual({ distanceMeters: 20000 });
  });

  test("return null when array is empty", () => {
    expect(getLongestRun([])).toBe(null);
  });

  test("return the longest run when there are two runs with the same distanceMeters", () => {
    expect(
      getLongestRun([{ distanceMeters: 5000 }, { distanceMeters: 5000 }]),
    ).toEqual({ distanceMeters: 5000 });
  });
});
