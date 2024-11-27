import { Sapling, serveStatic } from '@sapling/sapling'
import { Home } from "./pages/Home.ts";

const site = new Sapling();

// Home page
site.get("/", async (c) => c.html(await Home()));

// Serve static files
// The location of this is important. It should be the last route you define.
site.get("/*", serveStatic({
  directory: "./static",
  // this will disable caching for static files in development
  // it is automatically passed in when you run deno task dev
  dev: Deno.env.get("ENV") === "development",
}));

Deno.serve({
  port: 8080,
  onListen: () =>
    console.log(
      `\nSapling Server is running on %chttp://localhost:8080\n`,
      "color: green; font-weight: bold"
    ),
  handler: site.fetch,
});
