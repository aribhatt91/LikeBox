const DATA_LAYER_NAME = 'digitalData';
/* 
Set only on PDP
*/
const PRODUCT_KEY = 'product';

function initDataLayer() {
    if(!window[DATA_LAYER_NAME]){
        window[DATA_LAYER_NAME] = {
            page: {},
            user: {},
            events: []
        };
    }
}
/* 
Receives 3 parameters: Object is the 1st level node of the data layer object, eg. page; 
key is the attribute of the object, eg. page.name
*/
function setValue(obj, key, value){
    initDataLayer();
    if(!obj || window[DATA_LAYER_NAME][obj] || !key){
        return;
    }
    window[DATA_LAYER_NAME][key] = value;
}
/* Push to an array */
function pushValue(key, value){
    initDataLayer();
    if(!key || !value){
        return;
    }
    window[DATA_LAYER_NAME][key] = window[DATA_LAYER_NAME][key] || [];
    window[DATA_LAYER_NAME][key].push(value);
}
function removeKey(obj, key){
    
    initDataLayer();
    if(!obj || window[DATA_LAYER_NAME][obj] || !key){
        return;
    }
    delete window[DATA_LAYER_NAME][obj][key];
}
const DataLayer = {
    /* ${DATA_LAYER_NAME}.product */
    setProduct: function(product) {
        setValue(PRODUCT_KEY, product);
    },
    clearProduct: function() {
        delete window[DATA_LAYER_NAME][PRODUCT_KEY];
    },
    addProduct: function(product) {
        pushValue('products', product);
    },
    /* Page */
    setPage: function(title, type) {
        initDataLayer();
        window[DATA_LAYER_NAME]['page'] = {
            ...window[DATA_LAYER_NAME]['page'],
            title,
            path: window.location.pathname,
            type
        };
    },
    setErrorPage: function() {
        window[DATA_LAYER_NAME]['page'] = {
            type: 'errorPage',
        }
    },
    setPageName: function(pageName) {
        setValue('page', 'name', pageName);
    },
    setPageTitle: function() {
        setValue('page', 'title', document.title);
    },
    setPagePath: function() {
        setValue('page', 'path', window.location.pathname);
    },
    setView: function(view) {
        setValue('page', 'view', view);
    },
    setPageSection: function(section) {
        setValue('page', 'channel', section);
    },
    setUser: function(user) {
        window[DATA_LAYER_NAME].user = window[DATA_LAYER_NAME].user || {};
        if(user && user.id){
            window[DATA_LAYER_NAME].user = user;
        }
    },
    clearUser: function(){
        delete window[DATA_LAYER_NAME].user;
    },
    pushEvent: function(event) {
        pushValue("events", event);
    },
    clearEvents: function() {
        if(window[DATA_LAYER_NAME]){
            window[DATA_LAYER_NAME].events = [];
        }
    },
    getState: function() {
        return window[DATA_LAYER_NAME];
    },
    getName: function(){
        return DATA_LAYER_NAME
    },
    getUser: function() {
        return window[DATA_LAYER_NAME].user || {};
    },
    setCart: function(){

    },
    getCart: function(){
        let cart = window[DATA_LAYER_NAME].cart || {};
    },
    get: function() {
        initDataLayer();
        return window[DATA_LAYER_NAME];
    }
}

export default DataLayer;
