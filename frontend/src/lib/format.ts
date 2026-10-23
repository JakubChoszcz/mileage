export function formatPace(seconds: number | null): string | null {
  if (seconds === null || seconds < 0) return null;

  const totalSeconds = Math.round(seconds);

  const ss = totalSeconds % 60;

  const mm = Math.floor(totalSeconds / 60);

  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

export function formatDuration(seconds: number | null): string | null {
  if (seconds == null || seconds < 0) return null;

  const totalSeconds = Math.round(seconds);

  const h = Math.floor(totalSeconds / 3600);
  const mm = Math.floor(totalSeconds / 60) % 60;
  const ss = totalSeconds % 60;

  return `${h > 0 ? `${h}:` : ""}${h > 0 ? mm.toString().padStart(2, "0") : mm}:${ss.toString().padStart(2, "0")}`;
}

console.log(formatDuration(7200));
console.log(formatDuration(5200));
console.log(formatDuration(300));
console.log(formatDuration(100));
console.log(formatDuration(34));
