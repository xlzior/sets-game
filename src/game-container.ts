import { type CSSResult, LitElement, css, html } from "lit";

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

	render() {
		return html`
    <main>
      <h1>Sets</h1>
      <div>
        <game-card card="blue-circle-filled"></game-card>
        <game-card card="green-square-filled"></game-card>
        <game-card card="red-triangle-filled"></game-card>
        <game-card card="green-circle-striped"></game-card>
        <game-card card="blue-square-striped"></game-card>
        <game-card card="red-triangle-striped"></game-card>
        <game-card card="red-circle-outlined"></game-card>
        <game-card card="green-square-outlined"></game-card>
        <game-card card="blue-triangle-outlined"></game-card> 
      </div>
    </main>
    `;
	}
}

customElements.define("game-container", GameContainer);
