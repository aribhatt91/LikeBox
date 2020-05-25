import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './components.css';

function SideNav(props){
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const signInPopup = (e) => {
    e.preventDefault(); 
    setSideNavOpen(false); 
    props.signIn();
  }
  return (
    <span className="hidden-md-up">
      <a href="javascript:void(0)" onClick={()=>{setSideNavOpen(true)}} className="hamburger">
        <FontAwesomeIcon icon={faBars}/>
      </a>
      <div className={"sideNav" + (sideNavOpen ? " slide-in" : "")} onScroll={(e)=>{e.stopPropagation()}}>
        <div className="sideNav_wrapper">

          <ul key="list" className="clean_list">
            <li>
              <Link activeClassName='active' to="/category/men">Men</Link>
            </li>
            <li>
              <Link activeClassName='active' to="/category/women">Women</Link>
            </li>
            <li>
              <Link activeClassName='active' to="/category/kids">Kids</Link>
            </li>
            <li>
              <Link activeClassName='active' to="/category/trending">Trending</Link>
            </li>
          </ul>
          <hr className="divider_small"></hr>
          <ul key="list" className="clean_list personal_list_items">
            {props.loggedIn && <li>
              <Link activeClassName='active' to="/my-account"> Your account</Link>
            </li>}
            {props.loggedIn && <li>
              <Link activeClassName='active' to="/wishlist">Wishlist</Link>
            </li>}
            {!props.loggedIn && <li>
              <a href="#" onClick={signInPopup}>Sign in</a>
            </li>}
            <li>
              <Link activeClassName='active' to="/orders">Your orders</Link>
            </li>
            <li>
              <Link activeClassName='active' to="/cart">
                Cart
              </Link>
            </li>
          </ul>
          <hr className="divider_small"></hr>
          <ul key="list" className="clean_list">
            <li>
              <Link activeClassName='active' to="/faq">FAQ</Link>
            </li>
            <li>
              <Link activeClassName='active' to="/contact-us">Contact us</Link>
            </li>
          </ul>
          <span className='sideNav_closeIcon' onClick={(event)=> {setSideNavOpen(false)}}>&times;</span>
        </div>
      </div>
    </span>
  )
}

export default SideNav;
