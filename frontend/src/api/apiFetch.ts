import env from "@/config/env";
import { ApiError } from "./ApiError";
import { z } from "zod";

export async function apiFetch<T extends z.ZodType>({
  url,
  schema,
}: {
  url: string;
  schema: T;
}): Promise<z.infer<T>> {
  const res = await fetch(`${env.VITE_API_URL}${url}`);

  if (!res.ok) {
    throw new ApiError(res.status, "Request failed");
  }

  const data = await res.json();

  return schema.parse(data);
}
