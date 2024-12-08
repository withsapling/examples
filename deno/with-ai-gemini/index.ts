import { Sapling, Layout, html, Context } from "jsr:@sapling/sapling";
import OpenAI from "npm:openai";

const site = new Sapling();

site.post("/ai", async (c: Context) => {
  const data = await c.formData();
  const message = data.get("message");
  console.log(message);
  // Gemini is now accessible from the OpenAI library
  // Of course, you can use the official Google Gemini SDK, but this is just a quick example
  // Learn more: https://developers.googleblog.com/en/gemini-is-now-accessible-from-the-openai-library/
  const openai = new OpenAI({
    apiKey: Deno.env.get("GEMINI_API_KEY"),
    baseURL: "https://generativelanguage.googleapis.com/v1beta/",
  });

  const response = await openai.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: [{ role: "user", content: message }],
  });

  console.log(response.choices[0].message.content);

  return c.html(
    await Layout({
      head: html` <title>Hello World 🌍</title>`,
      children: html`
        <div
          class="max-w-xl mx-auto px-12 flex flex-col justify-center items-center h-screen gap-4"
        > 
          <h1 class="text-base font-bold">${response.choices[0].message.content}</h1>
          <a class="text-blue-500 hover:underline" href="/">Send another message</a>
        </div>
      `,
    })
  );
});

site.get("/", async (c) => {
  return c.html(
    await Layout({
      head: html` <title>Sapling with AI</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Sapling with AI ✨</h1>
          <p class="text-2xl">
            This is a site using
            <a
              class="text-blue-500 hover:underline"
              href="https://sapling.build"
              >Sapling</a
            >
            and the
            <a class="text-blue-500 hover:underline" href="https://ai.google.dev/"
              >Google's Gemini</a
            >
            API.
          </p>
          <p class="text-base text-gray-500">
            Send a message to the AI and see the response.
          </p>
          <form
            action="/ai"
            method="post"
            class="flex gap-2"
          >
            <input
              class="border border-gray-300 rounded-md px-2 py-1"
              placeholder="Enter a message"
              name="message"
            />
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
              type="submit"
            >
              Message AI
            </button>
          </form>
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