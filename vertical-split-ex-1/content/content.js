class MFEContent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="background: #f0f0f0; padding: 20px; border-radius: 5px;">
        <h2>2nees.com Content Micro Frontend</h2>
        <p>This is the content section of our micro frontend application.</p>
        <p>It's loaded dynamically when the user navigates to the /#content route.</p>
      </div>
    `;
  }
}
customElements.define('mfe-content', MFEContent);