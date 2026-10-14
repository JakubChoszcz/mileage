import { z } from "zod";

const envSchema = z.object({
	PORT: z.number().min(1000),
	BASE_URL: z.url(),
	ENV: z
		.union([
			z.literal("development"),
			z.literal("testing"),
			z.literal("production"),
		])
		.default("development"),
});

const env = envSchema.parse(import.meta.env);

export default env;
