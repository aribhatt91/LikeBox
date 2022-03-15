import { sendEvent } from '../GtagHelper';
import { GAProduct } from '../../firestore/models/GAProduct';

export default {
    logPageView: (page_title) => {
        sendEvent("page_view", {
            page_title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            language: "en_gb"
        });
    },
    logScreenView: (screen_name) => {
        sendEvent("screen_view", {
            app_name: 'LikeBox',
            screen_name
        });
    },
    /* 
    When user hit a search
    */
    logSearch: (search_term) => {
        sendEvent("search", {
            search_term
        });
    },
    /* 
    When search results are presented
    https://developers.google.com/gtagjs/reference/event#view_search_results
    */
    logViewSearchResult: (search_term, items=[]) => {
        items = (items || []).map(item => GAProduct(item));
        sendEvent("view_search_result", {
            search_term,
            items
        });
    },
    logViewCart: (cart) => {
        const items = (cart.products || []).map(item => GAProduct(item));
        sendEvent("view_cart", {
            currency: "GBP",
            value: cart.total,
            items
        });
    }
}