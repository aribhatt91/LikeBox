import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './components.css';

class Header extends Component {
  render() {
    return (
    <header className="App-header">
      <div className="topnav">
        <NavLink activeClassName='active' exact={true} to="/" >Home</NavLink>
        <NavLink activeClassName='active' to="/products">Products</NavLink>
        <NavLink activeClassName='active' to="/sellers">Sellers</NavLink>
        <NavLink activeClassName='active' to="/about">About</NavLink>
      </div>
    </header>);
  }
}

export default Header;
