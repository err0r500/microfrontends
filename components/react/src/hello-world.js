import React from 'react'
import { register } from 'web-react-components';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div style={{backgroundColor: "#355E7C"}}>
            <h2>React</h2>
            <button onClick={this.props.customEvent}>Click me to increment by 100</button>
            <p>Counter = {this.props.countervalue}</p>
        </div>)
    }
}

register(
    App,
    'react-hello-world',
    ['countervalue'],
    {customEvent: () => new Event('custom-event', { bubbles: true })}
    );