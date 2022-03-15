import React from 'react';
import { SuccessMessage } from '../../../components/_generic/AppMessage';

const OrderConfirmation = () => {
    return (
        <div className="container mb-5 mt-5 p-3">
            <SuccessMessage message={"Order placed, thank you!"} subtext="Your items will shortly be at your doorstep." />
        </div>
    );
}

export default OrderConfirmation;
