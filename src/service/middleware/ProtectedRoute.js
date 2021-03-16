import React, {useContext} from 'react';
import { getUserObject } from '../rx-store/dataStore';
import { Redirect, Route } from 'react-router-dom';
import LoginPage from './../../ui/pages/LoginPage';
import { AuthContext } from './../../store/contexts/AuthContext';

const ProtectedRoute = ({component: Component, path, ...rest}) => {
  
  const {currentUser} = useContext(AuthContext)
    //console.log('ProtectedRoute',getUserObject(), Component);
    return (
      <Route
        {...rest}
        render={
          props => {
            
            if(currentUser){
              if(Component === LoginPage){
                let redirectUrl = props.location.state && props.location.state.from ? props.location.state.from.pathname || '/' : '/';
                console.log('User is logged in: Redirecting from LoginPage to Home', currentUser, props);
                return <Redirect
                  to={
                    {
                      pathname: redirectUrl,
                      state: {
                        from: '/login'
                      }
                    }
                  }
                />
              }
              return <Component {...props}/>;
            }else {
              if(Component === LoginPage){
                console.log('User is not logged in: Allowing entry to LoginPage');
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

  export default ProtectedRoute;