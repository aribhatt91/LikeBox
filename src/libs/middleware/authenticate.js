import React from 'react'
import {
    Redirect
} from 'react-router-dom'

class Authenticate {
  routeToDisplay (middlewares = [], routeToVisit, directedFrom = '', extra = {}) {
    	const mware = {
        	privateRoute: (routeToVisit, directedFrom) => this.privateRoute(routeToVisit, ),
      		alreadyLoggedIn: (routeToVisit) => this.alreadyLoggedIn(routeToVisit),
            adminAccess: (routeToVisit) => this.adminAccess(routeToVisit),
            superAdminAccess: (routeToVisit, directedFrom) => this.superAdminAccess(routeToVisit, directedFrom),
        }
        let ret = null
       	try{
        	for (let i = 0; i < middlewares.length; i++) {
            	ret = mware[middlewares[i]](routeToVisit, directedFrom, extra)
                if (ret.status === false) {
                	break
                }
            }
            return ret.routeObject
        }catch(e){
        	//handle error here
        }
    }
    
    _getRouteReturn (status, routeObject) {
      return {status, routeObject}
    }
    
    adminAccess (component, pathname = '/') {
    //in my case i stored my allowed roles in array form in my db, yours could be       different
        if (utils.arrayContains(role, 'admin')) {
          return this._getRouteReturn(true, component)
        }
        return this._getRouteReturn(false,
          <Redirect to={{
            pathname: `${this._account_help}${Constants.userRoles.admin}`
          }} />)
      }
      
      privateRoute (component, pathname = '/') { 
        return (auth.fetchCurrentUser !== null
                ? this._getRouteReturn(true, component)
                : this._getRouteReturn(false,
                  <Redirect to={{
                    pathname: '/login',
                    state: { from: pathname }
                  }} />)
        )
      }
}