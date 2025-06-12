class ComponentChatWidget extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.platformVersion = this.getAttribute('platform-version') || 'v1';
  }

  static get observedAttributes() {
    return ['platform-version'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'platform-version' && oldValue !== newValue) {
      this.platformVersion = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  #headingBlock() {
    return `<h1 class="heading-style">Our Chat Widget (${this.platformVersion})</h1>`;
  }

  #V1Component() {
    return `
        <div style="background: blueviolet; color: white; display: flex; align-items: center; justify-content: center; gap: 16px">
          ${this.#headingBlock()}
          <textarea rows="4"></textarea>
          <button style="background: #124281; color: white;">Ask Me...</button>
        </div>
      `;
  }

  #V2Component(){
    return `
        <div style="background: #4a90e2; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; border-radius: 8px;gap: 16px">
          ${this.#headingBlock()}
          <textarea style="width: 80%; border-radius: 4px; min-height: 100px"></textarea>
          <button style="margin-top: 5px; padding: 5px 10px; background: #2ecc71; color: white; border: none; border-radius: 4px;">Send</button>
        </div>
      `;
  }

  render() {
    let content;

    // تخيل هذه وكأنها api version ستقوم بجلب bundled معين ^^
    if (this.platformVersion === 'v1') {
      content = this.#V1Component();
    } else if (this.platformVersion === 'v2') {
      content = this.#V2Component();
    } else {
      content = `
        <div style="background: #e74c3c; color: white; height: 100px; display: flex; align-items: center; justify-content: center;">
          <h1 class="heading-style">Unknown Version: ${this.platformVersion}</h1>
        </div>
      `;
    }

    this.shadow.innerHTML = content;
  }
}
customElements.define('mfe-chat-widget', ComponentChatWidget);
