import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartPlus, faCartArrowDown, faUser, faBars, faHeart } from '@fortawesome/free-solid-svg-icons'
import './components.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginModule from './LoginModule';
import { getAuthToken } from './../../service/loginService';
import SignupModule from './SignupModule';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SideNav from './SideNav';

function SearchInput(props){
  return (
    <span className="search_input_container">
      <input type="text" placeholder="Search..." className={('themed_text_input search_input ' + (props.searchExpand?' expanded':''))}></input>
      <Nav.Link onClick={props.expandSearchInput} className="search_icon">
        <FontAwesomeIcon icon={faSearch}/>
      </Nav.Link>
    </span>
  )
}
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false, 
      searchExpand: false,
      loggedIn: (getAuthToken() !== null)
    };
    this.setShowModal = this.setShowModal.bind(this);
    this.setHideModal = this.setHideModal.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
    console.log('props ->',this.props);
    
  }
  expandSearch(e){
    e.preventDefault();
    console.log('seAarch clicked');
    this.setState({
      searchExpand: true
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
        <div className="topnav">
          <Navbar variant="light">
  
            <Navbar.Brand>
              <SideNav loggedIn={this.state.loggedIn} signIn={this.setShowModal}></SideNav>
              <NavLink activeClassName='active' exact={true} to="/" >Home</NavLink>
            </Navbar.Brand>
            
            <Nav className="mr-auto">
              <NavLink activeClassName='active' to="/products">Men</NavLink>
              <NavLink activeClassName='active' to="/sellers">Women</NavLink>
              <NavLink activeClassName='active' to="/about">Kids</NavLink>
            </Nav>
            <Nav className="justify-content-end">
              <SearchInput
                searchExpand={this.state.searchExpand}
                expandSearchInput={this.expandSearch}>
              </SearchInput>
              
              <Nav.Link className={this.props.loggedIn ? "hidden-xs-up" : ""} 
                onClick={() => this.setShowModal()}>
                <FontAwesomeIcon icon={faUser}/>
              </Nav.Link>
              <Nav.Link>
                <FontAwesomeIcon icon={faCartPlus}/>
              </Nav.Link>
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
