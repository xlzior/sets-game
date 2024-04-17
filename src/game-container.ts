import { type CSSResult, LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./game-card";
import { GameState } from "./game-state";
import { drawNCardsWithSet, isSet, shuffle } from "./model";

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
	state: GameState = new GameState();

	constructor() {
		super();
		window.addEventListener("keydown", this.handleKeyDown.bind(this));
		window.addEventListener("keyup", this.handleKeyUp.bind(this));
	}

	handleClick(index: number) {
		this.state.toggleCard(index);
		this.requestUpdate();
	}

	handleKeyDown(event: KeyboardEvent) {
		if (event.key === " ") {
			this.state.shuffle();
			this.requestUpdate();
		}
	}

	handleKeyUp(event: KeyboardEvent) {}

	render() {
		return html`
    <main>
      <h1>Sets</h1>
      <div>
        ${this.state.cards.map(
					(card, i) => html`
						<game-card
							.card=${card}
							@click=${() => this.handleClick(i)}
						>
						</game-card>`,
				)}
      </div>
    </main>
    `;
	}
}
