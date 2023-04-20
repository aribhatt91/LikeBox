import DataLayer from '../DataLayer';
import Events from './events.json';
import GAEventStore from '../Analytics';
import RecsApi from '../RecsApi';
import { LOGIN_ERROR } from '../../store/actions';

const dataLayer = new DataLayer();

const trackEvent = function() {
    const event = arguments[0],
    payload = arguments[1];
    window.loginfo('api:EventTracker:trackEvent::', event, payload);
    switch (event) {
        /* AUTO EVENTS */
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
            trackSearchResult(arguments[1]);
            break;

        /* USER EVENTS */
        case Events.user.LOGIN_START:
            trackLoginStart(arguments[1]);
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
        case Events.auto.AUTHENTICATED:
            /* (event_type, user) */
            trackAuthState(arguments[1]);
            break;
        case Events.auto.AUTHENTICATTION_ERROR:
            trackLoginError();
            break;
        case Events.user.UPDATE_STYLE:
            /* (event_type, styles=[]) */
            trackUpdateStyles(arguments[1]);
            break;
        case Events.user.UPDATE_STYLE_ERROR:
            /* (event_type, styles=[]) */
            //trackUpdateStyles(arguments[1]);
            break;
        case Events.user.UPDATE_PROFILE:
            trackUpdateProfile();
            break;
        case Events.user.UPDATE_PROFILE_ERROR:
            trackUpdateProfileError(arguments[0]);
            break;
        case Events.user.UPDATE_ADDRESS_START:
            trackUpdateAddressStart();
            break;
        case Events.user.UPDATE_ADDRESS_SUCCESS:
            trackUpdateAddressSuccess();
            break;
        case Events.user.UPDATE_ADDRESS_ERROR:
            trackUpdateAddressError(arguments[0]);
            break;
        case Events.user.UPDATE_MEASUREMENTS_SUCCESS:
            trackUpdateMeasurementsSuccess();
            break;
        case Events.user.UPDATE_MEASUREMENTS_ERROR:
            trackUpdateMeasurementsError(arguments[0]);
            break;
        case Events.user.LOGOUT:
            trackLogout();
            break;
        /* --- */
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
        /* --- */
        /* UI EVENTS */
        case Events.ui.HOME_PAGE_SUBSCRIPTION_CTA:
            break;
        case Events.ui.HOME_PAGE_TILE_CLICK:
            trackHomePageTilesClick();
            break;
        case Events.ui.NAVIGATION_PANEL_OPEN:
            trackNavigationPanelOpen();
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
        /* --- */
        /* TRANSACTION EVENTS */
        case Events.auto.FETCH_CART:
            /* (cart) */
            updateCart(arguments[1]);
            break;
        case Events.auto.FETCH_CART_ERROR:
            /* (cart) */
            //updateCart(arguments[1]);
            trackCartError(Events.auto.FETCH_CART_ERROR);
            break;
        case Events.transaction.VIEW_CART:
            /* (cart) */
            trackCartView(arguments[1]);
            break;
        case Events.transaction.UPDATE_CART:
            /* (cart) */
            updateCart(arguments[1]);
            break;
        case Events.transaction.UPDATE_CART_ERROR:
            /* (cart) */
            //updateCart(arguments[1]);
            trackCartError(Events.transaction.UPDATE_CART_ERROR);
            break;
        case Events.transaction.START_CHECKOUT:
            /* (cart) */
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
            /* (delivery_option, cost) */
            trackSelectDeliveryOption(arguments[1], arguments[2]);
            break;   
        case Events.transaction.ORDER_CONFIRM:
            trackOrderConfirm(arguments[1]);
            break;
        case Events.transaction.CHECKOUT_ERROR:
            trackCheckoutError(arguments[1]);
            break;   
    }
}

/* PAGE */
const trackPageView = (title, page_type) => {
    //let referrer = window[DATA_LAYER_NAME]['page'] ? window[DATA_LAYER_NAME]['page'].path || "" : "";
    //referrer = referrer || document.referrer || "";
    const domain = window.location.hostname,
    environment = domain.indexOf('likebox.co.uk') > -1 ? 'production' : (domain.indexOf('localhost') > -1 ? 'development' : 'staging');


    dataLayer.clearEvents();
    dataLayer.remove('product');

    dataLayer.push([
    {
        event: Events.page.PAGE_VIEW,
        data: {
            page: {
                path: window.location.pathname,
                title,
                section: page_type,
                view: page_type,
                url: (window.location.href || "").replace(window.location.search, '').replace('?', '').replace(window.location.hash, '')
            }
        },
        merge: false
    }, 
    {
        data: {
            site: {
                domain,
                language: "en",
                environment
            }
        }
    }]);
    GAEventStore.PAGE_EVENTS.logPageView();

    if(page_type === "home"){
        RecsApi.homePageView();
    }
}

const trackViewChange = (view) => {
    dataLayer.clearEvents();
    dataLayer.push({
        event: Events.page.VIEW_CHANGE,
        data: {
            page: {
                view
            }
        }
    })
    
    GAEventStore.PAGE_EVENTS.logScreenView(view);
}

const trackSearch = (query) => {
    dataLayer.push({
        search: {
            query,
            type: 'internal'
        }
    });
    GAEventStore.PAGE_EVENTS.logSearch(query);
    RecsApi.search(query);
}

const trackSearchResult = (query, result=[]) => {

    let name;

    if(result && result.length > 0){
        GAEventStore.PAGE_EVENTS.logViewSearchResult(query, result);
        GAEventStore.PRODUCT_EVENTS.logViewItemsInCategory(query, result);
        name = Events.page.SEARCH_RESULT;
        
    }else {
        name = Events.page.SEARCH_RESULT_EMPTY;
    }
    
    dataLayer.push({
        name,
        data: {
            search: {
                query,
                type: 'internal',
                results: result.length
            }
        }
    });
}
const trackErrorPage = () => {    
    dataLayer.push({
        event: Events.page.PAGE_NOT_FOUND,
        data: {
            page: {
                errorPage: 'errorPage'
            }
        },
        merge: false
    }, false);
}
const trackHomePage = () => {
    RecsApi.homePageView();
}

/* PRODUCT */
const trackCategoryPage = (category) => {
    RecsApi.categoryPageView(category);
}
const trackProductView = (product) => {

    trackPageView(product.title, 'product-page');

    dataLayer.push([
    {
        event: Events.product.PRODUCT_VIEW,
        data: {
            product
        },
        merge: false
    }]);

    GAEventStore.PRODUCT_EVENTS.logViewItem(product);
    RecsApi.detailPageView(product);
}

const trackProductVariantSelect = (variant) => {
    const {size} = variant;
    dataLayer.push([{
        event: Events.product.SELECT_SIZE,
        data: {
            variant
        },
        update: false
    },
    {
        data: {
            product: {
                size
            }
        }
    }])
}

const trackAddToWishList = (product) => {
    GAEventStore.PRODUCT_EVENTS.logAddToWishList(product);
    RecsApi.addToList(product);
    dataLayer.push({
        event: Events.product.ADD_TO_WISHLIST,
        data: {
            product
        },
        update: false
    })
}

const trackRemoveFromWishList = (product) => {
    RecsApi.removeFromList(product);
    dataLayer.push({
        event: Events.product.REMOVE_FROM_WISHLIST,
        data: {
            product
        },
        update: false
    })
}

/* USER PROFILE*/
const trackLikes = (products=[]) => {
    
}
const trackDislikes = (products=[]) => {

    
}
const trackAuthState = (user) => {
    if(user && user.uid && window.localStorage){
        dataLayer.push({
            event: Events.auto.AUTHENTICATED,
            data: {
                user: {
                    id: user.uid, 
                    event: user.displayName, 
                    status: 'logged-in'
                }
            },
            merge: false
        })
        GAEventStore.USER_EVENTS.setUserId(user.uid);
        window.localStorage.setItem('__userId__', user.uid);
    }
}
const trackSignupStart = (method="password") => {
    dataLayer.push([{
        event: Events.user.APPLICATION_START,
        data: {
            form: {
                event: 'registration-form',
                data: {
                    method
                }
            }
        },
        merge: false
    }, 
    {
        data: {
            user: {
                method
            }
        }
    }])
    GAEventStore.USER_EVENTS.logSignUpStart();
}

const trackSignupComplete = (method="password") => {
    dataLayer.push([{
        event: Events.user.APPLICATION_COMPLETE,
        data: {
            form: {
                event: 'registration-form',
                data: {
                    method
                }
            }
        },
        merge: false
    },
    {
        data: {
            user: {
                method
            }
        }
    },
    {
        event: Events.ui.VIEW_CHANGE,
        data: {
            page: {
                view: 'registration-complete'
            }
        }
    }])
    GAEventStore.USER_EVENTS.logSignUp(method);
    GAEventStore.UI_EVENTS.logFormSubmission('registration-form');
}
const trackSignupError = (error) => {
    dataLayer.push({
        event: Events.user.APPLICATION_ERROR,
        data: {
            form: {
                event: 'registration-form',
                data: {
                    error
                }
            }
        },
        merge: false
    })
    GAEventStore.logException(error.message);
    GAEventStore.USER_EVENTS.logSignUpError();
    GAEventStore.UI_EVENTS.logFormError('registration-form', error.message);
}
const trackLoginStart = (method) => {
    dataLayer.push({
        event: Events.user.APPLICATION_START,
        data: {
            form: {
                event: 'login-form',
                data: {
                    method
                }
            }
        },
        merge: false
    });
    GAEventStore.USER_EVENTS.logSignInStart(method);
}
const trackLoginComplete = (method="password") => {
    dataLayer.push([{
        event: Events.user.APPLICATION_COMPLETE,
        data: {
            form: {
                event: 'login-form',
                data: {
                    method
                }
            }
        },
        merge: false
    },
    {
        data: {
            user: {
                method
            }
        }
    },
    {
        event: Events.ui.VIEW_CHANGE,
        data: {
            page: {
                view: 'login-complete'
            }
        }
    }]);
    GAEventStore.USER_EVENTS.logSignIn(method);
    GAEventStore.UI_EVENTS.logFormSubmission('login-form');
    
}
const trackLoginError = (error) => {

    dataLayer.push({
        event: Events.user.APPLICATION_ERROR,
        data: {
            form: {
                event: 'login-form',
                data: {
                    error
                }
            }
        },
        merge: false
    });

    GAEventStore.logException(error.message);
    GAEventStore.USER_EVENTS.logSignInError();
    GAEventStore.UI_EVENTS.logFormError('login-form', error.message);
}
const trackUpdateStyles = (styles=[]) => {
    if(styles && styles.length){
        dataLayer.push({
            event: Events.user.APPLICATION_COMPLETE,
            data: {
                form: {
                    event: 'styles-form',
                    data: {
                        styles
                    }
                }
            },
            merge: false
        });
        GAEventStore.USER_EVENTS.setUserStyles(styles);
        GAEventStore.UI_EVENTS.logFormSubmission('styles-form');
    }
}
const trackUpdateProfile = () => {
    dataLayer.push({
        event: Events.user.APPLICATION_COMPLETE,
        data: {
            form: {
                event: 'profile-update-form'
            }
        },
        merge: false
    });
    GAEventStore.UI_EVENTS.logFormSubmission('profile-update-form');
}
const trackUpdateProfileError = (error) => {
    dataLayer.push({
        event: Events.user.APPLICATION_ERROR,
        data: {
            form: {
                event: 'profile-update-form',
                data: {
                    error
                }
            }
        },
        merge: false
    });
    GAEventStore.UI_EVENTS.logFormError('profile-update-form', error.message);
}
const trackUpdateAddressStart = () => {
    dataLayer.push({
        event: Events.user.APPLICATION_START,
        data: {
            form: {
                event: 'address-update-form'
            }
        },
        merge: false
    });
}
const trackUpdateAddressSuccess = () => {
    dataLayer.push({
        event: Events.user.APPLICATION_COMPLETE,
        data: {
            form: {
                event: 'address-update-form'
            }
        },
        merge: false
    });
    GAEventStore.UI_EVENTS.logFormSubmission('address-update-form');
}
const trackUpdateAddressError = (error) => {
    dataLayer.push({
        event: Events.user.APPLICATION_ERROR,
        data: {
            form: {
                event: 'address-update-form',
                data: {
                    error
                }
            }
        },
        merge: false
    });
    GAEventStore.UI_EVENTS.logFormError('address-update-form', error.message);
}
const trackUpdateMeasurementsSuccess = () => {
    dataLayer.push({
        event: Events.user.APPLICATION_COMPLETE,
        data: {
            form: {
                event: 'measurement-update-form'
            }
        },
        merge: false
    });
    GAEventStore.UI_EVENTS.logFormSubmission('measurement-update-form');
}
const trackUpdateMeasurementsError = (error) => {
    dataLayer.push({
        event: Events.user.APPLICATION_ERROR,
        data: {
            form: {
                event: 'measurement-update-form',
                data: {
                    error
                }
            }
        },
        merge: false
    });
    GAEventStore.UI_EVENTS.logFormError('measurement-update-form', error.message);
}
const trackLogout = () => {
    dataLayer.push({
        event: Events.user.LOGOUT,
        data: {
            user: {
                status: 'logged-out'
            },
            form: {
                event: 'logout-form'
            }
        },
        merge: false
    });

    GAEventStore.USER_EVENTS.logSignOut();
    if(window.localStorage){
        window.localStorage.removeItem('__userId__');
    }
}

/* UI */
const trackNavigationPanelOpen = () => {
    dataLayer.push({
        event: Events.ui.NAVIGATION_PANEL_OPEN
    })
}
const trackNavigationItemClick = (section) => {
    dataLayer.push({
        event: Events.ui.NAVIGATION_ITEM_CLICK
    })
    GAEventStore.UI_EVENTS.logOpenNavigation(section);
}
const trackMobileNavigationItemClick = (section) => {
    dataLayer.push({
        event: Events.ui.NAVIGATION_ITEM_CLICK
    })
    GAEventStore.UI_EVENTS.logOpenNavigation(section);
}
const trackHomePageTilesClick = () => {
    dataLayer.push({
        event: Events.ui.HOME_PAGE_TILE_CLICK
    })
    GAEventStore.UI_EVENTS.logHomePageTilesClick();
}
const trackNotificationClick = () => {
    dataLayer.push({
        event: Events.ui.NOTIFICATION_CLICKED
    })
}
const trackNotificationDisplayed = () => {

}



/* TRANSACTION & CART ---- DEV MODE */

const trackAddToCart = (product, cart) => {
    RecsApi.addToCart(product);
    const {id, count, currency="GBP", total, products=[]} = cart;
    dataLayer.push([{
        event: Events.product.ADD_TO_CART,
        data: {
            product 
        },
        update: false
    },
    {
        data: {
            cart: { id, count, currency, total },
            items: products
        },
        merge: false
    }]);

    GAEventStore.PRODUCT_EVENTS.logAddToCart(product);
}
const trackRemoveFromCart = (product, cart) => {
    RecsApi.removeFromCart(product);
    GAEventStore.PRODUCT_EVENTS.logRemoveFromCart(product);
    const {id, count, currency="GBP", total, products=[]} = cart;
    dataLayer.push([{
        event: Events.product.REMOVE_FROM_CART,
        data: {
            product
        },
        update: false
    },
    {
        data: {
            cart: { id, count, currency, total },
            items: products
        },
        merge: false
    }])
}
const updateCart = (cart) => {
    if(cart){
        const { id, count, currency, total, products } = cart;
        dataLayer.push({
            data: {
                cart: { id, count, currency, total },
                items: products
            },
            merge: false
        });
    }
}

const trackCartView = (cart) => {
    const {id, count, currency="GBP", total, products=[]} = cart;
    dataLayer.push([{
        event: Events.product.VIEW_CART,
        update: false
    },
    {
        data: {
            cart: { id, count, currency, total },
            items: products
        },
        merge: false
    }])
    GAEventStore.PAGE_EVENTS.logViewCart(cart);
}

const trackCartError = (errorEvent) => {
    dataLayer.push({
        event: errorEvent
    })
}

const trackStartCheckout = (cart) => {
    const {id, total, currency} = cart;
    dataLayer.push({
        event: Events.transaction.START_CHECKOUT,
        data: {
            transaction: {
                order_id: id,
                payment: {
                    value: total,
                    currency
                },
                status: 'in-progress'
            }
        },
        merge: false
    })
    GAEventStore.TRANSACTION_EVENTS.logBeginCheckout(cart);
}

const trackSelectAddress = (address) => {
    dataLayer.push({
        event: Events.transaction.SELECT_ADDRESS,
        data: {
            transaction: {
                delivery: {
                    address,
                    __MERGE__: false
                }
            }
        }
    })
}

const trackSelectPaymentMethod = (method) => {
    dataLayer.push({
        event: Events.transaction.SELECT_PAYMENT_METHOD,
        data: {
            transaction: {
                payment: {
                    method
                }
            }
        }
    })
    //GAEventStore.TRANSACTION_EVENTS.logAddPaymentInfo(dataLayer.get('cart'), method);
}

const trackSelectDeliveryOption = (delivery_option, cost=0) => {
    dataLayer.push({
        event: Events.transaction.SELECT_DELIVERY_OPTION,
        data: {
            transaction: {
                delivery: {
                    delivery_option,
                    delivery_charge: cost
                }
            }
        }
    })
    //GAEventStore.TRANSACTION_EVENTS.logAddPaymentInfo(dataLayer.get('cart'), delivery_option);
}

const trackOrderConfirm = () => {
    dataLayer.push([{
        event: Events.transaction.ORDER_CONFIRM,
        data: {
            transaction: {
                status: 'complete'
            }
        }
    }, 
    {
        data: {
            cart: {}
        }
    }])
    //GAEventStore.TRANSACTION_EVENTS.logPurchase(dataLayer.getCart());
}

const trackCheckoutError = (error) => {
    dataLayer.push([{
        event: Events.transaction.CHECKOUT_ERROR,
        data: {
            transaction: {
                status: 'error'
            }
        }
    }])
    GAEventStore.logException(error, true);
}

/* ---- DEV MODE ---- */


/* Export EventTracker */
const EventTracker = {
    trackEvent,
    events: Events
}
export default EventTracker;