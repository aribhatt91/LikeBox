import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCartArrowDown, faUser, faBars, faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import LoginModule from './LoginModule';
import { getAuthToken } from './../../service/loginService';
import SignupModule from './SignupModule';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SideNav from './SideNav';
import HOME_ICON from '../../assets/img/home_icon.png'; 
import SearchInput from './HeaderSearchBar';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false, 
      searchExpand: false,
      loggedIn: (getAuthToken() !== null),
      scrolling: false
    };
    this.setShowModal = this.setShowModal.bind(this);
    this.setHideModal = this.setHideModal.bind(this);
    console.log('props ->',this.props);
    
  }
  componentDidMount(){
    let that = this;
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
              <SideNav loggedIn={this.state.loggedIn} signIn={this.setShowModal}></SideNav>
              <NavLink activeClassName='active' exact={true} to="/" >
                <img className="home_icon" src={HOME_ICON} alt="Home"/>
              </NavLink>
            </Navbar.Brand>
            
            <Nav className="mr-auto">
              <NavLink activeClassName='active' to="/products/men">Men</NavLink>
              <NavLink activeClassName='active' to="/products/women">Women</NavLink>
              <NavLink activeClassName='active' to="/products/kids">Kids</NavLink>
              <NavLink activeClassName='active' to="/products/sale">Sale</NavLink>
            </Nav>
            <Nav className="justify-content-end">
              <SearchInput></SearchInput>
              <Nav.Link className={this.props.loggedIn ? "hidden-xs-up" : ""} 
                onClick={() => this.setShowModal()}>
                <FontAwesomeIcon icon={faUser}/>
              </Nav.Link>
              <NavLink activeClassName='active' to="/user">
                <FontAwesomeIcon icon={faUser}/>
              </NavLink>
              <NavLink activeClassName='active' to="/cart">
                <FontAwesomeIcon icon={faCartPlus}/>
              </NavLink>
            </Nav>
          </Navbar>
        </div>
        <Modal
            show={this.state.showModal}
            onHide={this.setHideModal}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              
              <Tabs defaultActiveKey="login" id="user_signup_popup">
                <Tab eventKey="login" title="Log in">
                <LoginModule></LoginModule>
                </Tab>
                <Tab eventKey="signup" title="Sign up">
                  <SignupModule></SignupModule>
                </Tab>
              </Tabs>
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
export default connect(mapStateToProps)(Header);
