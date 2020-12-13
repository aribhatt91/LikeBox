import React from 'react';
import { getUserObject } from '../rx-store/dataStore';
import { Redirect, Route } from 'react-router-dom';
import LoginPage from './../../ui/pages/LoginPage';

const ProtectedRoute = ({component: Component, ...rest}) => {
    //console.log('ProtectedRoute',getUserObject(), Component);
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
                      state: {
                        from: props.location
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