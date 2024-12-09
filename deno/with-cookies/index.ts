import { Sapling, Layout, html, Context } from "jsr:@sapling/sapling";
import { getCookie, setCookie } from "jsr:@sapling/sapling/cookies";

const site = new Sapling();

site.get("/", async (c: Context) => {
  // set a cookie with a key of "hello" and a value of "world" with a max age of 24 hours
  setCookie(c, "hello", "World", {
    // max age of 24 hours
    maxAge: 60 * 60 * 24,
  });

  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html` <title>Hello World 🌍</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Hello World 🌍</h1>
          <p class="text-2xl">
            This is a site using
            <a
              class="text-blue-500 hover:underline"
              href="https://sapling.build"
              >Sapling</a
            >
            and
            <a class="text-blue-500 hover:underline" href="https://deno.com"
              >Deno</a
            >
          </p>
          <p class="text-base font-mono text-gray-500">
            It was server rendered at ${time}
          </p>
          <a class="text-blue-500 hover:underline" href="/cookies">Go to cookies</a>
        </div>
      `,
    })
  );
});



site.get("/cookies", async (c) => {
  // get the cookie with a key of "hello"
  const helloCookie = getCookie(c, "hello");
  // you should see "world" in the console
  console.log(helloCookie);
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html`<title>Hello ${helloCookie} 🌍</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Hello ${helloCookie} 🌍</h1>
          <p class="text-2xl">
            This is a site using
            <a
              class="text-blue-500 hover:underline"
              href="https://sapling.build"
              >Sapling</a
            >
            and
            <a class="text-blue-500 hover:underline" href="https://deno.com"
              >Deno</a
            >
          </p>
          <p class="text-base font-mono text-gray-500">
            It was server rendered at ${time}
          </p>
          <a class="text-blue-500 hover:underline" href="/">Go back</a>
        </div>
      `,
    })
  );
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});
