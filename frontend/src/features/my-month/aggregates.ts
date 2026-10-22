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
