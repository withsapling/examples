import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class LitCounter extends LitElement {
  static styles = css`
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
      background: #4caf50;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background: #45a049;
    }
  `;

  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  render() {
    return html`
      <div class="counter">
        <button @click=${this._decrement}>-</button>
        <span>${this.count}</span>
        <button @click=${this._increment}>+</button>
      </div>
    `;
  }

  _increment() {
    this.count++;
  }

  _decrement() {
    this.count--;
  }
}

customElements.define("lit-counter", LitCounter);
