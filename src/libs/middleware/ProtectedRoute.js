import React, {useContext} from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import LoginPage from '../../ui/pages/LoginPage';
import { AuthContext } from '../store/contexts/AuthContext';
import ForgotPasswordForm from '../../ui/components/_forms/ForgotPasswordForm';

const ProtectedRoute = ({component: Component, path, ...rest}) => {
  let location = useLocation();
  
  const {currentUser, pendingAuthentication} = useContext(AuthContext)
    window.loginfo('ProtectedRoute::pendingAuthentication', pendingAuthentication);
    return (
      <Route
        {...rest}
        render={
          props => {
            
            if(currentUser || pendingAuthentication){
              if(Component === LoginPage && props.location.pathname === '/login'){
                let redirectUrl = props.location.state && props.location.state.from ? props.location.state.from.pathname || '/' : '/';
                window.loginfo('User is logged in: Redirecting from LoginPage to Home', currentUser, props);
                return <Redirect
                  to={
                    {
                      pathname: redirectUrl,
                      state: {
                        from: location.pathname
                      }
                    }
                  }
                />
              }
              return <Component {...props}/>;
            }else {
              if(Component === LoginPage){
                window.loginfo('User is not logged in: Allowing entry to LoginPage');
                return <Component {...props}/>;
              }else if(Component === ForgotPasswordForm) {
                window.loginfo('User is not logged in: Allowing entry to ForgotPasswordForm');
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