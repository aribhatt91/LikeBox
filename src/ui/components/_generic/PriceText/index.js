import React from 'react';
import { formatPrice } from '../../../../libs/Helper';

const PriceText = ({value, currency="GBP"}) => {
    return (
        <span><span className="currency">&pound;</span><span className="value">{ formatPrice(Number(value))}</span></span>
    );
}

export default PriceText;
