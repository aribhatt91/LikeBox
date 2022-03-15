import { sendEvent } from '../GtagHelper';
import { GAProduct } from '../../firestore/models/GAProduct';

export default {
    logBeginCheckout: ({total, products=[]}) => {
        const items = products.map(item => GAProduct(item));
        sendEvent("begin_checkout", {
            currency: 'GBP',
            value: total,
            items
        });
    },
    logAddPaymentInfo: ({total, products=[]}, payment_type) => {
        const items = products.map(item => GAProduct(item));
        sendEvent("add_payment_info", {
            currency: 'GBP',
            value: total,
            payment_type,
            items
        });
    },
    logAddShippingInfo: ({total, products=[]}, shipping_tier) => {
        const items = products.map(item => GAProduct(item));
        sendEvent("add_shipping_info", {
            currency: 'GBP',
            value: total,
            items,
            shipping_tier
        });
    },
    logPurchase: ({id, products=[], total}) => {
        const items = products.map(item => GAProduct(item));
        sendEvent("purchase", {
            currency: 'GBP',
            value: total,
            transaction_id: id,
            items
        });

    },
    logRefund: () => {

    }
};