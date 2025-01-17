import { Layout, html } from "@sapling/sapling";

export default async function TenThousandIslandPage() {
  return await Layout({
    head: html`
      <title>Sapling Stress Test - 1000 Islands</title>
      <!-- Sapling Island loaded from the CDN -->
      <script type="module" src="https://sapling-is.land"></script>
      <style>
        sapling-island {
          display: contents;
        }
        /* For demo purposes we'll highlight the hydrated islands */
        sapling-island[hydrated] p {
          border: 2px dotted red;
          padding: 1rem;
          margin: 0.5rem;
        }
        .islands-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          padding: 2rem;
        }
      </style>
    `,
    children: html`
      <div class="p-4 container mx-auto flex flex-col gap-4 text-center">
        <p>This is a page with 1000 islands loaded on visible</p>
        <p>
          You can verify this is working by inspecting the page and seeing the
          islands hydrate as you scroll down
        </p>
      </div>
      <div class="islands-container">
        ${Array.from(
      { length: 10000 },
      (_, i) => html`
            <sapling-island loading="onvisible">
              <p class="text-2xl font-bold">Island #${i + 1} 🏝️</p>
            </sapling-island>
          `
    )}
      </div>
      <sapling-island loading="onvisible">
        <template>
          <script type="module">
            import confetti from "https://cdn.skypack.dev/canvas-confetti";
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          </script>
        </template>
        <h2 class="py-6 text-2xl font-bold text-center my-4">
          🎉 Congratulations on reaching the bottom! 🎉
        </h2>
      </sapling-island>
    `,
  });
}
