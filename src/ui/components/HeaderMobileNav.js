import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { HEADER_NAV_MENU } from './../../service/constants/header-navs';
import Accordion from './generic/Accordion';
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
        <FontAwesomeIcon icon={faBars}/>
      </a>
      <div className={"nav-mobile" + (open ? " slide-in" : "")} onScroll={(e)=>{e.stopPropagation()}} aria-hidden={!open}>
        <div className="nav-mobile-wrapper">
          {
            user && <div className="user-provile-avatar">

            </div>
          }

          {user && <ul className="clean_list category-list">
            {(Object.keys(HEADER_NAV_MENU) || []).map((key, i) => <li key={i}>
                <Accordion label={key} openBtn={true}>
                {
                  (HEADER_NAV_MENU[key] || []).map((item, index) => <div key={index} className="cat-link">
                    <Link className="d-flex pt-2 pb-2 pl-4 pr-4" to={item.link} onClick={()=>{setOpen(false)}}>{item.name}</Link>
                  </div>)
                }
                </Accordion>
            </li>)}
          </ul>}
          <hr className="divider_small"></hr>
          {user && <ul className="clean_list personal_list_items">
            <li  key="0">
              <Link to="/user" onClick={()=>{setOpen(false)}}> My account</Link>
            </li>
            <li key="1">
              <Link to="/wishlist" onClick={()=>{setOpen(false)}}>My WishList</Link>
            </li>
            <li key="2">
              <Link to="/cart" onClick={()=>{setOpen(false)}}>
                My Bag
              </Link>
            </li>
            <li key="3">
              <a href="#" onClick={()=>{
                logout();
                setOpen(false);
                }}>
                Sign out
              </a>
            </li>
          </ul>
          }
          {!user && <ul className="clean_list">
             <li key="1">
              <Link to={"/login"} onClick={()=>{setOpen(false)}}>Sign in</Link>
            </li>
            <li key="2">
              <Link to={"/register"} onClick={()=>{setOpen(false)}}>Register</Link>
            </li>
          </ul>}
          <hr className="divider_small"></hr>
          <ul className="clean_list">
            <li key="0">
              <Link to="/faq" onClick={()=>{setOpen(false)}}>FAQ</Link>
            </li>
            <li key="1">
              <Link to="/contact-us" onClick={()=>setOpen(false)}>Contact us</Link>
            </li>
          </ul>
          <span className='nav-mobile-close-icon' onClick={(event)=> {setOpen(false)}}>
            &times;
          </span>
        </div>
      </div>
    </div>
  )
}

export default HeaderMobileNav;
