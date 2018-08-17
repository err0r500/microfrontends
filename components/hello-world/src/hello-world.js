window.addEventListener('WebComponentsReady', () => {
  class HelloWorld extends HTMLElement {
    constructor() {
      super();
      console.log("heyhey")
      const shadowRootEl = this.attachShadow({mode: 'open'});
      shadowRootEl.innerHTML = '<div>Hello World</div>';
    }
  }
  window.customElements.define('hello-world', HelloWorld);
});
