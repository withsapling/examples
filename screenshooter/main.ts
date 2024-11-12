import puppeteer from "npm:puppeteer";
import { Router } from "jsr:@sapling/router";

const app = new Router();

app.get("/", () => {
  return new Response("Hello World");
});

// example: /screenshot?url=https://jaydanurw.in
app.get("/screenshot", async (req) => {
  // get the url from the query params
  const url = new URL(req.url);
  const urlParam = url.searchParams.get("url");

  if (!urlParam) {
    return new Response("Please provide a URL parameter", { status: 400 });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  try {
    await page.goto(urlParam.toString());
    await page.setViewport({ width: 1200, height: 900 });

    const screenshot = await page.screenshot();

    return new Response(screenshot, {
      headers: {
        "Content-Type": "image/png"
      }
    });
  } catch (error) {
    return new Response(`Error taking screenshot: ${error}`, { status: 500 });
  } finally {
    await browser.close();
  }
});

Deno.serve({
  port: 8000,
  onListen: () => {
    console.log("Server started on http://localhost:8000");
  },
  handler: app.fetch,
});
