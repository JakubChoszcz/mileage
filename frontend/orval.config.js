import { defineConfig } from "orval";

export default defineConfig({
  contract: {
    input: "http://localhost:3000/doc",
    output: {
      client: "zod",
      mode: "single",
      target: "./src/api/contract.gen.ts",
    },
  },
});
