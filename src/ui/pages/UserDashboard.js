import React, { Component, useState } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect, NavLink } from 'react-router-dom';

import UserProfileFragment from './fragments/UserProfileFragment';
import UserAddressFragment from './fragments/UserAddressFragment';
import UserPaymentOptionsFragment from './fragments/UserPaymentOptionsFragment';
import UserWishListFragment from './fragments/UserWishListFragment';
import UserOrdersFragment from './fragments/UserOrdersFragment';


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
                <li><NavLink exact to='/' activeClassName='active'>My account</NavLink></li>
                <li><NavLink to='/orders' activeClassName='active'>My orders</NavLink></li>
                <li><NavLink to='/wishlists' activeClassName='active'>My wishlists</NavLink></li>
            </ul>
            <ul>
                <li><NavLink to='/address-book' activeClassName='active'>Address book</NavLink></li>
                <li><NavLink to='/payment-options' activeClassName='active'>Payment options</NavLink></li>
            </ul>
            <ul>
                <li><NavLink to='/login' activeClassName='active'>Login</NavLink></li>
                <li><NavLink to='/signup' activeClassName='active'>Signup</NavLink></li>
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
            <div className="page user-dashboard d-flex">
                <BrowserRouter basename="/user">
                    <DashboardNavigation></DashboardNavigation>
                    <div className="dashboard-body">
                        <Switch>
                            <Route exact path="/" component={UserProfileFragment} />
                            <Route path="/orders" component={UserOrdersFragment} />
                            <Route path="/wishlists" component={UserWishListFragment} />
                            <Route path="/payment-options" component={UserPaymentOptionsFragment} />
                            <Route path="/address-book" component={UserAddressFragment} />
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default UserDashboard;