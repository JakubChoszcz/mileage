import { z } from "@hono/zod-openapi";

export const RunSchema = z
  .object({
    id: z.string().openapi({ example: "1" }),
    startedAt: z.string().openapi({ example: "2026-10-13T07:10:00" }),
    distanceMeters: z.number().min(1).openapi({ example: 5000 }),
    durationSeconds: z.number().min(1).openapi({ example: 1200 }),
    elevationGainMeters: z.number().min(0).nullable().openapi({ example: 88 }),
    avgHeartRate: z.number().min(1).nullable().openapi({ example: 144 }),
    shoeId: z.string().nullable().openapi({ example: "3" }),
    name: z.string().nullable().openapi({ example: "zawody na 5000 m" }),
  })
  .openapi("Run");

export const RunsSchema = z.array(RunSchema);

export const GetRunsQuerySchema = z.object({
  from: z.iso
    .date()
    .optional()
    .openapi({
      param: {
        name: "from",
        in: "query",
      },
      example: "2026-10-13",
    }),
  to: z.iso
    .date()
    .optional()
    .openapi({
      param: {
        name: "to",
        in: "query",
      },
      example: "2026-10-13",
    }),
});

export const ShoeSchema = z
  .object({
    id: z.string().min(1).openapi({
      example: "123",
    }),
    name: z.string().openapi({
      example: "buty w teren",
    }),
    brand: z.string().openapi({
      example: "Hoka",
    }),
    model: z.string().openapi({
      example: "Clifton 9",
    }),
    mileageMeters: z.number().openapi({
      example: 21097,
    }),
    limitMeters: z.number().openapi({
      example: 42195,
    }),
    isRetired: z.boolean().openapi({
      example: false,
    }),
  })
  .openapi("Shoe");

export const ShoesSchema = z.array(ShoeSchema);
