import { logEvent, firebaseAnalyticsEvents } from "../firebase";
import { GAProduct } from './../firestore/models/GAProduct';
import UI_EVENTS from './ui';
import USER_EVENTS from './user';
import CUSTOM_EVENTS from './custom';

/* 
Google Analytics event Reference
https://developers.google.com/gtagjs/reference/event

GTAG Events
https://developers.google.com/tag-platform/gtagjs/reference/events
*/
/* const logEvent = (event_name, payload) => {
    window.mlog('logEvent', event_name, payload);
    firebaseAnalytics.logEvent(event_name, payload);
} */

const logPageView = (page_title) => {
    logEvent(firebaseAnalyticsEvents.PAGE_VIEW, {
        page_title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        language: "en_gb"
    });
}

const logScreenView = (screen_name) => {
    logEvent(firebaseAnalyticsEvents.SCREEN_VIEW, {
        screen_name
    });
}
/* 
When user hit a search
*/
const logSearch = (search_term) => {
    logEvent(firebaseAnalyticsEvents.SEARCH, {
        search_term
    });
}
/* 
When search results are presented
https://developers.google.com/gtagjs/reference/event#view_search_results
*/
const logViewSearchResult = (search_term, items=[]) => {
    items = (items || []).map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.VIEW_SEARCH_RESULTS, {
        search_term,
        items
    });
}
/* https://developers.google.com/gtagjs/reference/event#select_content */
const logSelectContent = (item) => {
    const {item_id} = GAProduct(item);
    logEvent(firebaseAnalyticsEvents.SELECT_CONTENT, {
        content_type: "product",
        item_id
    });
}

const logSelectItem = (items=[]) => {
    items = (items || []).map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.SELECT_ITEM, {
        content_type: "product",
        items
    });
}
const logRelatedProducts = (items=[]) => {
    items = (items || []).map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.SELECT_ITEM, {
        content_type: "product",
        items
    });
}

/* https://developers.google.com/gtagjs/reference/event#view_item */
const logViewItems = (items=[]) => {
    items = (items || []).map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.VIEW_ITEM, {
        items
    });
}

const logViewItemsInCategory = (items=[]) => {
    items = (items||[]).map(item => GAProduct(item));
    logEvent(firebaseAnalyticsEvents.VIEW_ITEM_LIST, {
        items
    });
}

/* 
Generic
*/
const logException = (e, fatal=false) => {
    logEvent(firebaseAnalyticsEvents.EXCEPTION, {
        description: e,
        fatal
    });
}
/* 
User login & sign-up
*/
const logRegister = (method="email") => {
    logEvent(firebaseAnalyticsEvents.SIGN_UP, {
        method
    });
}
const logSignIn = (method="email") => {
    logEvent(firebaseAnalyticsEvents.LOGIN, {
        method
    });
}

const logAddToWishList = (item) => {
    item = GAProduct(item);
    let value = item.price || 0;
    logEvent(firebaseAnalyticsEvents.ADD_TO_WISHLIST, {
        currency: 'GBP',
        value,
        items: [item]
    });
}
const logAddToCart = (item) => {
    item = GAProduct(item);
    let value = item.price || 0;
    logEvent(firebaseAnalyticsEvents.ADD_TO_CART, {
        currency: 'GBP',
        value,
        items: [item]
    });
}

const logPurchase = (item) => {
    item = GAProduct(item);
    let value = item.price || 0;
    logEvent(firebaseAnalyticsEvents.PURCHASE, {
        currency: 'GBP',
        value,
        affiliation: item.affiliation,
        transaction_id: ('T_' + Math.floor(Math.random() * (10000 - 1) + 1)),
        items: [item]
    });
}

const GAEventStore = {
    logPageView,
    logScreenView,
    logSearch,
    logViewSearchResult,
    logSelectContent,
    logSelectItem,
    logRelatedProducts,
    logViewItems,
    logViewItemsInCategory,
    logAddToCart,
    logAddToWishList,
    logPurchase,
    logRegister,
    logSignIn,
    logException,
    UI_EVENTS,
    CUSTOM_EVENTS,
    USER_EVENTS
}

export default GAEventStore;