// this is a node module that vite will bundle
import confetti from "canvas-confetti";

globalThis.onload = () => {
  confetti({
    spread: 180,
    particleCount: 200,
    origin: {
      y: 0.5,
    },
  });
};

let count = 0;

console.log("index");
const confettiButton = document.querySelector("#confettiButton");
const countButton = document.querySelector("#countButton");
const countElement = document.querySelector("#count");

countButton?.addEventListener("click", () => {
  console.log("count");
  count++;
  if (countElement) {
    countElement.textContent = count.toString();
  }
});

confettiButton?.addEventListener("click", () => {
  console.log("confetti");
  confetti();
});
