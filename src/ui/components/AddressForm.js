import React, { useState } from 'react';
import ThemedButton from './ThemedButton';
import TextInput from './TextInput';
import STATES from '../../mock/states.json';
import SelectInput from './SelectInput';
//component.scss
function AddressForm({header, errorObject, errorValidation, addAddress, defaultValue, cancelable, cancelEdit, action, hideHeader}){
    const [errorObj, setErrorObj] = useState({});
    const [validated, setValidated] = useState(false);
    const validateField = (tag, value) => {
        console.log('validateField -> ', tag, ' - ', value);
    }
    const cancelForm = (e) => {
        e.preventDefault();
        if(cancelEdit) {
            cancelEdit();
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
                            label="Name"
                            required="true"
                            handler={validateField}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="mobile"
                            error={errorObj.mobile} 
                            type="number"
                            label="Mobile"
                            required="true"
                            handler={validateField}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="pincode"
                            error={errorObj.pincode}
                            type="number"
                            label="Pincode"
                            required="true"
                            handler={validateField}
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
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-12 float-left pl-2 pr-2">
                        <TextInput
                            name="address"
                            error={errorObj.address} 
                            label="Address (Area and Street)"
                            type="textarea"
                            required="true"
                            handler={validateField}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <TextInput
                            name="city"
                            error={errorObj.city} 
                            type="text"
                            label="City/District/Town"
                            required="true"
                            handler={validateField}
                        />
                    </div>
                    <div className="col-md-6 float-left pl-2 pr-2">
                        <SelectInput
                            name="state"
                            options={STATES.states}
                            error={errorObj.state}
                            handler={validateField}
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
                        />
                    </div>
                </div>
                <div className="row m-0">

                </div>
                <div className="row m-0 d-flex justify-content-start">
                    <div className="pl-2 pr-2">
                        <div className="d-inline-block pr-4">
                            <ThemedButton
                                btnState={btnState}
                                btnText="Save"
                                theme="accent"
                                size="medium"
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