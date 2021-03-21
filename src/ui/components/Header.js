import React, {Component, useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import SideNav from './SideNav';
import HOME_ICON from '../../assets/img/logo.png'; 
import SearchBar from './SearchBar';
import { authenticate } from './../../service/authService';
import { getUserObject } from '../../service/rx-store/dataStore';
import UserLoginSignupModule from './UserLoginSignupModule';
import LI from '../../assets/img/login.jpg';
import CartLink from './CartLink';
import { AuthContext } from './../../store/contexts/AuthContext';
import AppButton from './generic/AppButton';
import HeaderNavigation from './HeaderNavigation';
import heart_icon from '../../assets/img/heart.png';
import LoadingModule from './LoadingModule';
const UserProfileDropDown = ({classes, logout}) => {
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    document.body.addEventListener('click', () => {setExpand(false)})
  }, [])
  return (
    <span className={"user-account-wrapper d-md-flex align-items-center"} onClick={(e) => {e.stopPropagation()}}>
      <a className={"user-account-icon d-md-flex align-items-center"} href="#" onClick={() => setExpand(!expand)}>
        <FontAwesomeIcon icon={faUser}/>
      </a>
      <div className={"user-account-dropdown" + (expand ? " d-inline-block" : " d-none")}>
        <ul>
          <li>
            <Link to="/user">My account</Link>
          </li>
          <li>
            <Link to="/user/orders">My orders</Link>
          </li>
          <li>
            <Link to="/user/wishlists">My wishlist</Link>
          </li>
          <li>
            <a href="#" onClick={logout}>Log out</a>
          </li>
        </ul>
      </div>
    </span>
  )
}
function Header (props) {
  /* const [showModal, setShowModal] = useState(false);
  const [searchExpand, setSearchExpand] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [loading, setLoading] = useState(true); */
  const location = useLocation();

  const {currentUser, logout} = useContext(AuthContext);


  useEffect(()=>{
    /* window.addEventListener('scroll', (e) => {
      if(window.pageYOffset <= 20 && setScrolling && scrolling){
        setScrolling(false);
      }else if(window.pageYOffset > 30 && setScrolling && !scrolling) {
        setScrolling(true)
      }
    }) */
  }, [])
  
    return (
      <header className="App-header sticky-top">
        <div className={"topnav" /*Add scrolling functionality if needed*/}>
          <Navbar variant="light">
  
            <Navbar.Brand>
              <SideNav loggedIn={currentUser}></SideNav>
              <NavLink activeClassName='active' exact={true} to="/" >
                <img className="home_icon" src={HOME_ICON} alt="Home"/>
              </NavLink>
            </Navbar.Brand>
            
            <Nav className="mr-auto d-none d-md-flex navbar-nav">
              <HeaderNavigation/>
            </Nav>
            <Nav className="justify-content-end">
            
              {/* <SearchBar/> */}

              {!currentUser && location.pathname.indexOf('login') === -1 && <AppButton label="Sign in" className={"d-md-flex sm align-items-center pl-5 pr-5"} 
                href="/login">
              </AppButton>}
              {!currentUser && location.pathname.indexOf('login') > -1 && <AppButton label="Register" className={"d-md-flex sm align-items-center pl-5 pr-5"} 
                href="/register">
              </AppButton>}
              {currentUser && 
              <React.Fragment>
                {
                  /* Hide wishlist icon for cart page */
                location.pathname.indexOf('wishlist') === -1 && 
                <NavLink activeClassName="active" to="/wishlist">
                  <img src={heart_icon} className="nav_icon" />
                </NavLink>
                }
                {
                /* Hide cart icon for cart page */
                location.pathname.indexOf('cart') === -1 && 
                <NavLink activeClassName='active' to="/cart">
                  <CartLink user={currentUser}/>
                </NavLink>
                }
                {
                location.pathname.indexOf('user') === -1 &&
                <AppButton label="Your account" className={"d-md-flex no-anim sm align-items-center pl-5 pr-5"} 
                  href="/user">
                </AppButton>
                }
              </React.Fragment>
              }

              

            </Nav>
          </Navbar>
        </div>
        {/* <Modal
            show={showModal}
            onHide={() => {setShowModal(false)}}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
              <div className="d-none d-md-inline-flex login-img" style={{backgroundImage: "url(" + LI + ")"}}></div>
              <UserLoginSignupModule/>
            </Modal.Body>
          </Modal> */}
          
      </header>
    );
  
}
/* const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
    user: state.loginReducer.user
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({authenticate: authenticate}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header); */

export default Header;
