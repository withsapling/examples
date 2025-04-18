import { html } from "@hono/hono/html";
import Layout from "../layouts/Layout.ts";
import SaplingLogo from "../components/SaplingLogo.ts";

export async function Home() {
  return await Layout({
    children: await html`
      <main
        class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans"
      >
        <div class="flex flex-col gap-4">
          ${SaplingLogo({ width: 200, height: 48 })}
          <p>To get started check out our quick start guide</p>
          <a
            href="https://sapling.land/docs/quick-start-deno"
            class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 @dark:bg-white @dark:text-black @dark:hover:bg-gray-200 w-fit"
            >Deno Quick Start
            <span class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5.4 20L4 18.6L15.6 7H9V5h10v10h-2V8.4z"
                ></path>
              </svg>
            </span>
          </a>
        </div>
      </main>
    `,
  });
}
