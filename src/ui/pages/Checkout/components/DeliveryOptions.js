import React, {useState} from 'react';

const DeliveryOptions = ({onSelect, options=[]}) => {
    const [selected, setSelected] = useState(0);

    const select = function (e) {
        var option = e.target;
        if(option.hasAttribute('data-index')) {
            setSelected(Number(option.getAttribute('data-index')));
            if(typeof onSelect === 'function'){
                onSelect(Number(option.getAttribute('data-index')));
            }
        }
    }
    
    return (
        <div className="delivery-options-container container">
            <div className="delivery-options-list w-100" onClick={select}>
                {
                    (options || []).map((option, index) => <div key={index} data-index={index} className={"delivery-options-list-item w-100 p-3 mb-3" + (selected === index ? ' active' : '')}>
                        <h4>{option.title}</h4>
                        <p>{option.description}</p>
                    </div>)
                }
            </div>
        </div>
    );
}

export default DeliveryOptions;
