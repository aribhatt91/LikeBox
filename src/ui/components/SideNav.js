import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

function SideNav(props){
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const signInPopup = (e) => {
    e.preventDefault(); 
    setSideNavOpen(false); 
    props.signIn();
  }
  return (
    <div className="d-sm-inline-block sideNav-container d-md-none">
      <a href="#" onClick={()=>{setSideNavOpen(true)}} className="hamburger">
        <FontAwesomeIcon icon={faBars}/>
      </a>
      <div className={"sideNav" + (sideNavOpen ? " slide-in" : "")} onScroll={(e)=>{e.stopPropagation()}}>
        <div className="sideNav_wrapper">

          <ul className="clean_list">
            <li key="0">
              <Link to="/products/men">Men</Link>
            </li>
            <li key="1">
              <Link to="/products/women">Women</Link>
            </li>
            <li key="2">
              <Link to="/products/kids">Kids</Link>
            </li>
            <li key="3">
              <Link to="/category/trending">Trending</Link>
            </li>
          </ul>
          <hr className="divider_small"></hr>
          {props.loggedIn && <ul className="clean_list personal_list_items">
            <li  key="0">
              <Link to="/user"> My account</Link>
            </li>
            <li key="1">
              <Link to="/user/wishlist">Wishlist</Link>
            </li>
            <li key="2">
              <Link to="/user/orders">My orders</Link>
            </li>
            <li key="3">
              <Link to="/user/payment-options">Payment options</Link>
            </li>
            <li key="4">
              <Link to="/user/address-book">Address book</Link>
            </li>
          </ul>
          }
          <ul className="clean_list">
            <li key="0">
              <Link to="/cart">
                My Cart
              </Link>
            </li>
            {!props.loggedIn && <li key="1">
              <a href="#" onClick={signInPopup}>Login</a>
            </li>}
          </ul>
          <hr className="divider_small"></hr>
          <ul className="clean_list">
            <li key="0">
              <Link to="/faq">FAQ</Link>
            </li>
            <li key="1">
              <Link to="/contact-us">Contact us</Link>
            </li>
          </ul>
          <span className='sideNav_closeIcon' onClick={(event)=> {setSideNavOpen(false)}}>&times;</span>
        </div>
      </div>
    </div>
  )
}

export default SideNav;
