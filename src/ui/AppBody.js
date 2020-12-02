import React, {Component} from 'react';
import Home from './pages/Home';
import About from './pages/About';
import {Route, Switch, Redirect} from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ListingPage from './pages/ListingPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserDashboard from './pages/UserDashboard';
import FourZeroFour from './pages/FourZeroFour';
import LoginPage from './pages/LoginPage';
import { getUserObject } from '../service/rx-store/dataStore';

const ProtectedRoute = ({component: Component, ...rest}) => {
  console.log('ProtectedRoute',getUserObject(), Component);
  return (

    <Route
      {...rest}
      render={
        props => {
          
          if(getUserObject()){
            if(Component === LoginPage){
              console.log('User is logged in: Redirecting from LoginPage to Home', getUserObject());
              return <Redirect
                to={
                  {
                    pathname: '/',
                    // state: {
                    //   from: props.location
                    // }
                  }
                }
              />
            }
            return <Component {...props}/>;
          }else {
            if(Component === LoginPage){
              console.log('User is logged in: Redirecting from LoginPage to Home', getUserObject());
              return <Component {...props}/>;
            }
            return <Redirect
              to={
                {
                  pathname: '/login',
                  state: {
                    from: props.location
                  }
                }
              }
            />
          }
        }
      }
    />
  )
}
class AppBody extends Component {
  render() {
    return (<div className="App-body">
      <Switch>
        <Route exact path='/' render={(props) => <Home {...props} pageName="home" />}/>
        <Route path='/products/:category?' render={(props) => <ListingPage {...props} pageName="listing" />}/>
        <Route path='/product/:id' render={(props) => <ProductPage {...props} pageName="product" />}/>
        {/* <Route path='/about' render={(props) => <About {...props} pageName="about" />}/> */}
        <Route path='/cart' render={(props) => <CartPage {...props} pageName="cart" />}/>
        <Route path='/checkout' render={(props) => <CheckoutPage {...props} pageName="checkout" />}/>
        
        <ProtectedRoute path='/user/:page?' component={UserDashboard} />
        <ProtectedRoute path="/login/:page?" component={LoginPage} />
        {/* <Route path='/user/:page?' render={(props) => <UserDashboard {...props} pageName="user-dashboard" />}/> */}
        <Route path="*" render={props => <FourZeroFour {...props} />}/>
      </Switch>
    </div>);
  }
}

export default AppBody;
