import { formatDate, formatDistance, formatPace } from "@/lib/format";
import SummaryTile from "./SummaryTile";

type Props = {
  distance: number;
  runsCount: number;
  avgPace: number | null;
  longestRun: {
    distanceMeters: number;
    startedAt: string;
  } | null;
};

export default function MonthSummaryTiles({
  distance,
  runsCount,
  avgPace,
  longestRun,
}: Props) {
  const formattedDistance = formatDistance(distance);
  const formattedPace = formatPace(avgPace);
  const formattedLongestRunDistance =
    longestRun === null ? null : formatDistance(longestRun.distanceMeters);
  const formattedDate =
    longestRun === null ? null : formatDate(longestRun.startedAt);

  return (
    <div className="grid grid-cols-2 gap-4">
      <SummaryTile label="Dystans" value={`${formattedDistance} km`} />
      <SummaryTile label="Biegi" value={runsCount} />
      <SummaryTile
        label="Średnie tempo"
        value={formattedPace !== null ? `${formattedPace} /km` : null}
      />
      <SummaryTile
        label="Najdluzszy bieg"
        value={
          formattedLongestRunDistance !== null
            ? `${formattedLongestRunDistance} km`
            : null
        }
        hint={formattedDate}
      />
    </div>
  );
}
