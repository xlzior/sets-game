import { type CSSResult, LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./game-card";
import {
  type SelectableCard,
  checkSet,
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
  private _cards: SelectableCard[] = initialiseState();

  @state()
  private _count = 0;

  constructor() {
    super();
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleClick(index: number) {
    this._cards = toggleCard(this._cards, index);
    this.checkSet();
  }

  shortcuts = Object.fromEntries(
    ["y", "u", "i", "h", "j", "k", "b", "n", "m"].map((key, i) => [key, i]),
  );

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === " ") {
      this._cards = shuffle(this._cards);
    } else if (this.shortcuts[event.key] !== undefined) {
      this._cards = selectCard(this._cards, this.shortcuts[event.key]);
      this.checkSet();
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (this.shortcuts[event.key] !== undefined) {
      this._cards = deselectCard(this._cards, this.shortcuts[event.key]);
    }
  }

  checkSet() {
    let success = false;
    [this._cards, success] = checkSet(this._cards);
    if (success) this._count++;
  }

  render() {
    return html`
    <main>
      <h1>Sets</h1>
			<p>${this._count} sets found</p>
      <div>
        ${this._cards.map(
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
