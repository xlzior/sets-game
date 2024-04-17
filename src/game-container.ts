import { type CSSResult, LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./game-card";
import { type Card, drawNCardsWithSet, shuffle } from "./model";
import type { SelectableCard } from "./view-controller";

@customElement("game-container")
class GameContainer extends LitElement {
	static styles: CSSResult = css`
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
		div {
      max-width: 600px;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, 1fr);
			gap: 10px;
		}
	`;

	@state()
	cards: SelectableCard[] = [];

	constructor() {
		super();
		window.addEventListener("keydown", this.handleKeyDown.bind(this));
		window.addEventListener("keyup", this.handleKeyUp.bind(this));
		this.cards = drawNCardsWithSet(9).map((card) => ({
			name: card,
			selected: false,
		}));
	}

	handleKeyDown(event: KeyboardEvent) {
		if (event.key === " ") {
			this.cards = shuffle(this.cards);
		}
	}

	handleKeyUp(event: KeyboardEvent) {}

	toggleCard(index: number) {
		this.cards = this.cards.map((card, i) =>
			i === index ? { ...card, selected: !card.selected } : card,
		);
	}

	selectCard(index: number) {
		this.cards = this.cards.map((card, i) =>
			i === index ? { ...card, selected: true } : card,
		);
	}

	deselectCard(index: number) {
		this.cards = this.cards.map((card, i) =>
			i === index ? { ...card, selected: false } : card,
		);
	}

	render() {
		return html`
    <main>
      <h1>Sets</h1>
      <div>
        ${this.cards.map(
					(card, i) =>
						html`
              <game-card
                .card=${card}
                @click=${() => this.toggleCard(i)}
              >
              </game-card>`,
				)}
      </div>
    </main>
    `;
	}
}
