import { type CSSResult, LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Card } from "./model";

@customElement("game-card")
class GameCard extends LitElement {
  static styles: CSSResult = css`
		div {
			cursor: pointer;
			border: 4px solid var(--accent-colour);
			border-radius: 10px;
		}
		div.selected {
			border-color: #fd0;
		}

		img {
			width: 100%;
			height: 100%;
		}
	`;

  @property()
  card: Card = "red-square-filled";

  @property({ type: Boolean })
  selected = false;

  render() {
    return html`
      <div class=${this.selected ? "selected" : ""}>
				<img src="assets/${this.card}.svg" alt="${this.card}" />
      </div>
    `;
  }
}
