import React, { Component } from 'react';
import Header from './ui/components/Header';
import AppBody from './ui/AppBody';
import Footer from './ui/components/Footer';

class App extends Component {
    render() {
        return ( 
            <div className="App">
                <Header user={this.state}/>
                <AppBody/>
                <Footer></Footer>
            </div>);
    }
}

export default App;