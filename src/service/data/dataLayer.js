const DATA_LAYER_NAME = 'dataLayer';
const PRODUCT_KEY = 'product';
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
/* Push to an array */
function pushValue(key, value){
    initDataLayer();
    window[DATA_LAYER_NAME][key] = window[DATA_LAYER_NAME][key] || [];
    window[DATA_LAYER_NAME][key].push(value);
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
    addProduct: function(product) {
        pushValue('products', product);
    },
    pushEvent: function(event) {
        
    },
    clearEvents: function() {
        if(window[DATA_LAYER_NAME]){
            window[DATA_LAYER_NAME].events = [];
        }
    }
}
