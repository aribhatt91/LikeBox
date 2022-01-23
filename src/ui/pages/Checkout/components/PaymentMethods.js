import React, {useState} from 'react';

const PaymentMethods = ({onSelect, options=[]}) => {
    const [selected, setSelected] = useState(-1);

    const select = function (e) {
        let option = e.target;
        if(!option.hasAttribute('data-index')){
            option = option.closest('[data-index]');
        }
        if(option) {
            setSelected(Number(option.getAttribute('data-index')));
            if(typeof onSelect === 'function'){
                onSelect(Number(option.getAttribute('data-index')));
            }
        }
    }
    
    return (
        <div className="payment-methods-container container p-0">
            <div className="payment-methods-list radio-list w-100 p-3" onClick={select}>
                {
                    (options || []).map((option, index) => <div key={index} data-index={index} className={"payment-methods-list-item d-flex w-100 p-3" + (selected === index ? ' active' : '')}>
                        <div className="container d-flex flex-column justify-content-center">
                            <h5 className="m-0">{option.name}</h5>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default PaymentMethods;
