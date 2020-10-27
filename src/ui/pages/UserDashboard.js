import React, { Component, useState } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import RadioButtonGroup from '../components/generic/RadioButtonGroup';
import TextInput from '../components/generic/TextInput';
import ThemedButton from '../components/generic/ThemedButton';
import UserProfile from './../components/UserProfile';
import Accordion from './../components/generic/Accordion';
import UserAddressBook from '../components/UserAddressBook';
import UserPaymentOptions from './../components/UserPaymentOptions';
import UserWishList from './../components/UserWishList';

//Mock data
import USER from '../../mock/user.json';
import UserOrdersList from './../components/UserOrdersList';


function Order(props) {

}
function MyOrders(props){
    return (
        <div>MyOrders</div>
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
            <ul>
                <li><NavLink to='/login' activeclassName='active'>Login</NavLink></li>
                <li><NavLink to='/signup' activeclassName='active'>Signup</NavLink></li>
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
                            <Route path="/orders" component={UserOrdersList} />
                            <Route path="/wishlists" component={UserWishList} />
                            <Route path="/payment-options" component={UserPaymentOptions} />
                            <Route path="/address-book" component={UserAddressBook} />
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default UserDashboard;