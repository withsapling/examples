import { Sapling, html, Layout } from "@sapling/sapling";
import { GoogleGenerativeAI } from "@google/generative-ai";

const site = new Sapling();

const genAI = new GoogleGenerativeAI(Deno.env.get("GEMINI_API_KEY") || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateTweet(topic: string) {
  const prompt = `Write a short, engaging tweet about ${topic}. Keep it under 280 characters. No hashtags unless asked.`;
  const chatSession = model.startChat();
  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

site.get("/", async (c) => {
  return c.html(
    await Layout({
      head: html`
        <title>Tweet Generator</title>
        <script src="https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/dist/iconify-icon.min.js" defer></script>
        <style>
          .dot-grid {
            background-image: 
              radial-gradient(circle at top left, transparent 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 100%),
              linear-gradient(to right, #ffffff1a 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff1a 1px, transparent 1px);
            background-size: 100% 100%, 40px 40px, 40px 40px;
          }
          .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        </style>
        <script defer>
          async function generate() {
            const topic = document.getElementById('topic').value;
            const result = document.getElementById('result');
            result.classList.remove('hidden');
            result.querySelector('.flex-1').textContent = 'Generating...';
            
            const response = await fetch('/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topic })
            });
            const { tweet } = await response.json();
            result.querySelector('.flex-1').textContent = tweet;

            const copyBtn = document.getElementById('copyBtn');
            copyBtn.classList.remove('hidden');
          }

          async function copyTweet() {
            const result = document.getElementById('result');
            await navigator.clipboard.writeText(result.querySelector('.flex-1').textContent);
            
            const copyBtn = document.getElementById('copyBtn');
            copyBtn.innerHTML = '<iconify-icon icon="mdi:check"></iconify-icon>';

            // Show toast notification
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg';
            toast.textContent = 'Tweet copied to clipboard!';
            document.body.appendChild(toast);
            
            setTimeout(() => {
              copyBtn.innerHTML = '<iconify-icon icon="mdi:content-copy"></iconify-icon>';
              toast.remove();
            }, 2000);
          }
        </script>
      `,
      bodyClass: "bg-black text-white min-h-screen dot-grid",
      children: html`
        <main class="max-w-screen-lg mx-auto px-8 py-16 flex flex-col items-center justify-center min-h-screen gap-8">
          <div class="glass rounded-xl p-8 max-w-2xl w-full">
            <input type="text" id="topic" class="w-full bg-zinc-900 p-6 rounded-2xl text-gray-400 text-xl focus:outline-none" placeholder="Enter your tweet topic" onkeydown="if (event.keyCode === 13) { generate(); return false; }">
            <button onclick="generate()" class="w-full mt-4 bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              Generate Tweet <iconify-icon icon="mdi:sparkles"></iconify-icon>
            </button>
          </div>

          <div class="w-full max-w-2xl">
            <div id="result" class="p-6 bg-zinc-900 rounded-2xl text-gray-400 text-xl hidden flex items-center justify-between gap-4">
              <div class="flex-1"></div>
              <button onclick="copyTweet()" id="copyBtn" class="hidden p-3 rounded-lg transition-colors text-gray-200">
                <iconify-icon icon="mdi:content-copy"></iconify-icon>
              </button>
            </div>
          </div>
        </main>
      `,
    })
  );
});

site.post("/generate", async (c) => {
  const { topic } = await c.req.json();
  const tweet = await generateTweet(topic || "technology");
  return c.json({ tweet });
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});

