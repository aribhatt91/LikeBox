import React, {Component} from 'react';
import Page from './pages/Page';

class Products extends Page {
  // componentDidMount(){
  //   if(window.dataLayer){
  //     window.dataLayer.pageName = "Products";
  //     window.dataLayer.pageMbox = "mbox-products";
  //   }
  //   var event = new CustomEvent("react-view-change", {detail: {view: "Products", mbox: "mbox-products"}});
  //   document.dispatchEvent(event);
  // }

  render() {
    return (<div className="products-section">

        <p className="products-title">Default List of Products</p>
        <ul className="productList">
          <li>Product One</li>
          <li>Product Two</li>
          <li>Product Three</li>
          <li>Product Four</li>
        </ul>

    </div>);
  }
}

export default Products;
