import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HEADER_NAV_MENU } from '../../../libs/constants/header-navs';
import Accordion from '../_generic/Accordion';
import AppImage from '../_generic/AppImage';
import HamburgerIcon from '../_svg-components/HamburgerIcon';
import logo from '../../../assets/img/logo.png';
import  './style.component.css';
import EventTracker from '../../../libs/api/EventTracker';

function MobileNavigation({user, logout}){
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(open){
        document.body.style.height = '100vh';
        document.body.style.overflowY = 'hidden';
    }else {
        document.body.style.height = 'auto';
        document.body.style.overflowY = 'auto';
    }
  }, [open])
  
  return (
    <div className="d-inline-block nav-mobile-container d-lg-none">
      <a href="#" onClick={()=>{
          setOpen(true);
          EventTracker.trackEvent(EventTracker.events.ui.NAVIGATION_PANEL_OPEN);
        }} className="hamburger">
        <HamburgerIcon />
      </a>
      <div className={"nav-mobile" + (open ? " nav-mobile--open" : "")} onScroll={(e)=>{e.stopPropagation()}} aria-hidden={!open}>
        <div className="nav-mobile__wrapper">
          <div className="d-flex justify-content-center align-content-center p-2 mb-3">
            <AppImage src={logo} alt="Brand Logo" className="home_icon h-auto w-auto" />
          </div>

          {user && 
          <React.Fragment>

            <ul className="nav-mobile__list category-list">
              {(Object.keys(HEADER_NAV_MENU) || []).map((key, i) => <li className="nav-mobile__list-item" key={i}>
                  <Accordion label={key} openBtn={true}>
                  {
                    (HEADER_NAV_MENU[key] || []).map((item, index) => <div key={index} className="cat-link">
                      <Link className="d-flex pt-2 pb-2 pl-4 pr-4" to={item.link} onClick={()=>{setOpen(false)}}>{item.name}</Link>
                    </div>)
                  }
                  </Accordion>
              </li>)}
            </ul>

            <hr className="divider_small"></hr>

            <ul className="nav-mobile__list">
              <li className="nav-mobile__list-item mt-1 mb-1" key="0">
                <Link to="/user" onClick={()=>{setOpen(false)}}> My account</Link>
              </li>
              <li className="nav-mobile__list-item mt-1 mb-1" key="1">
                <Link to="/wishlist" onClick={()=>{setOpen(false)}}>My WishList</Link>
              </li>
              {window.DEV_MODE && <li key="2" className="nav-mobile__list-item mt-1 mb-1">
                <Link to="/cart" onClick={()=>{setOpen(false)}}>
                  My Bag
                </Link>
              </li>}
              <li key="3" className="nav-mobile__list-item mt-1">
                <a href="#" onClick={()=>{
                  logout();
                  setOpen(false);
                  }}>
                  Sign out
                </a>
              </li>
            </ul>
          </React.Fragment>
          }
          {!user && <ul className="nav-mobile__list">
             <li key="1" className="nav-mobile__list-item">
              <Link to={"/login"} onClick={()=>{setOpen(false)}} className="text-center">Sign in</Link>
            </li>
            <li key="2" className="nav-mobile__list-item">
              <hr className="divider_small"></hr>
            </li>
            <li key="3" className="nav-mobile__list-item">
              <Link to={"/register"} onClick={()=>{setOpen(false)}} className="text-center">Register</Link>
            </li>
          </ul>}
          

          
          <span className='nav-mobile__close-icon' onClick={(event)=> {setOpen(false)}}>
            &times;
          </span>
        </div>
      </div>
    </div>
  )
}

export default MobileNavigation;
