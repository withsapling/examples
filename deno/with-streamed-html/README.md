# Sapling with Streamed HTML Response

Sapling's Layout component has a built-in `stream` option that allows you to stream the HTML response. This is useful for large pages that could benefit from a faster time to first byte.

You can learn more about time to first byte [here](https://developer.chrome.com/docs/lighthouse/performance/server-response-time?utm_source=lighthouse&utm_medium=lr).

If you are using Sapling's Router it is as simple as adding `stream: true` to the Layout component.

However, if you're using Hono or another API framework, you'll need to handle the streaming manually.


## Sapling Router Example

```ts
import { Sapling, Layout, html, type Context } from "@sapling/sapling";

const site = new Sapling();

site.get("/", async (c: Context) => {
  return c.html(
    await Layout({
      stream: true,
      children: html`<div>Hello World</div>`,
    })
  );
});
```

## Hono Example

```ts
import { Hono, type Context } from "@hono/hono";
import { Layout, html } from "@sapling/sapling";

const app = new Hono();

app.get("/", async (c: Context) => {
  const stream = await Layout({
    stream: true,
    children: html`<div>Hello World</div>`,
  });
  return new Response(stream, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
```

## Usage

```
deno task dev
```

