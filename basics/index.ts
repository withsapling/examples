import { Router, render, serveStatic } from "@sapling/router";
import NotFoundLayout from "./layouts/NotFoundLayout.ts";
import { Home } from "./pages/Home.ts";

const router = new Router();

// Home page
router.get("/", async () => render(await Home()));

// Enter additional routes below


// Serve static files
// The location of this is important. It should be the last route you define.
router.get("/*", serveStatic({
  directory: "./static",
}));

// 404 Handler
router.setNotFoundHandler(async () => {
  return render(await NotFoundLayout());
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: router.fetch,
});
