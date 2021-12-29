import { firebaseAnalytics } from "../../firebase";
//https://firebase.google.com/docs/analytics/user-properties?platform=web
export default {
    setUserId: (uid) => {
        firebaseAnalytics.setUserId(uid);
    },
    //firebase.analytics().setUserProperties({favorite_food: 'apples'});
    setUserStyles: (styles=[]) => {
        firebaseAnalytics.setUserProperties({styles});
    }, 
    setUserBox: (favourites=[]) => {
        firebaseAnalytics.setUserProperties({favourites});
    },
    setUserSizes: (sizes=[]) => {
        firebaseAnalytics.setUserProperties({sizes});
    },
    setUserDetails: ({age, gender}) => {
        firebaseAnalytics.setUserProperties({age, gender});
    }
}