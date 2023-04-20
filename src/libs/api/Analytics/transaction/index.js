import { sendEvent } from '../GtagHelper';
import { GAProduct } from '../../firestore/models/GAProduct';

export default {
    logFetchCart: (cart) => {
        sendEvent("fetch_cart", cart);
    },
    logFetchCartError: (error) => {
        sendEvent("fetch_cart_error");
    },
    logBeginCheckout: ({total, products=[]}) => {
        const items = products.map(item => GAProduct(item));
        sendEvent("begin_checkout", {
            'transaction.currency': 'GBP',
            'transaction.payment.value': total,
            'transaction.items': items,
        });
    },
    logAddPaymentInfo: ({total, products=[]}, payment_type) => {
        const items = products.map(item => GAProduct(item));
        sendEvent("add_payment_info", {
            'transaction.currency': 'GBP',
            'transaction.payment.value': total,
            'transaction.items': items,
            'transaction.payment.method': payment_type
        });
    },
    logAddShippingInfo: ({total, products=[]}, shipping_tier) => {
        const items = products.map(item => GAProduct(item));
        sendEvent("add_shipping_info", {
            'transaction.currency': 'GBP',
            'transaction.payment.value': total,
            'transaction.items': items,
            'transaction.delivery.method': shipping_tier
        });
    },
    logPurchase: ({id, products=[], total}) => {
        const items = products.map(item => GAProduct(item));
        sendEvent("purchase", {
            'transaction.currency': 'GBP',
            'transaction.payment.value': total,
            'transaction.id': id,
            'transaction.items': items
        });

    },
    logTransactionError: () => {
        sendEvent('purchase_error');
    },
    logRefund: () => {

    }
};