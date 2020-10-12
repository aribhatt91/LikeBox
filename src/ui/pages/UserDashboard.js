import React, { Component, useState } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import RadioButtonGroup from '../components/RadioButtonGroup';
import TextInput from '../components/TextInput';
import ThemedButton from '../components/ThemedButton';
import AddressForm from '../components/AddressForm';
import UserProfile from './../components/UserProfile';
import Accordion from './../components/Accordion';


function Order(props) {

}
function MyOrders(props){
    return (
        <div>MyOrders</div>
    )
}
function MyWishlists(props){
    return (
        <div>MyWishlists</div>
    )
}
function PaymentOptions(props){
    return (
        <div>PaymentOptions</div>
    )
}

function Address({instance, deleteAddress, editAddress}){

}
function AddressBook({addresses, deleteAddress, editAddress}){
    let saved_addresses = [];
    if(addresses && addresses.length > 0){
        addresses.forEach((item, index) => {
            saved_addresses.push(
                <Address
                    instance={item}
                    deleteAddress={deleteAddress}
                    editAddress={editAddress}
                />
            )
        })
        
    }
    return (
        <div className={"address-section editable-section"}>
            <h1 className="editable-section-header mb-4">My addresses</h1>
            <div className="add-address-container mb-3">
                <Accordion
                    label="Add new address"
                    openBtn="true"
                    // hideHeaderOnOpen={true}
                    children={
                        <AddressForm
                            hideHeader={true}
                        />
                    }
                />
            </div>
            {saved_addresses.length > 0 && <div className="saved-address-container">
                {
                    saved_addresses
                }
            </div>}

        </div>
    )
}
function DashboardNavigation({userFirstName, logoSrc}){
    return (
        <div className="dashboard-navigation">
            <div className="d-flex hello-user">
                <img className="hello-user-logo" src={logoSrc ? logoSrc : "https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg"}></img>
                <div className="hello-user-text">
                    <div className="hello-user-greeting">Hello,</div>
                    <div className="hello-username">{userFirstName ? userFirstName : "Aritra"}</div>
                </div>
            </div>        
            <ul>
                <li><NavLink exact to='/' activeclassName='active'>My account</NavLink></li>
                <li><NavLink to='/orders' activeclassName='active'>My orders</NavLink></li>
                <li><NavLink to='/wishlists' activeclassName='active'>My wishlists</NavLink></li>
            </ul>
            <ul>
                <li><NavLink to='/address-book' activeclassName='active'>Address book</NavLink></li>
                <li><NavLink to='/payment-options' activeclassName='active'>Payment options</NavLink></li>
            </ul>
        </div>
    )
}
class UserDashboard extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="user-dashboard d-flex">
                <BrowserRouter basename="/user">
                    <DashboardNavigation></DashboardNavigation>
                    <div className="dashboard-body">
                        <Switch>
                            <Route exact path="/" component={UserProfile} />
                            <Route path="/orders" component={MyOrders} />
                            <Route path="/wishlists" component={MyWishlists} />
                            <Route path="/payment-options" component={PaymentOptions} />
                            <Route path="/address-book" component={AddressBook} />
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default UserDashboard;