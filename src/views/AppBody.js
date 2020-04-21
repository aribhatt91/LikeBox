import React, {Component} from 'react';
import Products from './Products';
import Home from './Home';
import Sellers from './Sellers';
import About from './About';
import {Route, Switch} from 'react-router-dom';
import Product from './pages/products/Product';

class AppBody extends Component {
  render() {
    return (<div className="App-body">
      <Switch>
        <Route exact path='/' render={(props) => <Home {...props} pageName="home" />}/>
        <Route path='/products' render={(props) => <Products {...props} pageName="products" />}/>
        <Route path='/sellers' render={(props) => <Sellers {...props} pageName="sellers" />}/>
        <Route path='/about' render={(props) => <About {...props} pageName="about" />}/>
      </Switch>
    </div>);
  }
}

export default AppBody;
