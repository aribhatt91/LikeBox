import React, {Component} from 'react';
import Home from './pages/Home';
import {Route, Switch, Redirect} from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ListingPage from './pages/ListingPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserDashboard from './pages/UserDashboard';
import FourZeroFour from './pages/FourZeroFour';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './../service/middleware/ProtectedRoute';
import WishListPage from './pages/WishListPage';
import LikeBoxCarousel from './components/LikeBoxCarousel';
import ForgotPasswordForm from './components/forms/ForgotPasswordForm';
import HelpPage from './pages/HelpPage';
import About from './pages/About';

function AppBody (){

    return (<main className="App-body">
      <Switch>
        <Route exact path='/' render={(props) => <Home {...props}/>}/>
        <Route path='/products/:category/:page?' render={(props) => <ListingPage {...props}/>}/>
        <Route path='/product/:id' render={(props) => <ProductPage {...props}/>}/>
        {/* <Route path='/about' render={(props) => <About {...props} pageName="about" />}/> */}
        <ProtectedRoute path='/cart' component={CartPage}/>
        <ProtectedRoute path='/checkout' component={CheckoutPage}/>
        
        <ProtectedRoute path='/user/:slug?' component={UserDashboard} />
        <ProtectedRoute path='/wishlist' component={WishListPage} />
        <ProtectedRoute path="/login" component={LoginPage} />
        <Route path="/forgot-password" render={props => <ForgotPasswordForm {...props} />}/>
        <ProtectedRoute path="/register" component={LoginPage} />
        <ProtectedRoute path="/likebox" component={LikeBoxCarousel} />
        <Route path='/help/:slug?' render={(props) => <HelpPage {...props}/>}/>
        <Route path='/about/:slug?' render={(props) => <About {...props}/>}/>
        {/* <Route path='/user/:page?' render={(props) => <UserDashboard {...props} pageName="user-dashboard" />}/> */}
        <Route path="*" render={props => <FourZeroFour {...props} />}/>
      </Switch>
    </main>);
  
}

export default AppBody;
