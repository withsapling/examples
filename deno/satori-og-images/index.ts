import { Sapling, Layout, html } from "jsr:@sapling/sapling";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
const site = new Sapling();

site.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html` <title>Hello World 🌍</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Sapling & Satori OG Images 🖼️</h1>
       
         
          <p>Enter your name below to see an image made just for you</p>
          <form
            action="/"
            method="get"
            onsubmit="this.action=this.action+this.name.value"
            class="flex gap-2"
          >
            <input
              class="border border-gray-300 rounded-md px-2 py-1"
              placeholder="Enter a name"
              type="text"
              name="name"
            />
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
              type="submit"
            >
              Say Hello
            </button>
          </form>
        </div>
      `,
    })
  );
});

site.get("/:name", async (c) => {
  const name = c.req.param("name");
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html`<title>Hello ${capitalizedName} 🌍</title>
      <meta name="og:image" content="/og-image/${name}" />
      `,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
        <div class="max-w-2xl flex flex-col gap-4 items-center text-center">
        <img class="w-full h-auto rounded-md border border-gray-300 border-solid shadow-lg" src="/og-image/${name}" alt="og image" />
          <p class="text-2xl">
            The PNG image above is server rendered using <a class="text-blue-500 hover:underline" href="https://github.com/vercel/satori">Satori</a> and <a class="text-blue-500 hover:underline" href="https://github.com/yisibl/resvg-js">Resvg</a>. It can be used for Open Graph images.
          </p>
          <a class="text-blue-500 hover:underline" href="/">Go back</a>
          </div>
        </div>
      `,
    })
  );
});

site.get("/og-image/:name", async (c) => {
  const name = c.req.param("name");
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  // Render the SVG with Satori
  const svg = await satori(
    {
      type: "div",
      props: {
        children:
        {
          type: "p",
          props: {
            children: `Hello ${capitalizedName} 🌍`,
          },
          style: {
            fontFamily: 'Inter',
            fontSize: 80,
            fontWeight: 600,
          },
        },
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #34d399 0%, #3b82f6 100%)',
          color: '#ffffff',
          fontSize: 80,
          fontWeight: 600,
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await Deno.readFile("./fonts/Inter-Regular.ttf"),
          weight: 400,
          style: "normal",
        },
        {
          name: "Noto Emoji",
          data: await Deno.readFile("./fonts/NotoEmoji-Regular.ttf"),
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
  // Render the SVG to a PNG
  const resvg = new Resvg(svg, {
    background: "rgba(238, 235, 230, .9)",
  });
  // Render the PNG
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  // Return the PNG as a response
  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});
