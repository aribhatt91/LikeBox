import React, {Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './../libs/middleware/ProtectedRoute';
import WishListPage from './pages/WishList';

import YourStyle from './pages/YourStyle';
import YourStyleCards from './pages/YourStyleCards';
import LoadingModule from './components/LoadingModule';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import UIPlayground from './pages/UIPlayground';

const ProductPageLazy = React.lazy(() => import('./pages/ProductPage/index.js'));
const CategoryPageLazy = React.lazy(() => import('./pages/CategoryPage/index.js'));
const AboutPageLazy = React.lazy(() => import('./pages/About'));
const FourZeroFourLazy = React.lazy(() => import('./pages/404/index.js'))

function AppBody (){
    return (<main className="App-body">
      <Switch>
        <Route exact path='/' render={(props) => <Home {...props}/>}/>
        <Route path='/products/:category/:page?' render={(props) => 
            <React.Fragment>
              <Suspense fallback={<LoadingModule />}>
                <CategoryPageLazy {...props}/>
              </Suspense>
            </React.Fragment>
          }/>
        <Route path='/search' render={(props) => 
            <React.Fragment>
              <Suspense fallback={<LoadingModule />}>
                <CategoryPageLazy {...props}/>
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

        {/* <ProtectedRoute path='/cart' component={CartPage}/>
        <ProtectedRoute path='/checkout' component={CheckoutPage}/> */}
        
        <ProtectedRoute path='/user/:slug?/:topic?' component={UserDashboard} />
        <ProtectedRoute path='/wishlist' component={WishListPage} />
        <ProtectedRoute path="/login" component={LoginPage} />
        <ProtectedRoute path="/forgot-password" component={LoginPage} />
        <ProtectedRoute path="/register" component={LoginPage} />
        <ProtectedRoute path="/your-style" component={YourStyle} />
        <ProtectedRoute path="/your-style-cards" component={YourStyleCards} />

        {/* <Route path='/help/:slug?' render={(props) => <HelpPage {...props}/>}/> */}
        <Route path='/about/:slug?' render={(props) => 
          <React.Fragment>
            <Suspense fallback={<LoadingModule />}>
              <AboutPageLazy {...props}/>
            </Suspense>
          </React.Fragment>
        }/>
        
        {
          /*  */
          process.env.REACT_APP_ENV === 'dev' && <ProtectedRoute path="/cart" component={Cart} />
        }
        {
          /*  */
          process.env.REACT_APP_ENV === 'dev' && <ProtectedRoute path="/checkout" component={Checkout} />
        }

        
        {
          /*Plyground to test and showcase UI Components*/
          process.env.REACT_APP_ENV === 'dev' && <Route path='/playground' component={UIPlayground}/>
        }

        {/* <Route path='/user/:page?/:topic?' render={(props) => <UserDashboard {...props} pageName="user-dashboard" />}/> */}
        <Route path='*' render={(props) => 
          <React.Fragment>
            <Suspense fallback={<LoadingModule />}>
              <FourZeroFourLazy {...props}/>
            </Suspense>
          </React.Fragment>
        }/>
      </Switch>
    </main>);
  
}

export default AppBody;
