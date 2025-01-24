import { Sapling, serveStatic, type Context } from "@sapling/sapling";
import NotFoundLayout from "./layouts/NotFoundLayout.ts";
import { Home } from "./pages/Home.ts";

export const site = new Sapling({
  // this will disable caching for static files in development
  // it is automatically passed in when you run deno task dev
  dev: Deno.env.get("ENV") === "development",
  // this is the directory where the prerendered pages are built
  // it tells Sapling where to look for prerendered pages in production
  // defaults to './dist'
  // buildDir: "./prerendered",
});

// Home page
site.prerender("/", async (c: Context) => c.html(await Home()));
// Enter additional routes here

// Serve static files
// The location of this is important. It should be the last route you define.
site.get("/*", serveStatic({ directory: "./static" }));

// 404 Handler
site.setNotFoundHandler(async (c) => c.html(await NotFoundLayout()));

Deno.serve({
  port: 8080,
  onListen: () =>
    console.log(
      `\nSapling Server is running on %chttp://localhost:8080\n`,
      "color: green; font-weight: bold"
    ),
  handler: site.fetch,
});
