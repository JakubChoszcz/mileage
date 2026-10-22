export function getAveragePace(
  runs: {
    distanceMeters: number;
    durationSeconds: number;
  }[],
): number | null {
  if (runs.length === 0) return null;

  let distanceMeters = 0;
  let durationSeconds = 0;

  for (const run of runs) {
    distanceMeters += run.distanceMeters;
    durationSeconds += run.durationSeconds;
  }

  if (distanceMeters <= 0) return null;

  return durationSeconds / (distanceMeters / 1000);
}

export function getTotalDistance(
  runs: {
    distanceMeters: number;
  }[],
): number {
  const totalDistance = runs.reduce((sum, run) => sum + run.distanceMeters, 0);

  return totalDistance;
}

export function getLongestRun<T extends { distanceMeters: number }>(
  runs: T[],
): T | null {
  let longestRun: T | null = null;

  for (const run of runs) {
    if (longestRun === null || run.distanceMeters >= longestRun.distanceMeters)
      longestRun = run;
  }

  return longestRun;
}
