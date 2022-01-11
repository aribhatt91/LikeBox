import React, {useState, useEffect} from 'react';
import {fetchAddresses} from '../../../../service/AddressService';
import AppButton from '../../../components/generic/AppButton';

const AddressListItemPlaceholder = () => <div className="address-list-item-placeholder w-100 d-flex">
    <div className="container">

    </div>
</div>
const AddressListItem = ({address, index, selected=false}) => {
    return (
        <li className={"address-list-item w-100 d-flex" + (selected ? " active" : "")} data-index={index}>
            <div className="container">
                <h4>{address.name}</h4>
                <p>{addrress.househumber}, {address.street}</p>
                <p>{address.city}</p>
                <p>{address.postcode}</p>
            </div>
        </li>
    )
}

const AddressList = ({onSelect, user}) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        (async () => {
            if(user){
                setLoading(true);
                try{
                    const res = await fetchAddresses(user.email);
                    window.mlog('Checkout:SelectAddress::response', res);
                    setAddresses(res || []);
                }catch(error){
                    console.error('Checkout:SelectAddress::error', error);
                }finally {
                    setLoading(false);
                }
            }
            
        })
    }, []);

    const select = function(e) {
        const item = e.target;
        if(item.hasAttribute('data-index')){
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
        <div className="address-list-container container">
            {
                addresses && addresses.length > 0 && !loading && <ul className="address-list d-flex flex-column" onClick={select}>
                    {addresses.map((item, index) => <AddressListItem address={item} index={index} selected={selected === index} />)}
                </ul>
            }
            {
                loading && <AddressListItemPlaceholder />
            }
            {
                (!addresses || addresses.length === 0) && !loading && <div className=" d-flex flex-column m-3">
                    <h4>Looks like you haven't yet added a delivery address!</h4>
                    <div className="w-100 d-flex justify-content-center">
                        <AppButton href="/user/address-book" label="Add an address"/>
                    </div>

                </div>
            }
            
        </div>
    );
}

export default AddressList;
