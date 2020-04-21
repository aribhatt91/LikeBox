import React, {Component} from 'react';
import Page from './pages/Page';

class Sellers extends Page {

  render() {
    return (<div className="sellers-section">
      <p className="sellers-title">Default List of Sellers</p>
      <ul className="sellerList">
        <li>Seller One</li>
        <li>Seller Two</li>
        <li>Seller Three</li>
        <li>Seller Four</li>
      </ul>
    </div>);
  }
}

export default Sellers;
