import React from 'react'
import { register } from 'web-react-components';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div onClick={this.props.customEvent}>
            <p>React Component</p>
            <a>Hello, world!</a>
            <h2>Counter = {this.props.mytext}</h2>
        </div>)
    }
}

register(
    App,
    'react-hello-world',
    ['mytext'],
    {customEvent: () => new Event('custom-event', { bubbles: true })}
    );