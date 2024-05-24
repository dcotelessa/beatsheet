export default function formatMillisecondsToTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`;
}
