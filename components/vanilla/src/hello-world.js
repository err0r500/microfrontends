class HelloWorld extends HTMLElement {
    constructor() {
        super();

        const shadowRootEl = this.attachShadow({mode: 'open'});
        shadowRootEl.innerHTML = `<div>
        <h2>Vanilla</h2>
        <button id="increment">Click me to increment by 1</button>
        <p>Counter = <span class="status"/></p>
        </div>`;

        if (!this.hasAttribute('counter-value')) {
            this.updateContent("hey I'm the default text");
        }
    }

    static get observedAttributes() {
        return ['counter-value'];
    }

    connectedCallback() {
        let _this = this;

        this.shadowRoot.querySelector('#increment').addEventListener('click', function () {
            _this.dispatchEvent(new CustomEvent("customEvent", {
                bubbles: true,
                cancelable: false,
            }));
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return
        }

        if (name === 'counter-value') {
            this.updateContent(newValue)
        }
    }

    updateContent(newContent) {
        this.shadowRoot.querySelector('.status').innerHTML = newContent
    }
}

window.customElements.define('wc-hello-world', HelloWorld);
