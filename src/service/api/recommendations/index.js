import KEYS from '../../keys/api-keys.json';
import axios from "axios";
import ProductDetail from './models/ProductDetail';
const BASE_URL = "https://recommendationengine.googleapis.com/v1beta1/projects/the-likebox/locations/global/catalogs/default_catalog/eventStores/default_event_store/userEvents:write?key="

const userEvent = (payload) => {
    try{
        const URL = BASE_URL + KEYS["RECS-API-KEY"];
        axios.post(URL, payload).then((res) => {

        }).catch(err => {});
    }catch(err){

    }
    
}
const postProductDetailEvent = (eventType, product) => {
    try{
        let visitorId = window.gaGlobal ? window.gaGlobal.vid || "" : "";
        var obj = {
            eventType,
            "userInfo": {
                visitorId
            },
            "productDetails": {
                "productDetails": [
                    ProductDetail(product)
                ]
            }
        };

        userEvent(obj);
    }catch(err){

    }
    
}
export const detailPageView = (product) => {
    postProductDetailEvent("detail-page-view", product);
};

export const addToList = (product) => {
    postProductDetailEvent("add-to-list", product);
};

export const removeFromList = (product) => {
    postProductDetailEvent("remove-from-list", product);
};

export const addToCart = (product) => {
    postProductDetailEvent("add-to-cart", product);
};

export const removeFromCart = (product) => {
    postProductDetailEvent("remove-from-cart", product);
};

export const categoryPageView = (product) => {
    postProductDetailEvent("category-page-view", product);
};

export const search = (product) => {
    postProductDetailEvent("search", product);
};