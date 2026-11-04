import { Link } from "@tanstack/react-router";
import { getNextMonth, getPreviousMonth } from "./month";
import dayjs from "dayjs";

const monthFormat = Intl.DateTimeFormat("pl-PL", {
  month: "long",
  year: "numeric",
});

type Props = {
  month: string;
  currentMonth: string;
};

export default function MonthSwitcher({ month, currentMonth }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/miesiac"
        search={{ miesiac: getPreviousMonth(month) }}
        aria-label="Previous month"
      >
        ←{" "}
      </Link>{" "}
      {monthFormat.format(dayjs(month).toDate())}{" "}
      <Link
        to={"/miesiac"}
        search={{ miesiac: getNextMonth(month) }}
        disabled={month >= currentMonth}
        aria-label="Next month"
      >
        →
      </Link>
    </div>
  );
}
