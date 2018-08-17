class HelloWorld extends HTMLElement {
    constructor() {
        super();

        const shadowRootEl = this.attachShadow({mode: 'open'});
        shadowRootEl.innerHTML = `<div class="status">Hello World</div>`;

        this.hasAttribute('mytext') ? this.updateContent(this.getAttribute("mytext")) : this.updateContent("hey I'm the default text");

    }

    static get observedAttributes() {
        return ['mytext'];
    }

    connectedCallback() {
        let _this = this;

        this.shadowRoot.querySelector('.status').addEventListener('click', function () {
            _this.emitCustom()
        })
    }

    emitCustom() {
        this.dispatchEvent(new CustomEvent("byten", {
            bubbles: true,
            cancelable: false,
        }))
    }


    updateContent(newContent) {
        this.shadowRoot.querySelector('.status').innerHTML = newContent
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return
        }

        if (name === 'mytext') {
            this.updateContent(newValue)
        }
    }
}

window.customElements.define('hello-world', HelloWorld);
