import React from 'react'
import {register} from 'web-react-components';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const checklist = this.props.checklistvalue.map((item, index) =>
            <li key={item.toString()} onClick={() => this.props.deleteItem(index)}>
                {item}
            </li>
        );

        return (<div style={{backgroundColor: "#355E7C"}}>
            <h2>React</h2>
            <ul>{checklist}</ul>
            <button onClick={this.props.customEvent}>Click me to increment by 100</button>
            <p>Counter = {this.props.countervalue}</p>
        </div>)
    }
}

register(
    App,
    'react-hello-world',
    ['countervalue', 'checklistvalue'],
    {
        customEvent: () => new Event('custom-event', {bubbles: true}),
        deleteItem: (indexToDelete) => new CustomEvent('delete-item', {bubbles: true, detail: [indexToDelete]}) // as an array, just in order to use the same event format as Vue (totally optional)
    }
);