const DATA_LAYER_NAME = 'digitalData';
/* 
Set only on PDP
*/
const PRODUCT_KEY = 'product';

function initDataLayer() {
    if(!window[DATA_LAYER_NAME]){
        window[DATA_LAYER_NAME] = {
            "page": {
                path: window.location.pathname,
                server: window.location.hostname
            },
            "user": {
                status: "logged-out"
            },
            "product": {},
            "events": []
        };
    }
}
/* 
Receives 3 parameters: Object is the 1st level node of the data layer object, eg. page; 
key is the attribute of the object, eg. page.name
*/
function setValue(obj, key, value){
    initDataLayer();
    if(!obj || !window[DATA_LAYER_NAME][obj] || !key){
        return;
    }
    window[DATA_LAYER_NAME][obj][key] = value;
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
    if(!key){
        delete window[DATA_LAYER_NAME][obj]
    }
    else if(obj && window[DATA_LAYER_NAME][obj]){
        delete window[DATA_LAYER_NAME][obj][key];
    }
}
const DataLayer = {
    /* ${DATA_LAYER_NAME}.product */
    setProduct: function(product) {
        initDataLayer();
        if(!product){
            window.logerror('Product object is not defined');
        }
        window[DATA_LAYER_NAME][PRODUCT_KEY] = product;
        window[DATA_LAYER_NAME][PRODUCT_KEY]['productEvent'] = {
            eventType: 'prod-view',
            productId: product.id
        }
    },
    setProductEvent: function(eventType, product) {
        initDataLayer();
        window[DATA_LAYER_NAME][PRODUCT_KEY] = window[DATA_LAYER_NAME][PRODUCT_KEY] || {};
        window[DATA_LAYER_NAME][PRODUCT_KEY]['productEvent'] = {
            eventType,
            productId: product.id
        }
    },
    selectVariant: function(variant) {
        console.log('selectVariant',variant);
        if(!variant || !variant.size){
            return;
        }
        initDataLayer();
        window[DATA_LAYER_NAME][PRODUCT_KEY].size = variant.size || "";
    },
    clearProduct: function() {
        window[DATA_LAYER_NAME][PRODUCT_KEY] = {};
    },
    addProduct: function(product) {
        pushValue('products', product);
    },
    /* Page */
    setPage: function(title, section="", search="") {
        initDataLayer();
        window[DATA_LAYER_NAME]['page'] = {
            ...window[DATA_LAYER_NAME]['page'],
            path: window.location.pathname,
            server: window.location.hostname,
            title,
            url: (window.location.href || "").replace(window.location.search, '').replace('?', '').replace(window.location.hash, ''),
            language: "en",
        };
        if(section){
            window[DATA_LAYER_NAME]['page']['section'] = section;
        }
        if(search){
            window[DATA_LAYER_NAME]['page']['search'] = search;
        }
    },
    setErrorPage: function() {
        window[DATA_LAYER_NAME]['page'] = {
            errorPage: 'errorPage',
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
    setSearchTerm: function(search) {
        setValue('page', 'search', search);
    },
    setView: function(view) {
        if(view){
            setValue('page', 'view', view.toLowerCase());
        }
    },
    setPageSection: function(section) {
        setValue('page', 'section', section);
    },
    setUser: function(user) {
        window[DATA_LAYER_NAME].user = window[DATA_LAYER_NAME].user || {};
        if(user && user.uid){
            window[DATA_LAYER_NAME].user = {id: user.uid, status: 'logged-in'};
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
    /* Cart */
    setCart: function(cart){
        if(window[DATA_LAYER_NAME]){
            window[DATA_LAYER_NAME].cart = cart;
        }
    },
    getCart: function(){
        let cart = window[DATA_LAYER_NAME].cart || {};
        return cart;
    },
    clearCart: function() {
        if(window[DATA_LAYER_NAME]){
            window[DATA_LAYER_NAME].cart = {};
        }
    },
    /* Transaction */
    initTransaction: function(cart) {
        if(window[DATA_LAYER_NAME] && window[DATA_LAYER_NAME]['cart'] && cart.id && cart.total){
            window[DATA_LAYER_NAME]['transaction'] = window[DATA_LAYER_NAME]['transaction'] || {
                'payment': {
                    'value': cart.total
                },
                'delivery': {},
                'status': 'in-progress'
            };
            window[DATA_LAYER_NAME]['transaction']['order_id'] = cart.id;
            window[DATA_LAYER_NAME]['transaction']['items'] = cart.products;
        }
    },
    setPaymentMethod: function(method){
        if(window[DATA_LAYER_NAME]['transaction'] && method) {
            window[DATA_LAYER_NAME]['transaction']['payment'] = {
                ...window[DATA_LAYER_NAME]['transaction']['payment'],
                method
            }
        }
    },
    setPaymentValue: function(value){
        if(window[DATA_LAYER_NAME]['transaction'] && value) {
            window[DATA_LAYER_NAME]['transaction']['payment'] = {
                ...window[DATA_LAYER_NAME]['transaction']['payment'],
                value
            }
        }
    },
    setDeliveryOption: function(delivery_option, delivery_charge=0){
        if(window[DATA_LAYER_NAME]['transaction'] && delivery_option) {
            window[DATA_LAYER_NAME]['transaction']['delivery'] = {
                ...window[DATA_LAYER_NAME]['transaction']['delivery'],
                delivery_option,
                delivery_charge
            }
        }
        if(window[DATA_LAYER_NAME]['transaction'] && window[DATA_LAYER_NAME]['cart'] && window[DATA_LAYER_NAME]['cart'].total) {
            window[DATA_LAYER_NAME]['transaction']['payment'] = {
                ...window[DATA_LAYER_NAME]['transaction']['payment'],
                value: (window[DATA_LAYER_NAME]['cart'].total + delivery_charge)
            }
        }
    },
    setDeliveryAddress: function(address){
        if(window[DATA_LAYER_NAME]['transaction'] && address) {
            window[DATA_LAYER_NAME]['transaction']['delivery'] = {
                ...window[DATA_LAYER_NAME]['transaction']['delivery'],
                address
            }
        }
    },
    clearTransaction: function (){
        delete window[DATA_LAYER_NAME]['transaction'];
    },
    get: function() {
        initDataLayer();
        return window[DATA_LAYER_NAME];
    }
}

export default DataLayer;
