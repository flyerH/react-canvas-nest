import React, { Component } from 'react';
import ReactCanvasNest from '../';
import './style';

class App extends Component {
    render() {
        return (
            <div className='app'>
                <ReactCanvasNest />
            </div>
        )
    }
}

export default App;