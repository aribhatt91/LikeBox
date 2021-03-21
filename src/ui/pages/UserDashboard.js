import React, { Component, useState } from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect, NavLink } from 'react-router-dom';

import UserProfileFragment from './fragments/UserProfileFragment';
import UserAddressFragment from './fragments/UserAddressFragment';
import UserPaymentOptionsFragment from './fragments/UserPaymentOptionsFragment';
import UserWishListFragment from './fragments/UserWishListFragment';
import UserOrdersFragment from './fragments/UserOrdersFragment';
import { Tabs } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';

function Order(props) {

}
function UserSettings(props){
    const [showDetail, setShowDetail] = useState("");

    return (
        <div className={"user-settings w-100" + (showDetail !== "" ? " detail-open" : "")}>
            <div className="user-settings-menu">
                <ul>
                    <li key="0" onClick={() => setShowDetail('profile')}>Profile</li>
                    <li key="1" onClick={() => setShowDetail('pay')}>Payment method</li>
                    <li key="2" onClick={() => setShowDetail('addr')}>Addresses</li>
                    <li key="3" onClick={() => setShowDetail('contact')}>Contact preferences </li>
                    <li key="4" onClick={() => setShowDetail('lang')}>Language</li>
                    <li key="5" onClick={() => setShowDetail('country')}>Country</li>
                </ul>
            </div>
            <div className="user-settings-detail">
                <div className="back" onClick={() => setShowDetail("")}>Back to settings</div>
                <ul className="col-12 p-0">
                    <li key="0" className={showDetail === "profile" ? "d-flex" : "d-none"}>
                        <UserProfileFragment/>
                    </li>
                    <li key="1" className={showDetail === "pay" ? "d-flex" : "d-none"}>
                        <UserPaymentOptionsFragment />
                    </li>
                    <li key="2" className={showDetail === "addr" ? "d-flex" : "d-none"}>
                        <UserAddressFragment/>
                    </li>
                    <li key="3" className={showDetail === "contact" ? "d-flex" : "d-none"}>
                        
                    </li>
                    <li key="4" className={showDetail === "lang" ? "d-flex" : "d-none"}>
                        
                    </li>
                    <li key="5" className={showDetail === "country" ? "d-flex" : "d-none"}>
                        
                    </li>
                </ul>
            </div>
        </div>
    )
}

function DashboardNavigation({userFirstName, logoSrc}){
    const [key, setKey] = useState('box');
    return (
        <div className="app-tab-layout">
            <Tabs
                activeKey={key}
                onSelect={k => setKey(k)}>
                <Tab eventKey="box" title="Your box">
                    <div></div>
                </Tab>
                <Tab eventKey="size" title="Sizing">
                    <div>
                        
                    </div>
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <div>
                        <UserOrdersFragment/>
                    </div>
                </Tab>
                <Tab eventKey="settings" title="Settings">
                    <div className="user-settings-wrapper">
                        <UserSettings />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
class UserDashboard extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="page user-dashboard d-flex">
                <DashboardNavigation></DashboardNavigation>
                {/* <BrowserRouter basename="/user">
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
                </BrowserRouter> */}
            </div>
        );
    }
}

export default UserDashboard;