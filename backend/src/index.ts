import { serve } from "@hono/node-server";
import { getRun, getRuns, getShoes } from "./data.js";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { GetRunsQuerySchema, RunsSchema, ShoesSchema } from "./schemas.js";

const app = new OpenAPIHono();

const runsRoute = createRoute({
  method: "get",
  path: "/runs",
  request: {
    query: GetRunsQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: RunsSchema,
        },
      },
      description: "Retrieve the runs",
    },
  },
});

app.openapi(runsRoute, (c) => {
  const { from, to } = c.req.valid("query");

  const runs = getRuns({ from, to });

  return c.json(runs, 200);
});

app.get("/runs/:id", (c) => {
  const id = c.req.param("id");

  const run = getRun(id);

  if (!run) {
    return c.json(
      {
        error: { code: "NOT_FOUND", message: "Nie znaleziono biegu" },
      },
      404,
    );
  }

  return c.json(run);
});

const shoesRoute = createRoute({
  method: "get",
  path: "/shoes",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ShoesSchema,
        },
      },
      description: "Retrieve the shoes",
    },
  },
});

app.openapi(shoesRoute, (c) => {
  const shoes = getShoes();

  return c.json(shoes, 200);
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Kilometrownik API",
  },
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
