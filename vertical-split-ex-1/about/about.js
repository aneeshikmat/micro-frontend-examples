class About extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="background: #333; color: white; height: 100px; display: flex; align-items: center; justify-content: center;">
        <h1>About MFE - 2nees.com</h1>
      </div>
    `;
  }
}
customElements.define('mfe-about', About);