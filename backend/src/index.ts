import { serve } from "@hono/node-server";
import { getRun, getRuns, getShoe, getShoes } from "./data.js";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  ErrorSchema,
  RunParamsSchema,
  RunSchema,
  RunsParamsSchema,
  RunsSchema,
  ShoeParamsSchema,
  ShoeSchema,
  ShoesSchema,
} from "./schemas.js";

const app = new OpenAPIHono();

const runsRoute = createRoute({
  method: "get",
  path: "/runs",
  request: {
    query: RunsParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: RunsSchema,
        },
      },
      description: "Retrieve runs",
    },
  },
});

app.openapi(runsRoute, (c) => {
  const { from, to } = c.req.valid("query");

  const runs = getRuns({ from, to });

  return c.json(runs, 200);
});

const runRoute = createRoute({
  method: "get",
  path: "/runs/{id}",
  request: {
    params: RunParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: RunSchema,
        },
      },
      description: "Retrieve the run",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Run not found",
    },
  },
});

app.openapi(runRoute, (c) => {
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

  return c.json(run, 200);
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
      description: "Retrieve shoes",
    },
  },
});

app.openapi(shoesRoute, (c) => {
  const shoes = getShoes();

  return c.json(shoes, 200);
});

const shoeRoute = createRoute({
  method: "get",
  path: "/shoes/{id}",
  request: { params: ShoeParamsSchema },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ShoeSchema,
        },
      },
      description: "Retrieve the shoe",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Shoe not found",
    },
  },
});

app.openapi(shoeRoute, (c) => {
  const { id } = c.req.valid("param");
  const shoe = getShoe(id);

  if (!shoe) {
    return c.json(
      { error: { code: "NOT_FOUND", message: "Nie znaleziono butów" } },
      404,
    );
  }

  return c.json(shoe, 200);
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
