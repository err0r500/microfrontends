class HelloWorld extends HTMLElement {
    constructor() {
        super();

        const shadowRootEl = this.attachShadow({mode: 'open'});
        shadowRootEl.innerHTML = `
            <div style="background-color: #F6B192">
                <h2>Vanilla</h2>
                <button id="increment">Click me to increment by 1</button>
                <p>Counter = <span class="status"/></p>
            </div>`;
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

        switch (name) {
            case 'counter-value':
                this.shadowRoot.querySelector('.status').innerHTML = newValue
        }
    }
}

window.customElements.define('vanilla-hello-world', HelloWorld);
