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
        cost: 0
    },
    {
        title: 'FAST', 
        description: 'Get guaranteed delivery within 2 days for a fee',
        cost: 10
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
    if(address && address.street && address.housenumber && address.postcode){
        ACTIVE_ORDER.address = address;
        return true;
    }
    return false;
}

const fetchDeliveryOptions = async () => {
    return DELIVERY_OPTIONS;
}

const selectDeliveryOptions = (option) => {
    if(option && ['FAST', 'FREE'].indexOf(option.title.toUpperCase()) !== -1) {
        ACTIVE_ORDER.delivery_option = option;
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
        return new Promise((resolve, reject) => resolve(response));
    }catch(error) {
        return new Promise((resolve, reject) => reject(error));
    }
}

const CheckoutService = {
    fetchPaymentMethods,
    selectPaymentMethod,
    fetchAddresses,
    selectAddress,
    fetchDeliveryOptions,
    selectDeliveryOptions,
    placeOrder
};

export default CheckoutService;