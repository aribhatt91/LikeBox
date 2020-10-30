import React, { useState } from 'react';
import ThemedButton from './generic/ThemedButton';
import TextInput from './generic/TextInput';
//import SelectInput from './generic/SelectInput';
//import { validateAddressForm, addAddress, updateAddress } from './../../service/addressMethods';
//import RadioButtonGroup from './generic/RadioButtonGroup';
//component.scss
function CardForm({header, defaultValue, cancelable, cancelEdit, action, hideHeader}){
    const [errorObj, setErrorObj] = useState({});
    const [validated, setValidated] = useState(false);
    let inputObject = defaultValue ? Object.assign({}, defaultValue) || {} : {};

    const validateField = (name, value) => {
        console.log('validateField -> ', name, ' - ', value);

        if(value && value.trim() !== ""){
            inputObject[name] = value;
        }
        //let validation = validateAddressForm(inputObject);
        //setErrorObj(validation.errors);
        //setValidated(Object.keys(validation.errors).length === 0 && Object.keys(validation.required).length === 0);
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
            //updateAddress(inputObject, defaultValue);
        }else {
            //addAddress(inputObject)
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
                            name="cnumber"
                            error={errorObj.name} 
                            type="number"
                            label="Card number*"
                            required={true}
                            handler={validateField}
                            defvalue={inputObject.cnumber}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="cname"
                            error={errorObj.cname}
                            type="number"
                            label="Name on card*"
                            required={true}
                            handler={validateField}
                            defvalue={inputObject.cname}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="calias"
                            error={errorObj.calias} 
                            label="Locality"
                            type="text"
                            handler={validateField}
                            defvalue={inputObject.calias}
                        />
                    </div>
                </div>
                <div className="row m-0 mt-3 d-flex justify-content-start">
                    <div className="pl-2 pr-2">
                        <div className="d-inline-block pr-4">
                            <ThemedButton
                                btnState={btnState}
                                btnText="Save card"
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

export default CardForm;