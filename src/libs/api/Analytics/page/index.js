import { sendEvent } from '../GtagHelper';
import { GAProduct } from '../../firestore/models/GAProduct';

export default {
    logPageView: () => {
        sendEvent("page_view", {
            'page.name': document.title,
            'page.url': window.location.href,
            'page.path': window.location.pathname,
            'site.language': "en_gb"
        });
    },
    logScreenView: (view) => {
        sendEvent("screen_view", {
            'page.view': view,
            'page.name': document.title,
            'page.url': window.location.href,
            'page.path': window.location.pathname
        });
    },
    /* 
    When user hit a search
    */
    logSearch: (search_term) => {
        sendEvent("search", {
            'search.query':search_term
        });
    },
    /* 
    When search results are presented
    https://developers.google.com/gtagjs/reference/event#view_search_results
    */
    logViewSearchResult: (search_term, items=[]) => {
        items = (items || []).map(item => GAProduct(item));
        sendEvent("view_search_result", {
            'search.query':search_term,
            'search.results': items
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

/* @keyframes shine-lines {
    0% {
        background-position: -100px;
    }

    40%, 100% {
        background-position: 140px;
    }
    }
 */