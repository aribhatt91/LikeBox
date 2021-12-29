import DataLayer from '../DataLayer';
import Events from './events.json';
import GAEventStore from '../analytics';
import RecsApi from '../recommendations';

const trackEvent = function() {
    const event = arguments[0],
    payload = arguments[1];
    window.mlog('api:EventTracker:trackEvent', arguments);
    switch (event) {
        /* PAGE EVENTS */
        case Events.page.PAGE_VIEW:
            /* (event_type, page_title, page_type) */
            const page_title = arguments[1], page_type = arguments[2];
            trackPageView(page_title, page_type);
            if(page_type && page_type === 'category-page'){
                trackCategoryPage(page_title);
            }else if(page_type && page_type === '404'){
                trackErrorPage();
            }else if(page_type && page_type === 'home-page'){
                trackHomePage();
            }
            break;
        case Events.page.VIEW_CHANGE:
            /* (event_type, view_name) */
            trackViewChange(arguments[1]);
            break;
        case Events.page.SEARCH:
            /* (event_type, search_term) */
            trackSearch(arguments[1]);
            break;
        case Events.page.SEARCH_RESULT:
            /* (event_type, search_term, search_result=[]) */
            trackSearchResult(arguments[1], arguments[2]);
            break;
        /* USER EVENTS */
        case Events.user.LOGIN_START:
            trackLoginStart();
            break;
        case Events.user.LOGIN_COMPLETE:
            /* (event_type, login_method="password") */
            trackLoginComplete(arguments[1])
            break;
        case Events.user.LOGIN_ERROR:
            trackLoginError(arguments[1]);
            break;
        case Events.user.SIGNUP_START:
            trackSignupStart();
            break;
        case Events.user.SIGNUP_COMPLETE:
            /* (event_type, login_method="password") */
            trackSignupComplete();
            break;
        case Events.user.SIGNUP_ERROR:
            trackSignupError(arguments[1]);
            break;
        case Events.user.AUTHENTICATED:
            /* (event_type, user) */
            trackAuthState(arguments[1]);
            break;
        case Events.user.AUTHENTICATTION_ERROR:
            break;
        case Events.user.UPDATE_STYLE:
            /* (event_type, styles=[]) */
            trackUpdateStyles(arguments[1]);
            break;
        case Events.user.UPDATE_PROFILE:
            break;
        case Events.user.LOGOUT:
            trackLogout();
            break;
        /* PRODUCT EVENTS */
        case Events.product.PRODUCT_VIEW:
            /* (event_type, product) */
            trackProductView(arguments[1]);
            break;
        case Events.product.ADD_TO_CART:
            trackAddToCart(arguments[1], arguments[2]);
            break;
        case Events.product.REMOVE_FROM_CART:
            trackRemoveFromCart(arguments[1], arguments[2]);
            break;
        case Events.product.UPDATE_CART:
            updateCart(arguments[1]);
            break;
        case Events.product.ADD_TO_WISHLIST:
            trackAddToWishList(arguments[1]);
            break;
        case Events.product.REMOVE_FROM_WISHLIST:
            trackRemoveFromWishList(arguments[1]);
            break;
        case Events.product.ADD_TO_FAVOURITE:
            break;
        case Events.product.REMOVE_FROM_FAVOURITE:
            break;
        case Events.transaction.ORDER_CONFIRM: //purchase 
            break;
        /* UI EVENTS */
        case Events.ui.HOME_PAGE_SUBSCRIPTION_CTA:
            break;
        case Events.ui.HOME_PAGE_TILE_CLICK:
            break;
        case Events.ui.NAVIGATION_ITEM_CLICK:
            break;
        case Events.ui.NOTIFICATION_DISPLAYED:
            break;   
        case Events.ui.NOTIFICATION_CLICKED:
            break;   
    }
}

/* PAGE */
const trackPageView = (page_title, page_type) => {
    DataLayer.setPage(page_title, page_type);
    GAEventStore.logPageView(page_title);
    if(page_type === "home"){
        RecsApi.homePageView();
    }
}

const trackViewChange = (view_name) => {
    GAEventStore.logScreenView(view_name);
    DataLayer.setView(view_name);
}

const trackSearch = (search_term) => {
    GAEventStore.logSearch(search_term);
    RecsApi.search(search_term);
}

const trackSearchResult = (search_term, search_result=[]) => {
    if(search_result && search_result.length){
        GAEventStore.logViewSearchResult(search_term, search_result);
        GAEventStore.logViewItemsInCategory(search_term, search_result);
    }
}
const trackErrorPage = () => {
    DataLayer.setErrorPage();
}
const trackHomePage = () => {
    //DataLayer;
    RecsApi.homePageView();
}

/* PRODUCT */
const trackCategoryPage = (category) => {
    RecsApi.categoryPageView(category);
}
const trackProductView = (product) => {
    DataLayer.setProduct(product);
    RecsApi.detailPageView(product);
}

const trackAddToWishList = (product) => {
    RecsApi.addToList(product);
}

const trackRemoveFromWishList = (product) => {
    RecsApi.removeFromList(product);
}

const trackAddToCart = (product, cart) => {
    RecsApi.addToCart(product);
    updateCart(cart);
}
const trackRemoveFromCart = (product, cart) => {
    RecsApi.removeFromCart(product);
    updateCart(cart);
}
const updateCart = (cart) => {
    if(cart){
        DataLayer.setCart(cart);
    }
}

/* USER */
const trackCardSwipe = (products=[], right=true) => {
    
}
const trackAuthState = (user) => {
    DataLayer.setUser({
        id: user.uid,
        email: user.email
    });
    GAEventStore.USER_EVENTS.setUserId(user.uid);
}
const trackSignupStart = () => {
}
const trackSignupComplete = (method="password") => {
    GAEventStore.logRegister(method);
}
const trackSignupError = (error) => {
    GAEventStore.logException(error.message);
}
const trackLoginStart = () => {
}
const trackLoginComplete = (method="password") => {
    GAEventStore.logSignIn(method);
}
const trackLoginError = (error) => {
    GAEventStore.logException(error.message);
}
const trackUpdateStyles = (styles=[]) => {
    if(styles && styles.length){
        GAEventStore.USER_EVENTS.setUserStyles(styles);
    }
}
const trackLogout = () => {
    DataLayer.clearUser();
}
/* UI */
const trackNavigationItemClick = (section) => {
    GAEventStore.UI_EVENTS.logOpenNavigation(section);
}
const trackMobileNavigationItemClick = (section) => {
    GAEventStore.UI_EVENTS.logOpenNavigation(section);
}
const trackHomePageTilesClick = () => {
    GAEventStore.UI_EVENTS.logHomePageTilesClick();
}

const EventTracker = {
    trackEvent,
    events: Events
}
export default EventTracker;