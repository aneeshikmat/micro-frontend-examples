class ComponentWithoutShadow extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="background: #333; color: white; height: 100px; display: flex; align-items: center; justify-content: center;">
        <h1 class="heading-style">Custom Web Component Without Shadow</h1>
      </div>
    `;
  }
}
customElements.define('mfe-without-shadow', ComponentWithoutShadow);