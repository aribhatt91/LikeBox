import { getUserAddressBook } from "./api/firestore/address";
import { addOrder } from './api/firestore/transaction';
import EventTracker from './api/EventTracker';

const ACTIVE_ORDER = {
    payment_method: null,
    address: null,
    delivery_option: null
}

export const PAYMENT_METHODS = [
    {
        id: 'card',
        name: 'Credit Card'
    },
    {
        id: 'cod',
        name: 'Cash on delivery'
    }
];
export const DELIVERY_OPTIONS = [
    {
        title: 'FREE', 
        description: 'Standard delivery within 7-10 days',
        cost: 0,
        time: 7
    },
    {
        title: 'FAST', 
        description: 'Get guaranteed delivery within 2 days for a fee',
        cost: 10,
        time: 2
    }
];
const validateCart = (cart) => {
    if(cart && cart.id && cart.total && cart.products && Array.isArray(cart.products)){
        return true;
    }
    return false;
}

const fetchPaymentMethods = async () => {
    return PAYMENT_METHODS;
}

const selectPaymentMethod = (method) => {
    if(method && ['card', 'cod'].indexOf(method.id) !== -1) {
        ACTIVE_ORDER.payment_method = method;
        EventTracker.trackEvent(EventTracker.events.transaction.SELECT_PAYMENT_METHOD, method.id);
        return true;
    }
    return false;
}

const fetchAddresses = async (email) => {
    try{
        const addresses = await getUserAddressBook(email);
        return new Promise((resolve, reject) => resolve(addresses))
    }catch(error){
        return new Promise((resolve, reject) => reject(error));
    }
}

const selectAddress = (address) => {
    if(address && address.street && address.housenum && address.postcode){
        ACTIVE_ORDER.address = address;
        EventTracker.trackEvent(EventTracker.events.transaction.SELECT_ADDRESS, address);
        return true;
    }
    return false;
}

const fetchDeliveryOptions = async () => {
    return DELIVERY_OPTIONS;
}

const selectDeliveryOption = (option) => {
    if(option && ['FAST', 'FREE'].indexOf(option.title.toUpperCase()) !== -1) {
        ACTIVE_ORDER.delivery_option = option;
        EventTracker.trackEvent(EventTracker.events.transaction.SELECT_DELIVERY_OPTION, option.title, option.cost);
    }
}

const placeOrder = async (user, cart) => {
    try {
        if(!user || !validateCart(cart) || !ACTIVE_ORDER.delivery_option || !ACTIVE_ORDER.payment_method || !ACTIVE_ORDER.address) {
            throw new Error('Missing information!');
        }
        const response = await addOrder({
            ...ACTIVE_ORDER,
            user,
            cart
        });
        EventTracker.trackEvent(EventTracker.events.transaction.ORDER_CONFIRM, cart);
        return new Promise((resolve, reject) => resolve(response));
    }catch(error) {
        window.logerror('CheckoutService::placeOrder::error', error);
        EventTracker.trackEvent(EventTracker.events.transaction.CHECKOUT_ERROR, error);
        return new Promise((resolve, reject) => reject(error));
    }
}

const CheckoutService = {
    fetchPaymentMethods,
    selectPaymentMethod,
    fetchAddresses,
    selectAddress,
    fetchDeliveryOptions,
    selectDeliveryOption,
    placeOrder
};

export default CheckoutService;