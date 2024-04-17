import { type CSSResult, LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./game-card";
import { GameState } from "./game-state";

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
      this.state.shuffle();
      this.requestUpdate();
    } else if (this.shortcuts[event.key] !== undefined) {
      this.state.selectCard(this.shortcuts[event.key]);
      this.requestUpdate();
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (this.shortcuts[event.key] !== undefined) {
      this.state.deselectCard(this.shortcuts[event.key]);
      this.requestUpdate();
    }
  }

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
