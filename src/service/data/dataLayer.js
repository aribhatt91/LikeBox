const DATA_LAYER_NAME = 'dataLayer';
const PRODUCT_KEY = 'primaryProduct';
function getDataLayer() {
    return window[DATA_LAYER_NAME] || {}
}

function initDataLayer() {
    if(!window[DATA_LAYER_NAME]){
        window[DATA_LAYER_NAME] = {};
    }
}

function setValue(key, value){
    initDataLayer();
    window[DATA_LAYER_NAME][key] = value;
}
function removeKey(key){
    initDataLayer();
    delete window[DATA_LAYER_NAME][key];
}
export const DataLayer = {
    setProduct: function(product) {
        setValue(PRODUCT_KEY, product);
    },
    clearProduct: function() {
        removeKey(PRODUCT_KEY);
    },
    setPageName: function(pageName) {
        setValue('pageName', pageName);
    },
    setEvent: function(event) {
    
    }
}
