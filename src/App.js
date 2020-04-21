import React, { Component } from 'react';
import './views/App.css';
import Header from './views/components/Header';
import AppBody from './views/AppBody';

class App extends Component {
    render() {
        return ( <div className="App">
                <Header/>
                <AppBody/>
            </div>);
    }
}

export default App;