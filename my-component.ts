import { type CSSResult, LitElement, css, html } from "lit";

class MyComponent extends LitElement {
	static styles: CSSResult = css`
    :host {
      display: block;
      padding: 20px;
      background-color: lightblue;
    }
  `;

	render() {
		return html`
      <div>
        <h1>Hello Lit with TypeScript!</h1>
        <p>This is my Lit component written in TypeScript.</p>
      </div>
    `;
	}
}

customElements.define("my-component", MyComponent);
