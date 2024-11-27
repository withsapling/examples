import { animate } from "https://cdn.jsdelivr.net/npm/framer-motion@11.11.11/dom/+esm";

animate(
  ".box",
  { rotate: 90 },
  { type: "spring", repeat: Infinity, repeatDelay: 0.2 }
);

document.body.style.setProperty(
  "--accent",
  `var(--hue-${Math.ceil(Math.random() * 7) - 1})`
);
