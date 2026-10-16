import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getRun, getRuns, getShoes } from "./data.js";

const app = new Hono();

const data = getRuns();

app.get("/runs", (c) => {
  const { from, to } = c.req.query();

  const runs = getRuns({ from, to });

  return c.json(runs);
});

app.get("/runs/:id", (c) => {
  const id = c.req.param("id");

  const run = getRun(id);

  if (!run) {
    c.status(404);
    return c.json({
      error: { code: "NOT_FOUND", message: "Nie znaleziono biegu" },
    });
  }

  return c.json(run);
});

app.get("/shoes", (c) => {
  const shoes = getShoes();

  return c.json(shoes);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
