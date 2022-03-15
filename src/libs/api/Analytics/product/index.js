import { sendEvent } from '../GtagHelper';
import { GAProduct } from '../../firestore/models/GAProduct';

export default { 

    logViewItem: (item) => {
        const items = [];
        items.push(GAProduct(item));
        sendEvent("view_item", {
            items
        });
    },
    logViewItemsInCategory: (items=[]) => {
        if(Array.isArray(items)){
            items = items.map(item => GAProduct(item));
            sendEvent("view_item_list", {
                items
            });
        }
    },
    logAddToWishList: (item) => {
        item = GAProduct(item);
        let value = item.price || 0;
        sendEvent("add_to_wishlist", {
            currency: 'GBP',
            value,
            items: [item]
        });
    },
    logRemoveFromWishList: (item) => {
        item = GAProduct(item);
        let value = item.price || 0;
        sendEvent("remove_from_wishlist", {
            currency: 'GBP',
            value,
            items: [item]
        });
    },
    logAddToCart: (item) => {
        item = GAProduct(item);
        let value = item.price || 0;
        sendEvent("add_to_cart", {
            currency: 'GBP',
            value,
            items: [item]
        });
    },
    logRemoveFromCart: (item) => {
        item = GAProduct(item);
        let value = item.price || 0;
        sendEvent("remove_from_cart", {
            currency: 'GBP',
            value,
            items: [item]
        });
    },
    /* https://developers.google.com/gtagjs/reference/event#select_content */
    logSelectContent: (item) => {
        const {item_id} = GAProduct(item);
        sendEvent("select_content", {
            content_type: "product",
            item_id
        });
    },
    logSelectItem: (items=[]) => {
        items = (items || []).map(item => GAProduct(item));
        sendEvent("select_item", {
            content_type: "product",
            items
        });
    },
    logRelatedProducts: (items=[]) => {
        items = (items || []).map(item => GAProduct(item));
        sendEvent("select_item", {
            content_type: "product",
            items
        });
    }
}

