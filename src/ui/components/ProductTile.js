import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class ProductTile extends Component {
  render() {
    return (
        <NavLink activeClassName='active' exact={true} to="/" >Home</NavLink>
    );
  }
}

export default ProductTile;
