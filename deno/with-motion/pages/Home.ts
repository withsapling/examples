import { Layout, html } from "@sapling/sapling";

export async function Home() {
  return await Layout({
    head: html`
    <link rel="stylesheet" href="styles.css" />
`,
    children: await html`
    <header>
    <h1>
      <a href="https://motion.dev" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="logo"
          viewBox="0 0 1260 454"
        >
          <path
            d="M475.753 0L226.8 453.6L0 453.6L194.392 99.4116C224.526 44.5081 299.724 0 362.353 0L475.753 0Z"
            stroke="none"
          ></path>
          <path
            d="M1031.93 113.4C1031.93 50.7709 1082.7 0 1145.33 0C1207.96 0 1258.73 50.7709 1258.73 113.4C1258.73 176.029 1207.96 226.8 1145.33 226.8C1082.7 226.8 1031.93 176.029 1031.93 113.4Z"
            stroke="none"
          ></path>
          <path
            d="M518.278 0L745.078 0L496.125 453.6L269.325 453.6L518.278 0Z"
            stroke="none"
          ></path>
          <path
            d="M786.147 0L1012.95 0L818.555 354.188C788.422 409.092 713.223 453.6 650.594 453.6L537.194 453.6L786.147 0Z"
            stroke="none"
          ></path>
        </svg>
        <pre>Springs</pre>
      </a>
    </h1>
    <button id="refresh" tabindex="0" onClick="window.location.reload();">
      <svg
        width="18"
        height="18"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-1.4 -0.6 18 18"
      >
        <path
          d="M12.8 5.1541V2.5a.7.7 0 0 1 1.4 0v5a.7.7 0 0 1-.7.7h-5a.7.7 0 0 1 0-1.4h3.573c-.7005-1.8367-2.4886-3.1-4.5308-3.1C4.8665 3.7 2.7 5.85 2.7 8.5s2.1665 4.8 4.8422 4.8c1.3035 0 2.523-.512 3.426-1.4079a.7.7 0 0 1 .986.9938C10.7915 14.0396 9.2186 14.7 7.5422 14.7 4.0957 14.7 1.3 11.9257 1.3 8.5s2.7957-6.2 6.2422-6.2c2.1801 0 4.137 1.1192 5.2578 2.8541z"
          fill="var(--accent)"
          fill-rule="nonzero"
        ></path>
      </svg>
    </button>
  </header>
  <main>
    <div class="box"></div>
  </main>
  <script src="./script.js" type="module"></script>
    `,
  });
}
