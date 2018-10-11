import React, { Component } from 'react';
import ReactCanvasNest from '../';
import './style';

class App extends Component {
    constructor() {
        super();
        this.state = {
            follow: true
        }
    }
    render() {
        const { follow } = this.state;
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <button onClick={() => {
                    this.setState({
                        follow: !follow
                    })
                }} className='followBtn'>{ follow ? 'Stop' : 'Start' } Follow</button>
                <ReactCanvasNest className='canvasNest' config = {{ follow }} />
            </div>

        )
    }
}

export default App;