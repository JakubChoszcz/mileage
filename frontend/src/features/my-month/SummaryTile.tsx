type Props = {
  label: string;
  value: string | number | null;
  hint?: string | null;
};

export default function SummaryTile({ label, value, hint }: Props) {
  return (
    <div>
      <dl>{label}</dl>
      <dt>{value !== null ? value : "-"}</dt>
      {hint && <dd>{hint}</dd>}
    </div>
  );
}
