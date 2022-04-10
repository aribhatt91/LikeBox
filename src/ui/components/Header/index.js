import React, { useContext } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MobileNavigation from '../MobileNavigation';
import HOME_ICON from '../../../assets/img/logo.png'; 
import SearchBar from '../SearchBar';
import CartLink from '../CartLink';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import AppButton from '../_generic/AppButton';
import MainNavigation from '../MainNavigation';
import ScaleIcon from '../_svg-components/ScaleIcon';
import HeartLineIcon from '../_svg-components/HeartLineIcon.js';
import './style.module.css';

function Header (props) {

  const location = useLocation();
  let history = useHistory();
  const {currentUser, logout} = useContext(AuthContext);


  const signout = async () => {
    try{
      if(currentUser){
        logout();
      }
    }catch(err){
      console.err('Sign out error:', err);
    }
  }
  
    return (
      <header className="app-header sticky-top">
        <div className={"topnav" /*Add scrolling functionality if needed*/}>
          <Navbar variant="light">
            <MobileNavigation user={currentUser} logout={signout} />

            <Navbar.Brand>
              <NavLink activeClassName='active' exact={true} to="/" >
                <img className="home_icon" src={HOME_ICON} alt="Home"/>
              </NavLink>
            </Navbar.Brand>
            
            <Nav className="mr-auto d-none d-lg-flex navbar-nav">
              {currentUser && <MainNavigation/>}
            </Nav>
            <Nav className="justify-content-end d-none d-lg-flex">
            
              {/* <SearchBar/> */}
              {!currentUser && location.pathname === '/' && <AppButton label="Create account" size="sm" className={"d-none create-account-btn-md mr-0 align-items-center pl-5 pr-5 no-anim"} 
                href="/register">
              </AppButton>}
              {!currentUser && location.pathname.indexOf('login') === -1 && <AppButton label="Sign in" size="sm" className={"d-md-flex align-items-center pl-5 pr-5 no-anim"} 
                href="/login">
              </AppButton>}
              {!currentUser && location.pathname.indexOf('login') > -1 && <AppButton label="Register" size="sm" className={"d-md-flex align-items-center pl-5 pr-5 no-anim"} 
                href="/register">
              </AppButton>}
              {currentUser && 
              <React.Fragment>
                
                <NavLink activeClassName="active" to="/user/sizing">
                  <ScaleIcon size={24} />
                </NavLink>
                <NavLink activeClassName="active" to="/wishlist">
                  <HeartLineIcon />
                </NavLink>
                {
                  window.DEV_MODE && <NavLink activeClassName="active" to="/cart">
                  <CartLink />
                </NavLink> 
                }
                
                {
                location.pathname.indexOf('/user') === -1 &&
                <AppButton label="Your account" size="sm" className={"d-none d-lg-flex no-anim align-items-center pl-5 pr-5 no-anim"} 
                  href="/user">
                </AppButton>
                }
                {
                location.pathname.indexOf('/user') > -1 &&
                <AppButton label="Log out" size="sm" className={"d-none d-lg-flex no-anim align-items-center pl-5 pr-5 no-anim"} 
                  onClick={signout}>
                </AppButton>
                }
              </React.Fragment>
              }

            </Nav>
          </Navbar>
        </div>

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
