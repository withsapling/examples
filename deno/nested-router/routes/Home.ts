import { html } from "@sapling/sapling";
import Layout from "../layouts/Layout.ts";

export async function Home() {
  return await Layout({
    head: html`
    <!-- Ah vanilla JavaScript is so refreshing -->
    <script type="module" defer>
      let count = 0;
      document.querySelector("#countButton").addEventListener("click", () => {
        count++;
        document.querySelector("#count").textContent = count.toString();
      });
    </script>`,
    children: await html`
      <main class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans gap-4">
        <h1 class="text-4xl font-bold">Welcome to Sapling</h1>
        <a href="https://sapling.build" class="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">Learn more</a>
        <button id="countButton" class="px-4 py-2 rounded border-2 border-black">Click Count: <span id="count">0</span></button>
      </main>
    `,
  });
}
