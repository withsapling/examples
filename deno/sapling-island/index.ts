
import { Sapling, Layout, html, type Context } from "jsr:@sapling/sapling";

const site = new Sapling();

site.get("/", async (c: Context) => {
  return c.html(
    await Layout({
      head: html` <title>Hello World 🌍</title>
      <!-- Sapling Island loaded from the CDN -->
      <script type="module" src="https://sapling-is.land"></script>
      <style>
        sapling-island[hydrated] {
          border: 2px dotted red;
          padding: 1rem;
        }
      </style>
      `,
      children: html`
        <div
          class="py-4 px-12 flex flex-col justify-center items-center gap-4"
        >
          <h1 class="text-6xl font-bold">Sapling Island 🏝️</h1>
          
          <p>This is an island that will hydrate when the width is greater than 1024px</p>
          <sapling-island loading="(min-width: 1024px)">
            <p class="text-2xl font-bold">Sapling Island 🏝️</p>
          </sapling-island>
          <p>This is an island that will hydrate when the width is less than 1024px</p>
          <sapling-island loading="(max-width: 1024px)">
            <p class="text-2xl font-bold">Sapling Island 🏝️</p>
          </sapling-island>
          <p>This is an island that will hydrate as soon as the page loads</p>
          <sapling-island loading="onload">
            <p class="text-2xl font-bold">Sapling Island 🏝️</p>
          </sapling-island>
        
          <p>Keep scrolling to see an island that needs to be in view to hydrate</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p></p>This is an island that will hydrate when the user scrolls it into view</p>
          <p>You should only see the red dotted border when the island is hydrated</p>
          <sapling-island loading="onvisible">
          <!-- This template tag is use to keep the script tag from being executed until the island is hydrated -->
            <template>
              <script>
                const time = document.querySelector("time");
                setInterval(() => {
                  time.textContent = new Date().toLocaleTimeString();
                }, 1000);
              </script>
            </template>
              <p class="text-2xl font-bold">Sapling Island 🏝️</p>
              <p>The time should update every second after the island is hydrated</p>
              <p>The time is <time>00:00</time></p>
          </sapling-island>
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
