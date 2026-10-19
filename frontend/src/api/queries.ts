import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";
import {
  GetShoesIdParams,
  GetShoesResponse,
  GetShoesIdResponse,
  GetRunsResponse,
  GetRunsIdParams,
  GetRunsIdResponse,
  GetRunsQueryParams,
} from "./contract.gen";
import type z from "zod";

export function runsQueryOptions({
  from,
  to,
}: z.infer<typeof GetRunsQueryParams> = {}) {
  const searchParams = new URLSearchParams("");

  if (from) searchParams.append("from", from);
  if (to) searchParams.append("to", to);

  const query = searchParams.toString();

  return queryOptions({
    queryKey: ["runs", { from, to }],
    queryFn: () =>
      apiFetch({
        url: `/runs${query && `?${query}`}`,
        schema: GetRunsResponse,
      }),
  });
}

export function runQueryOptions({ id }: z.infer<typeof GetRunsIdParams>) {
  return queryOptions({
    queryKey: ["runs", id],
    queryFn: () => apiFetch({ url: `/runs/${id}`, schema: GetRunsIdResponse }),
  });
}

export function shoesQueryOptions() {
  return queryOptions({
    queryKey: ["shoes"],
    queryFn: () => apiFetch({ url: "/shoes", schema: GetShoesResponse }),
  });
}

export function shoeQueryOptions({ id }: z.infer<typeof GetShoesIdParams>) {
  return queryOptions({
    queryKey: ["shoes", id],
    queryFn: () =>
      apiFetch({ url: `/shoes/${id}`, schema: GetShoesIdResponse }),
  });
}
