import React, { useState } from 'react';
import AddressForm from '../components/AddressForm';
import Accordion from './../components/generic/Accordion';
import ADDRESSES from '../../mock/addresses.json';

function Address({instance, deleteAddress, editAddress}){
    const [editMode, setEditMode] = useState(false);
    return (
        <div className="address-instance-container mb-3">
            <div className={"address-instance-display p-3" + (editMode ? " d-none": "")}>
                <div className="address-instance-name font-weight-bold mb-1"><span className="pr-3">{instance.name}</span><span>{instance.mobile}</span></div>
                <div className="address-instance-street"><span>{instance.address}</span><span>{instance.locality ? ", " + instance.locality : ""}</span></div>
                <div className="address-instance-city"><span>{instance.city}</span><span>{ ", " + instance.state + "-" + instance.pincode}</span></div>
                <span className="address-instance-edit-btn" onClick={() => setEditMode(true)}>Edit</span>
            </div>
            <div className={"address-instance-edit p-3" + (!editMode ? " d-none": "")}>
                <AddressForm
                    hideHeader={true}
                    defaultValue={instance}
                    action="update"
                />
                <span className="address-instance-cancel-btn" onClick={() => setEditMode(false)}>Cancel</span>
            </div>
            
        </div>
    )
}
function UserAddressBook({addresses, deleteAddress, editAddress}){
    let saved_addresses = [];
    if(ADDRESSES.addresses && ADDRESSES.addresses.length > 0){
        ADDRESSES.addresses.forEach((item, index) => {
            saved_addresses.push(
                <Address
                    instance={item}
                    deleteAddress={deleteAddress}
                    editAddress={editAddress}
                />
            )
        })
        
    }
    return (
        <div className={"address-section editable-section"}>
            <h1 className="editable-section-header mb-5">My addresses</h1>
            <div className="add-address-container mb-4">
                <Accordion
                    label="Add new address"
                    openBtn="true"
                    // hideHeaderOnOpen={true}
                    children={
                        <AddressForm
                            hideHeader={true}
                        />
                    }
                />
            </div>
            {saved_addresses.length > 0 && <div className="saved-address-container">
                {
                    saved_addresses
                }
            </div>}

        </div>
    )
}

export default UserAddressBook;