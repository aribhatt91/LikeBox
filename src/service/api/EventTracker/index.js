import DataLayer from '../DataLayer';
import Events from './events.json';
import GAEventStore from '../Analytics';
import RecsApi from '../RecsApi';

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
        case Events.page.SEARCH_RESULT_EMPTY:
            /* (event_type, search_term) */
            //trackSearchResult(arguments[1]);
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
        case Events.product.SELECT_SIZE:
            trackProductVariantSelect(arguments[1]);
            break;
        case Events.transaction.ORDER_CONFIRM: //purchase 
            break;
        /* UI EVENTS */
        case Events.ui.HOME_PAGE_SUBSCRIPTION_CTA:
            break;
        case Events.ui.HOME_PAGE_TILE_CLICK:
            trackHomePageTilesClick();
            break;
        case Events.ui.NAVIGATION_ITEM_CLICK:
            trackNavigationItemClick();
            break;
        case Events.ui.NOTIFICATION_DISPLAYED:
            trackNotificationDisplayed();
            break;   
        case Events.ui.NOTIFICATION_CLICKED:
            trackNotificationClick();
            break;
        /* TRANSACTION EVENTS */
        case Events.transaction.VIEW_CART:
            /* (cart) */
            trackCartView(arguments[1]);
            break;
        case Events.transaction.UPDATE_CART:
            /* (cart) */
            updateCart(arguments[1]);
            break;
        case Events.transaction.START_CHECKOUT:
            /* (order_id) */
            trackStartCheckout(arguments[1]);
            break;
        case Events.transaction.START_CHECKOUT:
            /* (order_id) */
            trackStartCheckout(arguments[1]);
            break;
        case Events.transaction.SELECT_ADDRESS:
            /* (address) */
            trackSelectAddress(arguments[1]);
            break;
        case Events.transaction.SELECT_PAYMENT_METHOD:
            /* (payment_method) */
            trackSelectPaymentMethod(arguments[1]);
            break;
        case Events.transaction.SELECT_DELIVERY_OPTION:
            /* (delivery_option) */
            trackSelectDeliveryMethod(arguments[1]);
            break;   
        case Events.transaction.ORDER_CONFIRM:
            trackOrderConfirm(arguments[1]);
            break;
        case Events.transaction.CHECKOUT_ERROR:
            trackCheckoutError(arguments[1]);
            break;   
    }
}

const triggerEvent = (eventName) => {
    if(!eventName){
        return;
    }
    let event = new CustomEvent(eventName);
    document.dispatchEvent(event);
}

/* PAGE */
const trackPageView = (page_title, page_type) => {
    DataLayer.setPage(page_title, page_type);
    DataLayer.clearEvents();
    DataLayer.clearProduct();
    GAEventStore.logPageView(page_title);
    if(page_type === "home"){
        RecsApi.homePageView();
    }
}

const trackViewChange = (view_name) => {
    DataLayer.setView(view_name);
    GAEventStore.logScreenView(view_name);
    triggerEvent(Events.ui.VIEW_CHANGE);
}

const trackSearch = (search_term) => {
    DataLayer.setSearchTerm(search_term);
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
    DataLayer.setPage(product.title, 'product-page');
    DataLayer.setProduct(product);
    DataLayer.setView('product-page');
    RecsApi.detailPageView(product);
    triggerEvent(Events.product.PRODUCT_VIEW);
}

const trackProductVariantSelect = (product, variant) => {
    DataLayer.setProductEvent(Events.product.SELECT_SIZE, product);
}

const trackAddToWishList = (product) => {
    DataLayer.setProductEvent(Events.product.ADD_TO_WISHLIST, product);
    RecsApi.addToList(product);
    triggerEvent(Events.product.ADD_TO_WISHLIST);
}

const trackRemoveFromWishList = (product) => {
    DataLayer.setProductEvent(Events.product.REMOVE_FROM_WISHLIST, product);
    RecsApi.removeFromList(product);
    triggerEvent(Events.product.REMOVE_FROM_WISHLIST);
}

/* USER PROFILE*/
const trackCardSwipe = (products=[], right=true) => {
    
}
const trackAuthState = (user) => {
    DataLayer.setUser(user);
    GAEventStore.USER_EVENTS.setUserId(user.uid);
}
const trackSignupStart = () => {
}
const trackSignupComplete = (method="password") => {
    GAEventStore.logRegister(method);
    DataLayer.setView('registration-complete');
    triggerEvent(Events.ui.VIEW_CHANGE);
}
const trackSignupError = (error) => {
    GAEventStore.logException(error.message);
}
const trackLoginStart = () => {
}
const trackLoginComplete = (method="password") => {
    GAEventStore.logSignIn(method);
    DataLayer.setView('login-complete');
    triggerEvent(Events.ui.VIEW_CHANGE);
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
const trackNotificationClick = () => {}

const trackNotificationDisplayed = () => {}



/* TRANSACTION & CART ---- DEV MODE */

const trackAddToCart = (product, cart) => {
    DataLayer.setProductEvent(Events.product.ADD_TO_CART, product);
    RecsApi.addToCart(product);
    updateCart(cart);
    triggerEvent(Events.product.ADD_TO_CART);
}
const trackRemoveFromCart = (product, cart) => {
    DataLayer.setProductEvent(Events.product.REMOVE_FROM_CART, product);
    RecsApi.removeFromCart(product);
    updateCart(cart);
    triggerEvent(Events.product.REMOVE_FROM_CART);
}
const updateCart = (cart) => {
    if(cart){
        DataLayer.setCart(cart);
    }
}

const trackCartView = (cart) => {
    updateCart(cart);
    triggerEvent(Events.transaction.VIEW_CART);
}

const trackStartCheckout = (cart) => {
    DataLayer.initTransaction();
}

const trackSelectAddress = (address) => {
    
}

const trackSelectPaymentMethod = (payment_method) => {

}

const trackSelectDeliveryMethod = (delivery_option) => {

}

const trackOrderConfirm = () => {
    DataLayer.clearCart();
}

const trackCheckoutError = (error) => {

}

/* ---- DEV MODE ---- */


/* Export EventTracker */
const EventTracker = {
    trackEvent,
    events: Events
}
export default EventTracker;