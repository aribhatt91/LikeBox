import React, {useState, useEffect} from 'react';
import {fetchAddresses} from '../../../../libs/AddressService';
import AppButton from '../../../components/_generic/AppButton';

const AddressListItemPlaceholder = () => <div className="address-list-item-placeholder placeholder w-100 d-flex p-3">
    <div className="container p-3">
        <h5 className="mb-1"></h5>
        <p className="mb-1"></p>
        <p className="mb-1"></p>
        <p className="mb-0"></p>
    </div>
</div>
const AddressListItem = ({address, index, selected=false}) => {
    return (
        <li className={"address-list-item w-100 p-3 d-flex" + (selected ? " active" : "")} data-index={index}>
            <div className="container">
                <h5 className="mb-1">{address.name}</h5>
                <p className="mb-1">{address.housenum}, {address.street}</p>
                <p className="mb-1">{address.city}</p>
                <p className="mb-0">{address.postcode}</p>
            </div>
        </li>
    )
}

const AddressList = ({onSelect, user}) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try{
                if(user){
                    const res = await fetchAddresses(user.email);
                    window.loginfo('Checkout:SelectAddress::response', res);
                    setAddresses(res || []);
                }
                
            }catch(error){
                window.logerror('Checkout:SelectAddress::error', error);
            }finally {
                setLoading(false);
            }
        })();
    }, [user]);

    const select = function(e) {
        let item = e.target;
        if(item.tagName !== 'LI'){
            item = item.closest('li');
        }
        if(item && item.hasAttribute('data-index')){
            const index = Number(item.getAttribute('data-index'));
            if(index !== selected){
                setSelected(index);
                if(typeof onSelect === 'function'){
                    onSelect(addresses[index]);
                }
            }
        }
    }

    return (
        <div className="address-list-container container p-0">
            {
                loading && <AddressListItemPlaceholder />
            }
            {
                addresses && addresses.length > 0 && !loading && <ul className="address-list radio-list d-flex flex-column p-3 m-0" onClick={select}>
                    {addresses.map((item, index) => <AddressListItem key={index} address={item} index={index} selected={selected === index} />)}
                </ul>
            }
            {
                (!addresses || addresses.length === 0) && !loading && <div className=" d-flex flex-column m-3">
                    <h4>Looks like you haven't yet added a delivery address!</h4>
                    <div className="w-100 d-flex justify-content-center m-3">
                        <AppButton href="/user/settings/address-book" label="Add an address"/>
                    </div>

                </div>
            }
            
        </div>
    );
}

export default AddressList;
