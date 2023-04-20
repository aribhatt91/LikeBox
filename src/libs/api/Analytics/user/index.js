import { sendEvent, setProp } from '../GtagHelper';
//import { firebaseAnalytics, firebaseAnalyticsEvents } from "../../firebase";
//https://firebase.google.com/docs/analytics/user-properties?platform=web
export default {
    setUserId: (uid) => {
        //firebaseAnalytics.setUserId(uid);
        //setProp("user_id", uid);
        if(uid){
            sendEvent('authenticated', {'user.id': uid, 'user.status': 'authenticated'});
        }
    },
    //firebase.analytics().setUserProperties({favorite_food: 'apples'});
    setUserStyles: (styles=[]) => {
        //firebaseAnalytics.setUserProperties({styles});
    }, 
    setUserBox: (favourites=[]) => {
        //firebaseAnalytics.setUserProperties({favourites});
    },
    setUserSizes: (sizes=[]) => {
        //firebaseAnalytics.setUserProperties({sizes});
    },
    setUserDetails: ({age, gender}) => {
        //firebaseAnalytics.setUserProperties({age, gender});
    },
    logSignUpStart: (method="password") => {
        sendEvent("sign_up_start", {'user.method': method, event_category: 'engagement'});
    },
    logSignUp: (method="password") => {
        sendEvent("sign_up", {'user.method': method, event_category: 'engagement'});
    },
    logSignUpError: (method="password") => {
        sendEvent("sign_up_error", {'user.method': method, event_category: 'engagement'});
    },
    logSignInStart: (method="password") => {
        sendEvent("login_start", {'user.method': method, event_category: 'engagement'});
    },
    logSignIn: (method="password") => {
        sendEvent("login", {'user.method': method, event_category: 'engagement'});
    },
    logSignInError: (method="password") => {
        sendEvent("login_error", {'user.method': method, event_category: 'engagement'});
    },
    logUpdateAddressStart: (event) => {
        sendEvent(event.replace(/-/g, '_'), {event_category: 'engagement'});
    },
    logUpdateAddressSuccess: (event) => {
        sendEvent(event.replace(/-/g, '_'), {event_category: 'engagement'});
    },
    logUpdateAddressError: (event) => {
        sendEvent(event.replace(/-/g, '_'), {event_category: 'engagement'});
    },
    logSignOut: () => {
        sendEvent("sign_out", {event_category: 'engagement'});
    }
}