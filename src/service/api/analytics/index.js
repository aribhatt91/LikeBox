import { firebaseAnalytics, firebaseAnalyticsEvents } from "../firebase";
import { GAProduct } from './../firestore/models/GAProduct';
/* 
Google Analytics event Reference
https://developers.google.com/gtagjs/reference/event
*/
const logEvent = (event_name, payload) => {
    console.log('logEvent', event_name, payload);
    firebaseAnalytics.logEvent(event_name, payload);
}

export const logPageView = (page_title, page_location="", page_path="") => {
    logEvent(firebaseAnalyticsEvents.PAGE_VIEW, {
        page_title,
        page_location,
        page_path
    });
}

export const logScreenView = (screen_name) => {
    logEvent(firebaseAnalyticsEvents.SCREEN_VIEW, {
        screen_name
    });
}
/* 
When user hit a search
*/
export const logSearch = (search_term) => {
    logEvent(firebaseAnalyticsEvents.SEARCH, {
        search_term
    });
}
/* 
When search results are presented
https://developers.google.com/gtagjs/reference/event#view_search_results
*/
export const logViewSearchResult = (search_term, items=[]) => {
    items = items.map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.VIEW_SEARCH_RESULTS, {
        search_term,
        items
    });
}
/* https://developers.google.com/gtagjs/reference/event#select_content */
export const logSelectContent = (item) => {
    const {item_id} =  GAProduct(item);
    logEvent(firebaseAnalyticsEvents.SELECT_CONTENT, {
        content_type: "product",
        item_id
    });
}

export const logSelectItem = (items=[]) => {
    items = items.map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.SELECT_ITEM, {
        content_type: "product",
        items
    });
}
export const logRelatedProducts = (items=[]) => {
    items = items.map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.SELECT_ITEM, {
        content_type: "product",
        items
    });
}

/* https://developers.google.com/gtagjs/reference/event#view_item */
export const logViewItems = (items=[]) => {
    items = items.map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.VIEW_ITEM, {
        items
    });
}

export const logViewItemsInCategory = (items=[]) => {
    items = items.map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.VIEW_ITEM_LIST, {
        items
    });
}

/* 
Generic
*/
export const logException = (e, fatal=false) => {
    logEvent(firebaseAnalyticsEvents.EXCEPTION, {
        description: e,
        fatal
    });
}
/* 
User login & sign-up
*/
export const logRegister = (method="email") => {
    logEvent(firebaseAnalyticsEvents.SIGN_UP, {
        method
    });
}
export const logSignIn = (method="email") => {
    logEvent(firebaseAnalyticsEvents.LOGIN, {
        method
    });
}

export const logAddToWishList = (item) => {
    item = GAProduct(item);
    let value = item.price || 0;
    logEvent(firebaseAnalyticsEvents.ADD_TO_WISHLIST, {
        currency: 'GBP',
        value,
        items: [item]
    });
}
export const logAddToCart = (item) => {
    item = GAProduct(item);
    let value = item.price || 0;
    logEvent(firebaseAnalyticsEvents.ADD_TO_CART, {
        currency: 'GBP',
        value,
        items: [item]
    });
}

export const logPurchase = (item) => {
    item = GAProduct(item);
    let value = item.price || 0;
    logEvent(firebaseAnalyticsEvents.PURCHASE, {
        currency: 'GBP',
        value,
        items: [item]
    });
}