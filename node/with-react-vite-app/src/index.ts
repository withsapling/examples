import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { Sapling, serveStatic, type Context } from "@sapling/sapling";
import { Home } from "./www/pages/Home.js";
import fs from "node:fs/promises";

dotenv.config();

const site = new Sapling({
  // this will disable caching for static files in development
  // it is automatically passed in when you run deno task dev
  dev: process.env.ENV === "development",
});

// Home page
site.get("/", async (c: Context) => c.html(await Home()));

// Enter additional routes here
// this could be /app /dashboard etc.
site.get("/app", async (c: Context) => {
  // set a no cache header on the SPA app
  c.res.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  return c.html(await fs.readFile("./static/app/index.html", "utf-8"));
});

// Serve static files
// The location of this is important. It should be the last route you define.
site.get(
  "/*",
  serveStatic({
    root: "./static",
  })
);

// Set the not found handler last to catch all 404s
site.notFound(async (c) => {
  const url = new URL(c.req.url);
  const pathname = url.pathname;
  // this could be /app /dashboard etc.
  if (pathname.startsWith("/app")) {
    // set a no cache header on the SPA app
    c.res.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    return c.html(await fs.readFile("./static/app/index.html", "utf-8"));
  }
  // otherwise, redirect to home
  return c.redirect("/");
});

const port = 8080;
console.log(`\n\nSapling Server is running on http://localhost:${port}`);

serve({
  fetch: site.fetch,
  port,
});
