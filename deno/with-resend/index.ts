import { Sapling, Context, Layout, html } from "@sapling/sapling";
import { Resend } from "resend";
import EmailTemplate from "./Email.tsx";
const site = new Sapling();

site.post("/resend", async (c: Context) => {
  const form = await c.formData();
  const email = form.get("email")?.toString();

  if (!email) {
    return c.redirect("/");
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    await resend.emails.send({
      from: "hello@resend.dev",
      to: email,
      subject: `Hello From Sapling & Resend 👋`,
      react: EmailTemplate(),
    });
  } catch (e) {
    console.error(e);
  }
  return c.redirect("/");
});



site.get("/", async (c) => {
  return c.html(
    await Layout({
      head: html` <title>Sapling & Resend ✉️</title>`,
      bodyClass: "bg-black text-white",
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Sapling & Resend ✉️</h1>
          <p class="text-2xl">
            Use the form below to send yourself email using Resend.
          </p>
          <form
            action="/resend"
            method="post"
            class="w-full max-w-2xl flex items-center rounded-full p-2 text-white  border-2 border-white mb-8"
          >
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              class="w-full rounded-l-full bg-transparent px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
              class="bg-white hover:opacity-80 text-black font-bold py-2 px-4 rounded-full"
            >
              Send
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
