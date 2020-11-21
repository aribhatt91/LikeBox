import React, { useState } from 'react';
import ThemedButton from '../generic/ThemedButton';
import TextInput from '../generic/TextInput';
import STATES from '../../../mock/states.json';
import SelectInput from '../generic/SelectInput';
import { validateAlpha, validateAlphaNumeric, validateMobileNumber, validatePincode, validateEmpty } from '../../../service/validation';
import * as Yup from 'yup';
import { validateAddressForm, addAddress, updateAddress, ERROR_TEXT } from '../../../service/addressMethods';
import RadioButtonGroup from '../generic/RadioButtonGroup';
//component.scss
const validationSchema = Yup.object().shape({

})
const AddressForm = ({header, defaultValue, cancelable, cancelEdit, action, hideHeader}) => {
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
                    <div className="col-md-6 float-left pl-md-0 pr-md-2">
                        <TextInput
                            name="name"
                            error={ERROR_TEXT.name} 
                            type="text"
                            label="Name*"
                            handler={validateField}
                            defvalue={inputObject.name}
                            validate={validateAlpha}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-md-2 pr-md-0">
                        <TextInput
                            name="mobile"
                            error={ERROR_TEXT.mobile} 
                            type="number"
                            label="Mobile*"
                            handler={validateField}
                            defvalue={inputObject.mobile}
                            validate={validateMobileNumber}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-md-0 pr-md-2">
                        <TextInput
                            name="pincode"
                            error={ERROR_TEXT.pincode}
                            type="number"
                            label="Pincode*"
                            handler={validateField}
                            defvalue={inputObject.pincode}
                            validate={validatePincode}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-md-2 pr-md-0">
                        <TextInput
                            name="locality"
                            error={ERROR_TEXT.locality} 
                            label="Locality"
                            type="text"
                            handler={validateField}
                            defvalue={inputObject.locality}
                            validate={validateAlphaNumeric}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-12 float-left pl-md-0 pr-md-0">
                        <TextInput
                            name="address"
                            error={ERROR_TEXT.address} 
                            label="Address (Area and Street)*"
                            type="textarea"
                            handler={validateField}
                            defvalue={inputObject.address}
                            validate={validateAlphaNumeric}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-md-0 pr-md-2">
                        <TextInput
                            name="city"
                            error={ERROR_TEXT.city} 
                            type="text"
                            label="City/District/Town*"
                            handler={validateField}
                            defvalue={inputObject.city}
                            validate={validateAlpha}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-md-2 pr-md-0">
                        <SelectInput
                            name="state"
                            options={STATES.states}
                            error={ERROR_TEXT.state}
                            handler={validateField}
                            defvalue={inputObject.state}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-12 float-left pl-md-0 pr-md-0">
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
                    <div className="col-md-6 float-left pl-md-0 pr-md-0">
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
                    <div className="pl-md-0 pr-md-0">
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