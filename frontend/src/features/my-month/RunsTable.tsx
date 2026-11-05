import type z from "zod";
import { GetRunsResponse } from "@/api/contract.gen";
import {
	formatDate,
	formatDistance,
	formatDuration,
	formatPace,
} from "@/lib/format";
import { getPace } from "./aggregates";

type Props = {
	runs: z.infer<typeof GetRunsResponse>;
};

export default function RunsTable({ runs }: Props) {
	return (
		<table>
			<caption>Biegi z wybranego miesiąca</caption>
			<thead>
				<tr>
					<th>Data</th>
					<th>Nazwa</th>
					<th>Dystans</th>
					<th>Czas</th>
					<th>Tempo</th>
					<th>Przewyzszenia</th>
				</tr>
			</thead>
			<tbody>
				{runs.map((run) => (
					<tr key={run.id}>
						<td>{formatDate(run.startedAt)}</td>
						<td>{run.name ? run.name : "-"}</td>
						<td>{formatDistance(run.distanceMeters)} km</td>
						<td>{formatDuration(run.durationSeconds)}</td>
						<td>
							{formatPace(
								getPace({
									distanceMeters: run.distanceMeters,
									durationSeconds: run.durationSeconds,
								}),
							)}{" "}
							/km
						</td>
						<td>{run.elevationGainMeters} m</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
