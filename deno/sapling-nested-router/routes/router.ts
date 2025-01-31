import { Sapling, serveStatic } from "@sapling/sapling";
import { Home } from "./Home.ts";
import NotFoundLayout from "../layouts/NotFoundLayout.ts";

export function router(site: Sapling) {
  // Home page
  site.get("/", async (c) => c.html(await Home()));
  // Enter additional routes here

  // Serve static files
  // The location of this is important. It should be the last route you define.
  site.get(
    "/*",
    serveStatic({
      root: "./static",
      // this will disable caching for static files in development
      // it is automatically passed in when you run deno task dev
      dev: Deno.env.get("ENV") === "development",
    })
  );

  // 404 Handler
  site.notFound(async (c) => c.html(await NotFoundLayout()));
}
