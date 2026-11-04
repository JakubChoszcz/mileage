import { runsQueryOptions } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getMonthRange } from "./month";
import { getAveragePace, getLongestRun, getTotalDistance } from "./aggregates";
import MonthSummaryTiles from "./MonthSummaryTiles";
import RunsTable from "./RunsTable";
import MonthSwitcher from "./MonthSwitcher";

type Props = {
  month: string;
  currentMonth: string;
};

export default function MyMonthPage({ month, currentMonth }: Props) {
  const { from, to } = getMonthRange(month);
  const { data } = useQuery(runsQueryOptions({ from, to }));

  if (!data) return null;

  const distance = getTotalDistance(data);
  const runsCount = data.length;
  const avgPace = getAveragePace(data);
  const longestRun = getLongestRun(data);

  return (
    <div>
      <MonthSummaryTiles
        distance={distance}
        runsCount={runsCount}
        avgPace={avgPace}
        longestRun={longestRun}
      />
      {data.length > 0 && <RunsTable runs={data} />}
      <MonthSwitcher month={from} currentMonth={currentMonth} />
    </div>
  );
}
