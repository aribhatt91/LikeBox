import React, {Suspense} from 'react';
import Home from './pages/home/Home';
import {Route, Switch, Redirect} from 'react-router-dom';
//import ProductPage from './pages/pdp/ProductPage';
//import ListingPage from './pages/shop/ListingPage';
//import CartPage from './pages/cart/CartPage';
//import CheckoutPage from './pages/CheckoutPage';
import UserDashboard from './pages/user/UserDashboard';
import FourZeroFour from './pages/FourZeroFour';
import LoginPage from './pages/login/LoginPage';
import ProtectedRoute from './../service/middleware/ProtectedRoute';
import WishListPage from './pages/wishlist/WishListPage';

import ForgotPasswordForm from './components/forms/ForgotPasswordForm';
//import HelpPage from './pages/HelpPage';
//import About from './pages/about/About';
import SearchPage from './pages/shop/SearchPage';

import YourStylePage from './pages/your-style/YourStylePage';
import YourStyleCardsPage from './pages/your-style/YourStyleCardsPage';
import LoadingModule from './components/LoadingModule';

const ProductPageLazy = React.lazy(() => import('./pages/pdp/ProductPage'));
const ProductListingLazy = React.lazy(() => import('./pages/shop/ListingPage'));
const YourStylePageLazy = React.lazy(()=> import('./pages/your-style/YourStylePage'))
const AboutPageLazy = React.lazy(() => import('./pages/about/About'))
function AppBody (){


    return (<main className="App-body">
      <Switch>
        <Route exact path='/' render={(props) => <Home {...props}/>}/>
        <Route path='/products/:category/:page?' render={(props) => 
            <React.Fragment>
              <Suspense fallback={<LoadingModule />}>
                <ProductListingLazy {...props}/>
              </Suspense>
            </React.Fragment>
          }/>
        <Route path='/product/:id?' render={(props) => 
            <React.Fragment>
              <Suspense fallback={<LoadingModule />}>
                <ProductPageLazy {...props}/>
              </Suspense>
            </React.Fragment>
          }/>
        
        {/* <Route path='/product/:id' render={(props) => <ProductPage {...props}/>}/> */}
        <Route path="/search" render={(props) => <SearchPage {...props} />} />

        {/* <ProtectedRoute path='/cart' component={CartPage}/>
        <ProtectedRoute path='/checkout' component={CheckoutPage}/> */}
        
        <ProtectedRoute path='/user/:slug?' component={UserDashboard} />
        <ProtectedRoute path='/wishlist' component={WishListPage} />
        <ProtectedRoute path="/login" component={LoginPage} />
        <Route path="/forgot-password" render={props => <ForgotPasswordForm {...props} />}/>
        <ProtectedRoute path="/register" component={LoginPage} />
        <ProtectedRoute path="/your-style" component={YourStylePage} />
        <ProtectedRoute path="/your-style-cards" component={YourStyleCardsPage} />
        {/* <Route path='/help/:slug?' render={(props) => <HelpPage {...props}/>}/> */}
        <Route path='/about/:slug?' render={(props) => 
          <React.Fragment>
            <Suspense fallback={<LoadingModule />}>
              <AboutPageLazy {...props}/>
            </Suspense>
          </React.Fragment>
        }/>
        {/* <Route path='/user/:page?' render={(props) => <UserDashboard {...props} pageName="user-dashboard" />}/> */}
        <Route path="*" render={props => <FourZeroFour {...props} />}/>
      </Switch>
    </main>);
  
}

export default AppBody;
