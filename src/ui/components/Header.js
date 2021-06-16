import React, { useContext } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import HeaderMobileNav from './HeaderMobileNav.js';
import HOME_ICON from '../../assets/img/logo.png'; 
import SearchBar from './SearchBar';
import CartLink from './CartLink';
import { AuthContext } from './../../store/contexts/AuthContext';
import AppButton from './generic/AppButton';
import HeaderNavigation from './HeaderNavigation';
import ScaleIcon from './svg-components/ScaleIcon';
import HeartLineIcon from './svg-components/HeartLineIcon.js';
import BagIcon from './svg-components/BagIcon.js';


function Header (props) {

  const location = useLocation();
  let history = useHistory();
  const {currentUser, logout} = useContext(AuthContext);


  const signout = async () => {
    try{
      if(currentUser){
        await logout(currentUser.email);
        history.replace('/login');
      }
      
    }catch(err){
      console.err('Sign out error:', err);
    }
  }
  
    return (
      <header className="App-header sticky-top">
        <div className={"topnav" /*Add scrolling functionality if needed*/}>
          <Navbar variant="light">
            <HeaderMobileNav user={currentUser} logout={signout} />

            <Navbar.Brand>
              <NavLink activeClassName='active' exact={true} to="/" >
                <img className="home_icon" src={HOME_ICON} alt="Home"/>
              </NavLink>
            </Navbar.Brand>
            
            <Nav className="mr-auto d-none d-lg-flex navbar-nav">
              {currentUser&& <HeaderNavigation/>}
            </Nav>
            <Nav className="justify-content-end d-none d-lg-flex">
            
              {/* <SearchBar/> */}

              {!currentUser && location.pathname.indexOf('login') === -1 && <AppButton label="Sign in" className={"d-md-flex sm align-items-center pl-5 pr-5 no-anim"} 
                href="/login">
              </AppButton>}
              {!currentUser && location.pathname.indexOf('login') > -1 && <AppButton label="Register" className={"d-md-flex sm align-items-center pl-5 pr-5 no-anim"} 
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
                location.pathname.indexOf('/user') === -1 &&
                <AppButton label="Your account" className={"d-none d-lg-flex no-anim sm align-items-center pl-5 pr-5 no-anim"} 
                  href="/user">
                </AppButton>
                }
                {
                location.pathname.indexOf('/user') > -1 &&
                <AppButton label="Log out" className={"d-none d-lg-flex no-anim sm align-items-center pl-5 pr-5 no-anim"} 
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
