import { sanitizeMonth } from "@/features/my-month/month";
import MyMonthPage from "@/features/my-month/MyMonthPage";
import { createFileRoute, redirect } from "@tanstack/react-router";
import dayjs from "dayjs";
import z from "zod";

const monthSearchSchema = z.object({
  miesiac: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/miesiac")({
  validateSearch: (search) => monthSearchSchema.parse(search),
  beforeLoad: (params) => {
    const { miesiac } = params.search;

    const currentMonth = dayjs().format("YYYY-MM");

    const month = sanitizeMonth({ input: miesiac, currentMonth });

    if (miesiac !== month)
      throw redirect({
        to: "/miesiac",
        search: {
          miesiac: month,
        },
        replace: true,
      });

    return { month };
  },
  component: () => {
    return <MiesiacRoute />;
  },
});

function MiesiacRoute() {
  const { month } = Route.useRouteContext();

  return <MyMonthPage month={month} />;
}
