import { serve } from "@hono/node-server";
import { Sapling, serveStatic } from "@sapling/sapling";
import { Home } from "./pages/Home.js";
import NotFoundLayout from "./layouts/NotFoundLayout.js";

const site = new Sapling();

// Home page
site.get("/", async (c) => c.html(await Home()));
// Enter additional routes here

// Serve static files
// The location of this is important. It should be the last route you define.
site.get("/*", serveStatic({
  directory: "./static",
  // this will disable caching for static files in development
  // it is automatically passed in when you run deno task dev
  dev: true,
}));

// Set the not found handler last to catch all 404s
site.setNotFoundHandler(async (c) => c.html(await NotFoundLayout()));

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: site.fetch,
  port,
});
