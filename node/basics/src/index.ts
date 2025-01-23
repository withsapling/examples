import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { Sapling, serveStatic, type Context } from "@sapling/sapling";
import { Home } from "./pages/Home.js";
import NotFoundLayout from "./layouts/NotFoundLayout.js";

dotenv.config();

const site = new Sapling({
  // this will disable caching for static files in development
  // it is automatically passed in when you run deno task dev
  dev: process.env.ENV === "development",
});

// Home page
site.get("/", async (c: Context) => c.html(await Home()));
// Enter additional routes here

// Serve static files
// The location of this is important. It should be the last route you define.
site.get(
  "/*",
  serveStatic({
    directory: "./static",
  })
);

// Set the not found handler last to catch all 404s
site.setNotFoundHandler(async (c: Context) => c.html(await NotFoundLayout()));

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: site.fetch,
  port,
});
