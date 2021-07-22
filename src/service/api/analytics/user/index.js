import { firebaseAnalytics } from "../../firebase";
//https://firebase.google.com/docs/analytics/user-properties?platform=web
export const setUserId = (uid) => {
    firebaseAnalytics.setUserId(uid);
}
//firebase.analytics().setUserProperties({favorite_food: 'apples'});
export const setUserStyles = (styles=[]) => {
    firebaseAnalytics.setUserProperties({styles});
}

export const setUserBox = (favourites=[]) => {
    firebaseAnalytics.setUserProperties({favourites});
}

export const setUserSizes = (sizes=[]) => {
    firebaseAnalytics.setUserProperties({sizes});
}

export const setUserDetails = ({age, gender}) => {
    firebaseAnalytics.setUserProperties({age, gender});
}