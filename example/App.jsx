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
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <button onClick={() => {
                    this.setState({
                        follow: !this.state.follow
                    })
                }} style={{ position: "absolute" }}>Stop Follow</button>
                <ReactCanvasNest className='test' follow={this.state.follow} />
            </div>

        )
    }
}

export default App;