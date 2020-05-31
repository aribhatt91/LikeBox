import React, {Component} from 'react';
import Home from './pages/Home';
import About from './pages/About';
import {Route, Switch} from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ListingPage from './pages/ListingPage';

class AppBody extends Component {
  render() {
    return (<div className="App-body">
      <Switch>
        <Route exact path='/' render={(props) => <Home {...props} pageName="home" />}/>
        <Route path='/products/:category' render={(props) => <ListingPage {...props} pageName="listing" />}/>
        <Route path='/product/:id' render={(props) => <ProductPage {...props} pageName="product" />}/>
        <Route path='/about' render={(props) => <About {...props} pageName="about" />}/>
      </Switch>
    </div>);
  }
}

export default AppBody;
