import React from 'react'
import ReactDOM from 'react-dom'

class Clock extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        console.log('Click happened');
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <p>React Component</p>
                <a>Hello, world!</a>
                <h2>It is {this.props.mytext}.</h2>
            </div>
        );
    }
}

class HelloWorldReact extends HTMLElement {
    constructor() {
        super();
        this.state = {
            mytext: "default text"
        };

        this.mountPoint = document.createElement('div');
        this.attachShadow({mode: 'open'}).appendChild(this.mountPoint);
    }

    static get observedAttributes() {
        return ['mytext'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return
        }

        switch (name) {
            case "mytext":
                this.state.mytext = newValue;
                break;
            default:
                return
        }

        ReactDOM.render(<Clock mytext={this.state.mytext}/>, this.mountPoint);
    }

    handleClick() {
        console.log('Click happened');
    }

    connectedCallback() {
        ReactDOM.render(
            React.createElement(Clock, {
                mytext: this.state.mytext,
            }), this.mountPoint);
    }
}

window.customElements.define('react-hello-world', HelloWorldReact);
