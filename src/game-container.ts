import { type CSSResult, LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./game-card";
import {
  type SelectableCard,
  deselectCard,
  initialiseState,
  selectCard,
  toggleCard,
} from "./game-state";
import { shuffle } from "./model";

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
  cards: SelectableCard[] = initialiseState();

  constructor() {
    super();
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleClick(index: number) {
    this.cards = toggleCard(this.cards, index);
  }

  shortcuts = {
    y: 0,
    u: 1,
    i: 2,
    h: 3,
    j: 4,
    k: 5,
    b: 6,
    n: 7,
    m: 8,
  };

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === " ") {
      this.cards = shuffle(this.cards);
    } else if (this.shortcuts[event.key] !== undefined) {
      this.cards = selectCard(this.cards, this.shortcuts[event.key]);
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (this.shortcuts[event.key] !== undefined) {
      this.cards = deselectCard(this.cards, this.shortcuts[event.key]);
    }
  }

  render() {
    return html`
    <main>
      <h1>Sets</h1>
      <div>
        ${this.cards.map(
          (card, i) => html`
						<game-card
							.card=${card.name}
							?selected=${card.selected}
							@click=${() => this.handleClick(i)}
						>
						</game-card>`,
        )}
      </div>
    </main>
    `;
  }
}
