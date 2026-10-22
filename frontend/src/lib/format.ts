export function convertPaceToString(seconds: number | null): string | null {
  if (seconds === null || seconds < 0) return null;

  const totalSeconds = Math.round(seconds);

  const ss = totalSeconds % 60;

  const mm = Math.floor(totalSeconds / 60);

  return `${mm}:${ss.toString().padStart(2, "0")}`;
}
