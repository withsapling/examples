import { Layout as LayoutComponent } from "@sapling/sapling";
import { html } from "hono/html";
import { BaseHead } from "../components/BaseHead.js";
import { config } from "../uno.config.js";

export default async function NotFoundLayout() {
  return await LayoutComponent(
    {
      stream: true,
      unoConfig: config,
      head: html`
        ${await BaseHead({
        title: "Page Not Found",
        description: "The page you are looking for does not exist.",
      })}`,
      bodyClass: "font-sans @dark:bg-black @dark:text-white",
      children:
        html` <main
      class="flex-1 flex flex-col justify-center items-center min-h-screen"
    >
      <h1 class="text-4xl font-bold font-heading leading-tight mb-8">
        Page not found
      </h1>
      <a href="/" class="text-xl hover:underline">Go back to the homepage</a>
    </main>`
    },
  );
}
