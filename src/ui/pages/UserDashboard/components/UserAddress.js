import React, { useState, useEffect, useContext } from 'react';
import AddressForm from '../../../components/_forms/AddressForm';
import { fetchAddresses, updateExistingAddress, deleteAddress } from '../../../../libs/AddressService';
import AppButton from '../../../components/_generic/AppButton';
import LoadingModule from '../../../components/LoadingModule';

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
function UserAddress({currentUser}){
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [openNewAddressForm, setOpenNewAddressForm] = useState(false);

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
                    }else {
                        setOpenNewAddressForm(true);
                    }
                })()
            }
            
        }catch(err){
            window.logerror('UserAddressFragment:useEffect:', err);
        }finally{
            setLoading(false);
        }
    }, [currentUser])

    const onAddressOp = (result) => {
        try {
            window.loginfo('onAddressOp:', result);
            if(!loading){
                setLoading(true);
            }
            if(result.length > 0){
                
                setOpenNewAddressForm(false);
                setLoading(false);
                setAddresses(result);
            }
        }catch(err){
            window.logerror('UserAddressFragment:update:', err);
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
            window.logerror('UserAddressFragment:update:', err);
        }finally {

        }
    }

    return (
        <div className={"address-section editable-section w-100"}>

            {
                loading && <div className="m-5">
                    <LoadingModule />
                </div>
            }
            
            
            {
            !loading && addresses && addresses.length > 0 && <React.Fragment>

                {!openNewAddressForm && <h1 className="editable-section-header p-3 mb-5">Your addresses</h1>}

                <div className={"saved-address-container p-3" + (openNewAddressForm ? ' d-none' : "")}>
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
                </div>
            </React.Fragment>
            }
            
            {
            !loading && <div className="add-address-container w-100 mb-4">
                {
                    !openNewAddressForm && (!addresses || addresses.length === 0) && <div className="p-3 mb-3 mt-3">
                        <h3>Looks like you haven't added an address yet!</h3>
                        <h5> Click below to add one.</h5>
                    </div>
                }
                {!openNewAddressForm && <div className={"d-inline-block p-3"}>
                    <AppButton label="Add new address" rounded={false} className="w-100"  onClick={()=>setOpenNewAddressForm(true)} />
                </div>}
                {(openNewAddressForm) && <div className="w-100">
                    <h1 className="editable-section-header p-3">Add new address</h1>
                    <AddressForm
                        user={currentUser}
                        onComplete={onAddressOp}
                        cancelable={true}
                        cancelEdit={()=>setOpenNewAddressForm(false)}
                    />
                </div>}
            </div>}

        </div>
    )
}

export default UserAddress;