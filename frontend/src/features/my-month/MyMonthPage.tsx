import { runsQueryOptions } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getMonthRange } from "./month";
import { getAveragePace, getLongestRun, getTotalDistance } from "./aggregates";
import MonthSummaryTiles from "./MonthSummaryTiles";

type Props = {
  month: string;
};

export default function MyMonthPage({ month }: Props) {
  const { from, to } = getMonthRange(month);
  const { data } = useQuery(runsQueryOptions({ from, to }));

  if (!data) return null;

  const distance = getTotalDistance(data);
  const runsCount = data.length;
  const avgPace = getAveragePace(data);
  const longestRun = getLongestRun(data);

  return (
    <MonthSummaryTiles
      distance={distance}
      runsCount={runsCount}
      avgPace={avgPace}
      longestRun={longestRun}
    />
  );
}
