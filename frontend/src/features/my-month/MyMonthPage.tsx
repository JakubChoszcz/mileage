import { runsQueryOptions } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { getMonthRange } from "./month";

type Props = {
  month: string;
};

export default function MyMonthPage({ month }: Props) {
  const { from, to } = getMonthRange(month);
  const { data, error, status } = useQuery(runsQueryOptions({ from, to }));
  console.log(data, error?.message, status);

  return <p>MyMonthPage</p>;
}
