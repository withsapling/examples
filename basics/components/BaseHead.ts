import { html } from "jsr:@hono/hono/html";

export function BaseHead({
  title = "Treefarm Studio",
  description = "Treefarm is a design and development studio owned and operated by Jaydan Urwin",
}) {
  return html`
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta property="og:image" content="/social.png" />
    <style>
      @font-face {
        font-display: swap;
        font-family: "Open Sans";
        src: url("/assets/fonts/OpenSans-Variable.woff2") format("woff2"),
          url("/assets/fonts/OpenSans-Variable.woff") format("woff");
        font-weight: 400 800;
        font-style: normal;
      }
      @font-face {
        font-display: swap;
        font-family: "Clash Display";
        src: url("/assets/fonts/ClashDisplay-Variable.woff2")
            format("woff2"),
          url("/assets/fonts/ClashDisplay-Variable.woff") format("woff");
        font-weight: 400 800;
        font-style: normal;
      }
      :root {
        --color-primary: #000;
        --color-on-primary: #fff;
        --color-secondary: #fff;
      }
      ::selection {
        background-color: var(--color-primary);
        color: var(--color-on-primary);
      }
    </style>
  `;
}
