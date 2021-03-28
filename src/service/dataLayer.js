export class DataLayer {
    static getDataLayer() {
        return window.dataLayer || {}
    }

    static initDataLayer() {
        window.dataLayer = window.dataLayer || {}
    }

    static setProduct(product) {
        window.dataLayer = {
            ...window.dataLayer,
            'product': (product || {})
        }
    }

    static clearProduct() {
        if(window.dataLayer){
            delete window.dataLayer.product;
        }
    }

    static setPageName(pageName) {
        window.dataLayer = {
            ...window.dataLayer,
            'pageName': pageName
        }
    }

    static setEvent(event) {

    }
}