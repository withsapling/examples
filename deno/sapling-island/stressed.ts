import { Layout, html } from "jsr:@sapling/sapling";

export default async function stressedPage() {
  return await Layout({
    head: html` <title>Sapling Stress Test - 1000 Islands</title>
      <!-- Sapling Island loaded from the CDN -->
      <script type="module" src="https://sapling-is.land"></script>
      <style>
        sapling-island[hydrated] {
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
        <div class="islands-container">
          ${Array.from({ length: 20000 }, (_, i) => html`
            <sapling-island loading="onvisible">
              <p class="text-2xl font-bold">Island #${i + 1} 🏝️</p>
            </sapling-island>
          `)}
        </div>
      `,
  });
}
