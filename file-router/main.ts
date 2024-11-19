import { Layout, html } from "@sapling/sapling";
import { FileRouter, render, serveStatic } from "@sapling/router";

const router = new FileRouter({
  directory: "./pages",
  baseUrl: import.meta.url,
});

// Initialize the router
await router.initialize();

// Serve static files
// The location of this is important. It should be the last route you define before the 404 handler.
router.get("/*", serveStatic({
  directory: "./static",
}));

// Set a custom 404 handler. Important: This should be the last route you define.
router.setNotFoundHandler(async () => {
  return render(
    await Layout({
      children: html`<h1>404 Not Found</h1>`,
    }),
  );
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: router.fetch,
});