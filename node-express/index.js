import express from 'express';
import { html, Layout } from '@sapling/sapling';

const app = express();

app.get('/', async (req, res) => {
  const time = new Date().toLocaleTimeString();
  const page = await Layout({
    head: html` <title>Hello World 🌍</title> `,
    children: html`
      <div class="flex flex-col justify-center items-center h-screen gap-4 text-center">
        <h1 class="text-6xl font-bold">Hello World 🌍</h1>
        <p class="text-2xl">
          This is a site using
          <a class="text-blue-500 hover:underline" href="https://sapling.build">Sapling</a>,
          <a class="text-blue-500 hover:underline" href="https://expressjs.com">Express</a>, and
          <a class="text-blue-500 hover:underline" href="https://nodejs.org">Node.js</a>
        </p>
        <p class="text-base font-mono text-gray-500">
          It was server rendered at ${time}
        </p>
      </div>
    `,
  });
  // set content type to html
  res.set('Content-Type', 'text/html');
  // remove whitespace and newlines
  res.send(page.toString().trim());
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});


