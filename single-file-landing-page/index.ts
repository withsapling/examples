import { Layout, html } from "jsr:@sapling/sapling";
import { Router, render } from "jsr:@sapling/router";
import { defineConfig } from "npm:unocss";
import presetUno from "npm:@unocss/preset-uno";
import presetTypography from "npm:@unocss/preset-typography";

const config = defineConfig({
  presets: [presetUno(), presetTypography()],
});

const router = new Router();

function renderNav() {
  return html`
    <nav
      class="flex items-center justify-between px-6 md:px-8 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-1000 max-w-1200px mx-auto"
    >
      <h1 class="text-xl font-bold">🌲 Sapling</h1>
      <div>
        <a
          href="https://github.com/withsapling/sapling"
          class="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <iconify-icon icon="mdi:github" style="color: white;"></iconify-icon>
          <span>Star</span>
          <iconify-icon
            icon="material-symbols:north-east"
            style="color: white;"
          ></iconify-icon>
        </a>
      </div>
    </nav>
  `;
}

router.get("/", async () => {
  return render(
    await Layout({
      unoConfig: config,
      head: html`
        <title>Sapling - Modern JavaScript Framework</title>
        <meta
          name="description"
          content="Sapling is a modern JavaScript framework for building fast and scalable websites with ease."
        />
        <script
          src="https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/dist/iconify-icon.min.js"
          defer
        ></script>
        <style>
          @keyframes gradient {
            0% {
              transform: rotate(0deg) scale(1.5);
            }
            100% {
              transform: rotate(360deg) scale(1.5);
            }
          }
          .hero-gradient {
            max-width: 1200px; /* Set a maximum width */
            margin: 0 auto; /* Center the hero section */
            position: relative;
          }
          .hero-gradient::before {
            content: "";
            position: absolute;
            height: 150%; /* Increase size */
            width: 150%; /* Increase size */
            top: -25%; /* Adjust position */
            left: -25%; /* Adjust position */
            background: conic-gradient(
              from 0deg,
              rgba(255, 75, 69, 0.2),
              rgba(255, 167, 35, 0.2),
              rgba(71, 233, 198, 0.2),
              rgba(28, 232, 255, 0.2),
              rgba(75, 87, 255, 0.2),
              rgba(255, 75, 69, 0.2)
            );
            animation: gradient 20s linear infinite;
            z-index: -2;
          }
          .hero-gradient::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 1) 100%
            );
            z-index: -1;
          }
          .mesh-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='mesh' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(0, 0, 0, 0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23mesh)'/%3E%3C/svg%3E");
            position: absolute;
            inset: 0;
            z-index: -1;
            opacity: 0.3;
          }
        </style>
      `,
      bodyClass: "bg-white text-gray-900 font-sans min-h-screen",
      children: html`
        <div class="relative z-10">
          ${renderNav()}

          <main>
            <div
              class="relative h-[70vh] max-h-[600px] flex items-center justify-center px-6 pb-4 overflow-hidden hero-gradient"
            >
              <div class="mesh-pattern"></div>
              <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                  Stupid Simple Websites.
                </h2>
                <p class="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
                  We felt like modern web frameworks are often doing too much if
                  you just want to build a simple, fast website. That's why we
                  built Sapling.
                </p>
                <div class="flex gap-4 justify-center">
                  <div
                    class="relative bg-gray-900 text-white pt-3 pb-3 pl-3 pr-2 rounded-lg font-medium flex items-center justify-between"
                  >
                    <span class="mr-2"
                      >› deno -A jsr:@sapling/create</span
                    >
                    <button
                      id="copy-button"
                      class="p-2"
                      aria-label="Copy command to clipboard"
                      onclick="copyToClipboard('deno -A jsr:@sapling/create')"
                    >
                      <iconify-icon
                        class="flex"
                        id="copy-icon"
                        icon="ic:baseline-content-copy"
                        style="color: white;"
                      ></iconify-icon>
                    </button>
                  </div>
                </div>
                <script>
                  function copyToClipboard(text) {
                    navigator.clipboard.writeText(text).then(
                      () => {
                        const icon = document.getElementById("copy-icon");
                        icon.setAttribute("icon", "mdi:check");
                        setTimeout(() => {
                          icon.setAttribute("icon", "ic:baseline-content-copy");
                        }, 2000);
                      },
                      (err) => {
                        console.error("Could not copy text: ", err);
                      }
                    );
                  }
                </script>
              </div>
            </div>

            <!-- New Section -->
            <div class="bg-white py-8 px-4 text-center">
              <div class="max-w-4xl mx-auto">
                <h3 class="text-2xl font-semibold text-gray-800">
                  Don't believe us? This entire website is 282 lines of code in a single file.
                </h3>
                <a
                  href="https://dash.deno.com/playground/sapling-playground-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex mt-4 bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
                >
                  <span>Open in Playground</span>
                  <iconify-icon
                    icon="material-symbols:north-east"
                    style="color: white;"
                  ></iconify-icon>
                </a>
              </div>
            </div>

            <div class="max-w-4xl mx-auto px-8 py-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div
                  class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
                >
                  <h3 class="text-2xl font-semibold mb-4">
                    Zero JavaScript By Default 🙅‍♂️
                  </h3>
                  <p class="text-lg text-gray-600">
                    Just like Astro and 11ty, Sapling doesn't ship any
                    JavaScript to your users. Just HTML, CSS, and JavaScript.
                  </p>
                </div>
                <div
                  class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
                >
                  <h3 class="text-2xl font-semibold mb-4">
                    Lightning Fast ⚡️
                  </h3>
                  <p class="text-lg text-gray-600">
                    Built with performance in mind, Sapling delivers exceptional
                    speed out of the box.
                  </p>
                </div>
                <div
                  class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
                >
                  <h3 class="text-2xl font-semibold mb-4">Modern 💻</h3>
                  <p class="text-lg text-gray-600">
                    Write modern TypeScript, Tailwind CSS (via UnoCSS), and
                    HTML. Sapling is SSR by default.
                  </p>
                </div>
                <div
                  class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
                >
                  <h3 class="text-2xl font-semibold mb-4">Scalable 📈</h3>
                  <p class="text-lg text-gray-600">
                    Designed to scale from a single file (like this one) to a multi-page website.
                  </p>
                </div>
                <div
                  class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
                >
                  <h3 class="text-2xl font-semibold mb-4">Built for Deno 🦕</h3>
                  <p class="text-lg text-gray-600">
                    We love Deno. We think it's the future of JavaScript and
                    TypeScript so we built Sapling from the ground up for it.
                  </p>
                </div>
                <div
                  class="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all"
                >
                  <h3 class="text-2xl font-semibold mb-4">No Lock-In 🔒</h3>
                  <p class="text-lg text-gray-600">
                    We don't think you should be locked into one specific
                    framework. If you want to switch to Astro, Next, Remix, etc.
                    you can. Just take your HTML with Tailwind styles and go.
                  </p>
                </div>
              </div>
            </div>

            <footer class="bg-white text-gray-900 py-12">
              <div class="max-w-4xl mx-auto px-8 text-center">
                <div class="flex justify-center space-x-4 mb-4">
                  <a
                    href="https://github.com/withsapling/sapling"
                    class="hover:text-gray-600"
                    aria-label="GitHub"
                  >
                    <iconify-icon icon="mdi:github" width="24"></iconify-icon>
                  </a>
                  <a href="#" class="hover:text-gray-600" aria-label="X">
                    <iconify-icon
                      icon="tabler:brand-x"
                      width="24"
                    ></iconify-icon>
                  </a>
                  <a href="#" class="hover:text-gray-600" aria-label="YouTube">
                    <iconify-icon icon="mdi:youtube" width="24"></iconify-icon>
                  </a>
                </div>
              </div>
            </footer>
          </main>
        </div>
      `,
    })
  );
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: async (req) => await router.handle(req) ?? new Response(null, { status: 404 }),
});
