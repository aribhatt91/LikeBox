import React from 'react';

const Checkoutstatusbar = ({step}) => {
    return (
        <div className="checkout-status-bar-container container mb-5 mt-3 d-flex justify-content-center">
            <div className="checkout-status-bar">
                <span className={"step" + (step >= 1 ? ' done' : '' )}>1</span>
                <span className={"line" + (step >= 2 ? ' done' : '' )}></span>
                <span className={"step" + (step >= 2 ? ' done' : '' )}>2</span>
                <span className={"line" + (step >= 3 ? ' done' : '' )}></span>
                <span className={"step" + (step >= 3 ? ' done' : '' )}>3</span>
                <span className={"line" + (step >= 4 ? ' done' : '' )}></span>
                <span className={"step" + (step === 5 ? ' done' : '' )}>4</span>
            </div>
        </div>
    );
}

export default Checkoutstatusbar;
