import React, { useState } from 'react';
import ThemedButton from './generic/ThemedButton';
import TextInput from './generic/TextInput';
import STATES from '../../mock/states.json';
import SelectInput from './generic/SelectInput';
import { validateAddressForm, addAddress, updateAddress } from './../../service/addressMethods';
import RadioButtonGroup from './generic/RadioButtonGroup';
//component.scss
function AddressForm({header, defaultValue, cancelable, cancelEdit, action, hideHeader}){
    const [errorObj, setErrorObj] = useState({});
    const [validated, setValidated] = useState(false);
    let inputObject = defaultValue ? Object.assign({}, defaultValue) || {} : {};

    const address_types = [{
        label: 'Home',
        value: 'Home'
    },
    {
        label: 'Work',
        value: 'Work'
    }],
    validateField = (name, value) => {
        console.log('validateField -> ', name, ' - ', value);
        if(name === 'state' && value === ""){
            inputObject.state = "";
        }
        if(value && value.trim() !== ""){
            inputObject[name] = value;
        }
        let validation = validateAddressForm(inputObject);
        setErrorObj(validation.errors);
        setValidated(Object.keys(validation.errors).length === 0 && Object.keys(validation.required).length === 0);
    },
    cancelForm = (e) => {
        e.preventDefault();
        if(cancelEdit) {
            cancelEdit();
        }
    },
    submitForm = (e) => {
        e.preventDefault();
        if(action && action === 'update'){
            updateAddress(inputObject, defaultValue);
        }else {
            addAddress(inputObject)
        }
    } 
    let btnState = 'disabled';
    if(validated){
        btnState = 'active';
    }


    return (
        <div className={"address-form-container p-3"}>
            <form className={"address-form"}>
                <div className="row m-0">
                    {!hideHeader && <div className="address-form-header mb-4 pl-2 pr-2">{header ? header : "Add new address"}</div>}
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="name"
                            error={errorObj.name} 
                            type="text"
                            label="Name*"
                            required="true"
                            handler={validateField}
                            defvalue={inputObject.name}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="mobile"
                            error={errorObj.mobile} 
                            type="number"
                            label="Mobile*"
                            required="true"
                            handler={validateField}
                            defvalue={inputObject.mobile}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="pincode"
                            error={errorObj.pincode}
                            type="number"
                            label="Pincode*"
                            required="true"
                            handler={validateField}
                            defvalue={inputObject.pincode}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="locality"
                            error={errorObj.locality} 
                            label="Locality"
                            required="true"
                            type="text"
                            handler={validateField}
                            defvalue={inputObject.locality}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <TextInput
                            name="address"
                            error={errorObj.address} 
                            label="Address (Area and Street)*"
                            type="textarea"
                            required="true"
                            handler={validateField}
                            defvalue={inputObject.address}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="city"
                            error={errorObj.city} 
                            type="text"
                            label="City/District/Town*"
                            required="true"
                            handler={validateField}
                            defvalue={inputObject.city}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <SelectInput
                            name="state"
                            options={STATES.states}
                            error={errorObj.state}
                            handler={validateField}
                            defvalue={inputObject.state}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <TextInput
                            name="landmark"
                            label="Landmark (Optional)"
                            type="text"
                            handler={validateField}
                            defvalue={inputObject.landmark}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <RadioButtonGroup
                            title="Address type"
                            handler={validateField}
                            options={address_types}
                            name="adtype"
                            orientation="row"
                            defvalue={inputObject.adtype}
                        />
                    </div>
                </div>
                <div className="row m-0">

                </div>
                <div className="row m-0 mt-3 d-flex justify-content-start">
                    <div className="pl-2 pr-2">
                        <div className="d-inline-block pr-4">
                            <ThemedButton
                                btnState={btnState}
                                btnText="Save"
                                theme="accent"
                                size="medium"
                                _click={submitForm}
                            />
                        </div>
                        
                        {cancelable && (typeof cancelEdit === 'function') && <div className="d-inline-block">
                            <ThemedButton
                                btnText="Cancel"
                                theme="grey"
                                size="medium"
                                _click={cancelForm}
                            />
                        </div>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;