import React, {useContext} from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import LoginPage from './../../ui/pages/LoginPage';
import { AuthContext } from './../../store/contexts/AuthContext';
import ForgotPasswordForm from '../../ui/components/forms/ForgotPasswordForm';

const ProtectedRoute = ({component: Component, path, ...rest}) => {
  let location = useLocation();
  
  const {currentUser} = useContext(AuthContext)
    //window.mlog('ProtectedRoute',getUserObject(), Component);
    return (
      <Route
        {...rest}
        render={
          props => {
            
            if(currentUser){
              if(Component === LoginPage && props.location.pathname === '/login'){
                let redirectUrl = props.location.state && props.location.state.from ? props.location.state.from.pathname || '/' : '/';
                window.mlog('User is logged in: Redirecting from LoginPage to Home', currentUser, props);
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
                window.mlog('User is not logged in: Allowing entry to LoginPage');
                return <Component {...props}/>;
              }else if(Component === ForgotPasswordForm) {
                window.mlog('User is not logged in: Allowing entry to ForgotPasswordForm');
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