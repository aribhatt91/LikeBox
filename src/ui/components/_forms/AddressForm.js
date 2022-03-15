import React, { useState } from 'react';
import { addAddress, updateExistingAddress } from '../../../libs/AddressService';
import AppSubmitButton from './../_generic/AppSubmitButton';
import AppButton from './../_generic/AppButton';
import AppTextInput from '../_generic/AppTextInput';
import AppForm from './AppForm';
import { ADDRESS_SCHEMA } from './../../../libs/ValidationSchema';
import { SuccessMessage } from '../_generic/AppMessage';

//component.scss
const validationSchema = ADDRESS_SCHEMA;
const AddressForm = ({user, address={}, cancelable=true, cancelEdit, update=false, onComplete}) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    let initialValues = {
        name: (address.name || ""),
        postcode: (address.postcode || ""),
        housenum: (address.housenum || ""),
        city: (address.city || ""),
        street: (address.street || "")
    },
    submitForm = async(userInput, {setSubmitting}) => {
        if(user && user.email){
            setSubmitting(true);
            try {
                let res = await (update ? updateExistingAddress(user.email, userInput) : addAddress(user.email, userInput));
                setSuccess(true);
                setSubmitting(false);
                if(typeof onComplete === 'function'){
                    onComplete(res);
                }
            }catch(err){
                setSuccess(false);
                setSubmitting(false);
            }
        }
        
    } 


    return (
        <div className={"address-form-container p-3"}>
            {success && <SuccessMessage message={update ? "Address updated successfully!" : "New address added"} />}
            {<form className={"address-form" + (success ? ' d-none': '')}>
                <AppForm
                    initialValues={initialValues}
                    onSubmit={submitForm}
                    validationSchema={validationSchema}>
                    <div className="row m-0">
                        <div className="col-xs-12 col-md-12 pl-md-0 pr-md-2">
                            <AppTextInput
                                name="name"
                                label="Name*"
                            />
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-md-6 float-left pl-md-0 pr-md-2">
                            <AppTextInput
                                name="postcode"
                                label="Postcode*"
                            />
                        </div>
                        <div className="col-md-6 float-left pl-md-2 pr-md-0">
                            <AppTextInput
                                name="housenum"
                                label="House number*"
                            />
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-md-12 float-left pl-md-0 pr-md-0">
                            <AppTextInput
                                name="street"
                                label="Street*"
                            />
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-md-6 float-left pl-md-0 pr-md-2">
                            <AppTextInput
                                name="city"
                                label="City/Town*"
                            />
                        </div>
                    </div>
                    <div className="row m-0 mt-3 pl-md-0 pr-md-0 d-flex justify-content-start">
                        <div className="col-5 p-0 d-inline-block">
                            <AppSubmitButton
                                text="Save"
                                rounded={false}
                                className="w-100 border-0"
                            />
                        </div>
                        
                        {cancelable && (typeof cancelEdit === 'function') && <div className="col-5 p-0 d-inline-block">
                            <AppButton
                                label="Cancel"
                                rounded={false}
                                variant="white"
                                className="w-100 border-0"
                                onClick={cancelEdit}
                            />
                        </div>}
                    </div>
                </AppForm>
            </form>}
        </div>
    );
}

export default AddressForm;