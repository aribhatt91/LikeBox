export const sendEvent = (event, data={}) => {
    /* if(window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', event, data);
    } */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event,
        ...data
    })

}

export const sedEcommerceEvent = (event, {items=[], value, currency='GBP', payment_type, shipping, affiliation, transaction_id}) => {
    window.dataLayer.push({ecommerce: null});
    const ecommerce = {};
    if(value){
        ecommerce.value = value;
        ecommerce.currency = currency;
    }
    if(payment_type) {
        ecommerce.payment_type = payment_type;
    }
    if(shipping) {
        ecommerce.shipping = shipping;
    }
    if(affiliation){
        ecommerce.affiliation = affiliation;
    }
    if(transaction_id){
        ecommerce.transaction_id = transaction_id;
    }
    window.dataLayer.push({event, ecommerce})
}

export const setProp = (prop, value) => {
    if(window.gtag && typeof window.gtag === 'function') {
        window.gtag('set', {[prop]: value});
    }
}
