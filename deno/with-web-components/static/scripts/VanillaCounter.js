class VanillaCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;

    // Attach shadow DOM
    this.attachShadow({ mode: "open" });

    // Define the template
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, sans-serif;
        }
        .counter {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background: #4CAF50;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background: #45a049;
        }
      </style>
      <div class="counter">
        <button id="decrement">-</button>
        <span id="count">${this.count}</span>
        <button id="increment">+</button>
      </div>
    `;

    // Bind event handlers
    this.incrementBtn = this.shadowRoot.getElementById("increment");
    this.decrementBtn = this.shadowRoot.getElementById("decrement");
    this.countDisplay = this.shadowRoot.getElementById("count");

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  connectedCallback() {
    this.incrementBtn.addEventListener("click", this.increment);
    this.decrementBtn.addEventListener("click", this.decrement);
  }

  disconnectedCallback() {
    this.incrementBtn.removeEventListener("click", this.increment);
    this.decrementBtn.removeEventListener("click", this.decrement);
  }

  increment() {
    this.count++;
    this.updateDisplay();
  }

  decrement() {
    this.count--;
    this.updateDisplay();
  }

  updateDisplay() {
    this.countDisplay.textContent = this.count;
  }
}

// Register the custom element
customElements.define("vanilla-counter", VanillaCounter);
