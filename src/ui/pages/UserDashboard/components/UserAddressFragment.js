import React, { useState, useEffect, useContext } from 'react';
import AddressForm from '../../../components/forms/AddressForm';
import { AuthContext } from '../../../../store/contexts/AuthContext';
import { fetchAddresses, updateExistingAddress, deleteAddress } from '../../../../service/addressMethods';
import AppButton from '../../../components/generic/AppButton';

function Address({user, instance, onAddressOp }){
    const [editMode, setEditMode] = useState(false);
    return (
        <div className="address-instance-container mb-3">
            <div className={"address-instance-display p-3" + (editMode ? " d-none": "")}>
                <div className="address-instance-name font-weight-bold mb-2"><span className="pr-3">{instance.name}</span></div>
                <div className="address-instance-street">{instance.housenum}</div>
                <div className="address-instance-street">{instance.street}</div>
                <div className="address-instance-city">{instance.city}</div>
                <div className="address-instance-postcode">{ instance.postcode}</div>
                <span className="address-instance-edit-btn" onClick={() => setEditMode(true)}>Edit</span>
            </div>
            {editMode && <div className={"address-instance-edit p-3"}>
                <AddressForm
                    user={user}
                    address={instance}
                    update={true}
                    onComplete={onAddressOp}
                    cancelable={true}
                    cancelEdit={() => setEditMode(false)}
                />
            </div>}
            
        </div>
    )
}
function UserAddressFragment(){
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [openNewAddressForm, setOpenNewAddressForm] = useState(false);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        try{
            if(!loading){
                setLoading(true);
            }
            if(currentUser){
                (async()=>{
                    let res = await fetchAddresses(currentUser.email);
                    res = res || [];
                    if(res.length > 0){
                        setAddresses(res);
                    }
                })()
            }
            
        }catch(err){
            console.error('UserAddressFragment:useEffect:', err);
        }finally{
            if(loading){
                setLoading(false);
            }
        }
    }, [currentUser])

    const onAddressOp = (result) => {
        try {
            window.mlog('onAddressOp:', result);
            if(!loading){
                setLoading(true);
            }
            if(result.length > 0){
                
                setOpenNewAddressForm(false);
                setLoading(false);
                setAddresses(result);
            }
        }catch(err){
            console.error('UserAddressFragment:update:', err);
            setLoading(false);
        }finally{
        }
    }

    const remove = async (addressId) => {
        try {
            let res = deleteAddress(currentUser.email, addressId);
            res = res || [];
            if(res.length > 0){
                setAddresses(res);
            }
        }catch(err){
            console.error('UserAddressFragment:update:', err);
        }finally {

        }
    }

    return (
        <div className={"address-section editable-section w-100"}>
            <h1 className="editable-section-header mb-5">My addresses</h1>
            
            {<div className={"saved-address-container" + (openNewAddressForm ? ' d-none' : "")}>
                {
                    (addresses || []).map((item, index) => 
                    <Address
                        user={currentUser}
                        key={index}
                        instance={item}
                        deleteAddress={remove}
                        onAddressOp={onAddressOp}
                    />)
                }
            </div>}
            <div className="add-address-container w-100 mb-4">
                <div className={"w-100" + (openNewAddressForm ? ' d-none' : "")}>
                    <AppButton label="Add new address" className="w-100"  onClick={()=>setOpenNewAddressForm(true)} />
                </div>
                {openNewAddressForm && <div className="w-100">
                    <AddressForm
                        user={currentUser}
                        onComplete={onAddressOp}
                        cancelable={true}
                        cancelEdit={()=>setOpenNewAddressForm(false)}
                    />
                </div>}
            </div>

        </div>
    )
}

export default UserAddressFragment;