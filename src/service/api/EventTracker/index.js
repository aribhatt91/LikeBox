import DataLayer from '../DataLayer';

const Events = {
    PageView: 'page-view',
    ProductView: 'prod-view',
}
const logEvent = (event, payload) => {
    switch (event) {
        case 'page-view':
            trackPageView(payload);
            break;
        case 'prod-view':
            break;
        case 'search':
            
            break;
        case 'login':
            break;
        case 'signup':
            break;
        case 'signup-form-start':
            break;
        case 'signup-form-error':
            break;
        case 'add-to-cart':
            break;
        case 'remove-from-cart':
            break;
        case 'add-to-wishlist':
            break;
        case 'remove-from-wishlist':
            break;
        case 'purchase': 
            break;
        case 'view-change':
            break;
    }
}
const trackPageView = (pageName) => {

}

const trackAddToWishList = (product) => {

}

const trackAddToCart = (product) => {

}

const trackStylePreference = (styles=[]) => {

}

const trackCardSwipe = (products=[]) => {
    
} 

export default {
    logEvent
}