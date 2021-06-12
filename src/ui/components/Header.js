import React, { useState, useContext, useEffect } from 'react';
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
import heart_icon from '../../assets/img/heart.png';
import ScaleIcon from './svg-components/ScaleIcon';

const UserProfileDropDown = ({logout}) => {
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    document.body.addEventListener('click', () => {setExpand(false)})
  }, [])
  return (
    <span className={"user-account-wrapper d-md-flex align-items-center"} onClick={(e) => {e.stopPropagation()}}>
      <a className={"user-account-icon d-md-flex align-items-center"} href="#" onClick={() => setExpand(!expand)}>
        {/* <FontAwesomeIcon icon={faUser}/> */}
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
  let history = useHistory();
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
                  <img src={heart_icon} className="nav_icon" />
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
