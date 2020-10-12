import React, {useState } from 'react';

import RadioButtonGroup from '../components/RadioButtonGroup';
import TextInput from '../components/TextInput';
import ThemedButton from '../components/ThemedButton';

function UserProfile({profile, _profileUpdateHandler}){
    const [piEditMode, setPiEditMode] = useState(false);//Edit Personal Information
    const [ciEditMode, setCiEditMode] = useState(false);//Edit Personal Information
    const [fieldState, setFieldState] = useState({
        fname: 'Aritra',
        lname: 'Bhattacharyya',
        email: 'aribhatt91@gmail.com',
        contact: '+919836592425',
        gender: 'm'
    });
    /* let fieldState = {
        fname: 'Aritra',
        lname: 'Bhattacharyya',
        email: 'aribhatt91@gmail.com',
        contact: '+919836592425',
        gender: 'm'
    }; */
    const gender_options = [{
        label: 'Male',
        value: 'm',
        checked: true
    },
    {
        label: 'Female',
        value: 'f'
    },{
        label: 'Other',
        value: 'o'
    }];

    const handleTextChange = (inputName, text) => {
        console.log('Changed text', inputName, text, {
            ...fieldState,
            [inputName]: text
        });
        setFieldState({
            ...fieldState,
            [inputName]: text
        })
    },
    handleRadioButton = (e) => {
        var val = e.target.value;
        console.log(e.target.name, val);
        setFieldState({
            ...fieldState,
            [e.target.name]: val
        })
    },
    resetDefPiValues = () => {
        let defVal = {
            ...fieldState,
            fname: 'Aritra',
            lname: 'Bhattacharyya',
            gender: 'm'
        }
        console.log('Resetting defvals', defVal);
        setFieldState(defVal);
    },
    resetDefCiValues = () => {
        let defVal = {
            ...fieldState,
            email: 'aribhatt91@gmail.com',
            contact: '+919836592425'
        }
        console.log('Resetting defvals', defVal);
        setFieldState(defVal);
    },
    updateProfile = () => {

    }
    
    return (
        <div className={"account-section editable-section"}>
            <h1 className="editable-section-header mb-4">My Account</h1>
            <div className={"editable-form"  +  (piEditMode ? " edit-mode" : "")}>
                <div className="field-group-header mb-3">Personal information <span className="field-edit" onClick={() => {
                    if(piEditMode){
                        resetDefPiValues();
                    }
                    setPiEditMode(!piEditMode)
                    }}>{piEditMode ? "Cancel": "Edit"}</span></div>
                <div className="row">
                    <div className="field-group col-md-8">
                        <div className="col-md-6 pr-md-3 pl-0 float-left">
                            <TextInput
                                type="text"
                                disabled={!piEditMode}
                                name="fname"
                                label="First name"
                                defvalue={fieldState.fname}
                                handler={handleTextChange}
                            />
                        </div>
                        <div className="col-md-6 pr-md-3 pl-0 float-left">
                            <TextInput
                                type="text"
                                disabled={!piEditMode}
                                name="lname"
                                label="Last name"
                                defvalue={fieldState.lname}
                                handler={handleTextChange}
                            />
                        </div>
                        <div className="col-md-6 pl-0 float-left">
                            <RadioButtonGroup
                                title="Gender"
                                disabled={!piEditMode}
                                defaultValue={fieldState.gender}
                                handler={handleRadioButton}
                                options={gender_options}
                                name="gender"
                                orientation="row"
                            />
                        </div>
                    </div>
                    <div className={"save-btn-container col-md-4" + (piEditMode ? "" : " d-none")}>
                        <ThemedButton
                            theme="accent"
                            btnText="Save"
                            size="medium"
                            handler={updateProfile}
                        />
                    </div>
                </div>
            </div>
            <div className={"editable-form mt-4"  +  (ciEditMode ? " edit-mode" : "")}>
                <div className="field-group-header mb-3">Contact<span className="field-edit" onClick={() => {
                    if(ciEditMode){
                        resetDefCiValues();
                    }
                    setCiEditMode(!ciEditMode)
                    }}>{ciEditMode ? "Cancel": "Edit"}</span></div>
                <div className="row">
                    <div className="field-group col-md-8">
                        <div className="col-md-6 pr-md-3 pl-0 float-left clearfix">
                            <TextInput
                                type="text"
                                disabled={!ciEditMode}
                                name="email"
                                label="Email"
                                defvalue={fieldState.email}
                                handler={handleTextChange}
                            />
                        </div>
                        <div className="col-md-6 pr-md-3 pl-0 float-left clearfix">
                            <TextInput
                                type="text"
                                disabled={!ciEditMode}
                                name="contact"
                                label="Mobile number"
                                defvalue={fieldState.contact}
                                _click={handleTextChange}
                            />
                        </div>
                    </div>
                    <div className={"save-btn-container col-md-4" + (ciEditMode ? "" : " d-none")}>
                        <ThemedButton
                            theme="accent"
                            size="medium"
                            btnText="Save"
                            _click={updateProfile}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;