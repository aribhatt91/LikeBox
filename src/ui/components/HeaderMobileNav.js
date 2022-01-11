import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HEADER_NAV_MENU } from './../../service/constants/header-navs';
import Accordion from './generic/Accordion';
import AppImage from './generic/AppImage';
import HamburgerIcon from './svg-components/HamburgerIcon';
import logo from '../../assets/img/logo.png';
function HeaderMobileNav({user, logout}){
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
      <a href="#" onClick={()=>{setOpen(true)}} className="hamburger">
        <HamburgerIcon />
      </a>
      <div className={"nav-mobile" + (open ? " slide-in" : "")} onScroll={(e)=>{e.stopPropagation()}} aria-hidden={!open}>
        <div className="nav-mobile-wrapper">
          <div className="d-flex justify-content-center align-content-center p-2 mb-3">
            <AppImage src={logo} alt="Brand Logo" className="home_icon h-auto w-auto" />
          </div>
          {
            user && <div className="user-provile-avatar">

            </div>
          }

          {user && 
          <React.Fragment>
            <ul className="clean_list category-list">
              {(Object.keys(HEADER_NAV_MENU) || []).map((key, i) => <li key={i}>
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
            <ul className="clean_list personal_list_items">
              <li  key="0" className="mt-1 mb-1">
                <Link to="/user" onClick={()=>{setOpen(false)}}> My account</Link>
              </li>
              <li key="1" className="mt-1 mb-1">
                <Link to="/wishlist" onClick={()=>{setOpen(false)}}>My WishList</Link>
              </li>
              {window.DEV_MODE && <li key="2" className="mt-1 mb-1">
                <Link to="/cart" onClick={()=>{setOpen(false)}}>
                  My Bag
                </Link>
              </li>}
              <li key="3" className="mt-1">
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
          {!user && <ul className="clean_list">
             <li key="1">
              <Link to={"/login"} onClick={()=>{setOpen(false)}} className="text-center">Sign in</Link>
            </li>
            <li key="2">
              <hr className="divider_small"></hr>
            </li>
            <li key="3">
              <Link to={"/register"} onClick={()=>{setOpen(false)}} className="text-center">Register</Link>
            </li>
          </ul>}
          

          
          <span className='nav-mobile-close-icon' onClick={(event)=> {setOpen(false)}}>
            &times;
          </span>
        </div>
      </div>
    </div>
  )
}

export default HeaderMobileNav;
