import React, {Component} from 'react';
import createTargetComponent from '@adobe/target-react-component';
import Page from './../Page';

let Target = createTargetComponent(React);
class Product extends Page {
  // componentDidMount(){
  //   if(window.dataLayer){
  //     window.dataLayer.pageName = "Product";
  //     window.dataLayer.pageMbox = "mbox-products";
  //   }
  //   var event = new CustomEvent("react-view-change", {detail: {view: "Products", mbox: "mbox-products"}});
  //   document.dispatchEvent(event);
  // }

  render() {
    return (<div className="product-section">

        <p className="product-title">Default List of Products</p>
        <ul className="productList">
          <li>Product One</li>
          <li>Product Two</li>
          <li>Product Three</li>
          <li>Product Four</li>
        </ul>

    </div>);
  }
}

export default Product;
