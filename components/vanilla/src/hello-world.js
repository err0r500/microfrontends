// this code looks pretty ugly and subject to memory leaks (events not removed)

class HelloWorld extends HTMLElement {
    constructor() {
        super();

        const shadowRootEl = this.attachShadow({mode: 'open'});
        shadowRootEl.innerHTML = `
            <div style="background-color: #F6B192">
                <h2>Vanilla</h2>
                <ul id="list"></ul>
                <button id="increment">Click me to increment by 1</button>
                <p>Counter = <span class="status"/></p>
            </div>`;
    }

    static get observedAttributes() {
        return ['counter-value', 'checklist-value'];
    }

    connectedCallback() {
        let _this = this;

        this.shadowRoot.querySelector('#increment').addEventListener('click', function () {
            _this.dispatchEvent(new CustomEvent("counter-event", {
                bubbles: true,
                cancelable: false,
            }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let _this = this;
        if (newValue === oldValue) {
            return
        }

        switch (name) {
            case 'counter-value':
                this.shadowRoot.querySelector('.status').innerHTML = newValue;
                break;
            case 'checklist-value':
                this.shadowRoot.querySelector('#list').innerHTML = '';
                let list = JSON.parse(newValue);
                list.forEach((e, i) => {
                        const listE = document.createElement("li");
                        listE.innerHTML = e;
                        listE.addEventListener('click', function () {
                            _this.dispatchEvent(new CustomEvent("delete-item", {
                                bubbles: true,
                                cancelable: false,
                                detail:[i],
                            }));
                        });

                        this.shadowRoot.querySelector('#list').appendChild(listE);
                    }
                );
                break;
        }
    }
}

window.customElements.define('vanilla-hello-world', HelloWorld);
