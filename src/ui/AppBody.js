import React, {Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import FourZeroFour from './pages/FourZeroFour';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './../service/middleware/ProtectedRoute';
import WishListPage from './pages/WishList';

import YourStyle from './pages/YourStyle';
import YourStyleCards from './pages/YourStyleCards';
import LoadingModule from './components/LoadingModule';

const ProductPageLazy = React.lazy(() => import('./pages/ProductPage/index.js'));
const CategoryPageLazy = React.lazy(() => import('./pages/CategoryPage/index.js'));
const AboutPageLazy = React.lazy(() => import('./pages/About'))
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
        
        <ProtectedRoute path='/user/:slug?' component={UserDashboard} />
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
        {/* <Route path='/user/:page?' render={(props) => <UserDashboard {...props} pageName="user-dashboard" />}/> */}
        <Route path="*" render={props => <FourZeroFour {...props} />}/>
      </Switch>
    </main>);
  
}

export default AppBody;
