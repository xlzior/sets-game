import { type CSSResult, LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Card } from "./model";
import type { SelectableCard } from "./view-controller";

@customElement("game-card")
class GameCard extends LitElement {
	static styles: CSSResult = css`
		div {
			border: 4px solid #ddd;
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

	@property({ type: Object })
	card: SelectableCard = { name: "red-square-filled", selected: false };

	render() {
		return html`
      <div class=${this.card.selected ? "selected" : ""}>
				<img src="assets/${this.card.name}.svg" alt="${this.card.name}" />
      </div>
    `;
	}
}
