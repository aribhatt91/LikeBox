import { sendEvent, setProp } from '../GtagHelper';
//import { firebaseAnalytics, firebaseAnalyticsEvents } from "../../firebase";
//https://firebase.google.com/docs/analytics/user-properties?platform=web
export default {
    setUserId: (uid) => {
        //firebaseAnalytics.setUserId(uid);
        setProp("user_id", uid);

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
    logSignUpStart: () => {
        sendEvent("sign_up_start", {event_category: 'engagement'});
    },
    logSignUp: (method="password") => {
        sendEvent("sign_up", {method, event_category: 'engagement'});
    },
    logSignUpError: (method="password") => {
        sendEvent("sign_up_error", {method, event_category: 'engagement'});
    },
    logSignInStart: (method="password") => {
        sendEvent("login_start", {method, event_category: 'engagement'});
    },
    logSignIn: (method="password") => {
        sendEvent("login", {method, event_category: 'engagement'});
    },
    logSignInError: () => {
        sendEvent("login_error", {event_category: 'engagement'});
    },
    logSignOut: () => {
        sendEvent("sign_out", {event_category: 'engagement'});
    }
}