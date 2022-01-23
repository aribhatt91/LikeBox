import React, {useState} from 'react';

const DeliveryOptions = ({onSelect, options=[]}) => {
    const [selected, setSelected] = useState(-1);

    const select = function (e) {
        let option = e.target;
        if(!option.hasAttribute('data-index')){
            option = option.closest('[data-index]');
        }
        if(option.hasAttribute('data-index')) {
            setSelected(Number(option.getAttribute('data-index')));
            if(typeof onSelect === 'function'){
                onSelect(Number(option.getAttribute('data-index')));
            }
        }
    }
    
    return (
        <div className="delivery-options-container container p-0">
            <div className="delivery-options-list radio-list w-100 p-3" onClick={select}>
                {
                    (options || []).map((option, index) => <div key={index} data-index={index} className={"delivery-options-list-item d-flex w-100 p-3" + (selected === index ? ' active' : '')}>
                        <div className="container">
                            <h5 className="mb-1">{option.title}</h5>
                            <p className="m-0">{option.description}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default DeliveryOptions;
