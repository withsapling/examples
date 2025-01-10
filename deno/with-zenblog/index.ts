import { Sapling, serveStatic, type Context } from '@sapling/sapling'
import NotFoundLayout from "./layouts/NotFoundLayout.ts";
import { Blog } from "./pages/Blog.ts";
import { BlogPost } from "./pages/BlogPost.ts";
const site = new Sapling();

// Home page
site.get("/", async (c: Context) => c.html(await Blog()));
site.get("/blog/:slug", async (c: Context) => c.html(await BlogPost({ params: { slug: c.req.param("slug") } })));

// Enter additional routes here

// Serve static files
// The location of this is important. It should be the last route you define.
site.get("/*", serveStatic({
  directory: "./static",
  // this will disable caching for static files in development
  // it is automatically passed in when you run deno task dev
  dev: Deno.env.get("ENV") === "development",
}));

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
