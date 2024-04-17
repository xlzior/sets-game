import { type CSSResult, LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("game-card")
class GameCard extends LitElement {
	static styles: CSSResult = css`
		div {
			border: 2px solid #ddd;
			border-radius: 10px;
		}
		img {
			width: 100%;
			height: 100%;
		}
	`;

	@property()
	card: Card = "red-circle-filled";

	render() {
		return html`
      <div>
				<img src="assets/${this.card}.svg" alt="${this.card}" />
      </div>
    `;
	}
}

customElements.define("game-card", GameCard);
