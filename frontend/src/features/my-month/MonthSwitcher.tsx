type Props = {
  month: string;
};

export default function MonthSwitcher({ month }: Props) {
  return (
    <div>
      <button>PREV -</button>
      {Intl.DateTimeFormat("pl-PL", { month: "long", year: "numeric" }).format(
        new Date(month),
      )}
      -<button>NEXT</button>
    </div>
  );
}
