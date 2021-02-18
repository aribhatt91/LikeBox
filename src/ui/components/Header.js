import React, {Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
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

const UserProfileDropDown = ({classes}) => {
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
            <a>Sign out</a>
          </li>
        </ul>
      </div>
    </span>
  )
}
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false, 
      searchExpand: false,
      loggedIn: (getUserObject() !== null),
      user: null,
      scrolling: false
    };
    this.setShowModal = this.setShowModal.bind(this);
    this.setHideModal = this.setHideModal.bind(this);
    console.log('Header props ->',this.props);
    
  }
  componentDidMount(){
    let that = this;
    this.props.authenticate();
    console.log('componentDidMount: called authenticate');
    window.addEventListener('scroll', (e) => {
      if(window.pageYOffset <= 20 && that.state.scrolling){
        that.setState({
          scrolling: false
        })
      }else if(window.pageYOffset > 30 && !that.state.scrolling) {
        that.setState({
          scrolling: true
        })
      }
    })
  }
  setShowModal(){
    this.setState({
      showModal: true
    })
  }
  setHideModal(){
    this.setState({
      showModal: false
    })
  }
  render(){
    return (
      <header className="App-header sticky-top">
        <div className={"topnav" + (this.state.scrolling ? ' scrolling' : "")}>
          <Navbar variant="light">
  
            <Navbar.Brand>
              <SideNav loggedIn={this.props.loggedIn} signIn={this.setShowModal}></SideNav>
              <NavLink activeClassName='active' exact={true} to="/" >
                <img className="home_icon" src={HOME_ICON} alt="Home"/>
              </NavLink>
            </Navbar.Brand>
            
            <Nav className="mr-auto d-none d-md-flex navbar-nav">
              <NavLink activeClassName='active' to="/products/men">Men</NavLink>
              <NavLink activeClassName='active' to="/products/women">Women</NavLink>
              <NavLink activeClassName='active' to="/products/kids">Kids</NavLink>
              <NavLink activeClassName='active' to="/products/sale">Sale</NavLink>
            </Nav>
            <Nav className="justify-content-end">
            
              <SearchBar/>

              {!this.props.loggedIn && <Nav.Link className={"d-md-flex align-items-center"} 
                onClick={() => this.setShowModal()}>
                <FontAwesomeIcon icon={faUser}/>
              </Nav.Link>}
              {this.props.loggedIn && <UserProfileDropDown/>}

              <NavLink activeClassName='active' to="/cart">
                {/* <FontAwesomeIcon icon={faCartPlus}/> */}
                <CartLink/>
              </NavLink>

            </Nav>
          </Navbar>
        </div>
        <Modal
            show={this.state.showModal}
            onHide={this.setHideModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
              <div className="d-none d-md-inline-flex login-img" style={{backgroundImage: "url(" + LI + ")"}}></div>
              <UserLoginSignupModule/>
            </Modal.Body>
          </Modal>
      </header>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedIn: state.loginReducer.loggedIn,
    user: state.loginReducer.user
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({authenticate: authenticate}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header);
