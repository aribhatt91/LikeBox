import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
// import createTargetComponent from '@adobe/target-react-component';
// import BookList from '../containers/book_list';
// import BookDetail from '../containers/book_detail';
import './components.css';

class SideNav extends Component {

  componentWillMount(){
  }

  componentDidMount(){
    //var event = new CustomEvent("react-view-change", {detail: {view: "Home", mbox: "mbox-home"}});
    //document.dispatchEvent(event);
  }

  render() {
    return (
      <div className="sidenav">
        <NavLink activeClassName='active' exact={true} to="/" >Home</NavLink>
        <NavLink activeClassName='active' to="/products">Products</NavLink>
        <NavLink activeClassName='active' to="/sellers">Sellers</NavLink>
        <NavLink activeClassName='active' to="/about">About</NavLink>
      </div>
    );
  }
}

export default SideNav;
