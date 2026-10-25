import { z } from "@hono/zod-openapi";

export const RunParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "2",
  }),
});

export const RunSchema = z
  .object({
    id: z.string().min(1).openapi({
      example: "2",
    }),
    startedAt: z.iso.datetime({ local: true }).openapi({
      example: "2026-10-13T07:10:00",
    }),
    distanceMeters: z.number().nonnegative().openapi({
      example: 80000,
    }),
    durationSeconds: z.number().nonnegative().openapi({
      example: 600,
    }),
    elevationGainMeters: z.number().nonnegative().nullable().openapi({
      example: 88,
    }),
    avgHeartRate: z.number().nonnegative().nullable().openapi({
      example: 144,
    }),
    shoeId: z.string().nullable().openapi({
      example: "2",
    }),
    name: z.string().nullable().openapi({
      example: "Poaranny bieg",
    }),
  })
  .openapi("Run");

export const RunsParamsSchema = z.object({
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

export const RunsSchema = z.array(RunSchema);

export const ShoeParamsSchema = z.object({
  id: z
    .string()
    .min(1)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "1",
    }),
});

export const ShoeSchema = z
  .object({
    id: z.string().openapi({
      example: 1,
    }),
    name: z.string().openapi({
      example: "Błyskawica",
    }),
    brand: z.string().openapi({
      example: "Nike",
    }),
    model: z.string().openapi({
      example: "Pegasus 41",
    }),
    limitMeters: z.number().openapi({
      example: 123456,
    }),
    isRetired: z.boolean().openapi({
      example: false,
    }),
    mileageMeters: z.number().openapi({
      example: 1012000,
    }),
  })
  .openapi("Shoe");

export const ShoesSchema = z.array(ShoeSchema);

export const ErrorSchema = z
  .object({
    error: z.object({
      code: z.string().openapi({ example: "NOT_FOUND" }),
      message: z.string().openapi({ example: "Nie znaleziono biegu" }),
    }),
  })
  .openapi("Error");
