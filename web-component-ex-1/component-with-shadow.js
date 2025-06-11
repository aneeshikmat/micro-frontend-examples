class ComponentWithShadow extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadow.innerHTML = `
      <div style="background: blueviolet; color: white; height: 100px; display: flex; align-items: center; justify-content: center;">
        <h1 class="heading-style">Custom Web Component With Shadow</h1>
      </div>
    `;
  }
}
customElements.define('mfe-with-shadow', ComponentWithShadow);