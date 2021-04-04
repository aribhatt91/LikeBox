import React, {useState, useContext } from 'react';

import AppForm from './AppForm';
import AppTextInput from './../generic/AppTextInput';
import AppSubmitButton from './../generic/AppSubmitButton';
import AppRadioInput from '../generic/AppRadioInput';
import { CONTACT_INFORMATION_SCHEMA } from '../../../service/validationSchema';
import { PERSONAL_INFORMATION_SCHEMA } from './../../../service/validationSchema';
import { AuthContext } from './../../../store/contexts/AuthContext';
import PageMessage from '../generic/PageMessage';

function ProfileUpdateForm({profile={}, onResult}){
    const [piEditMode, setPiEditMode] = useState(false);//Edit Personal Information
    const [ciEditMode, setCiEditMode] = useState(false);//Edit Personal Information
    const [piFormError, setPiFormError] = useState(null);
    const [ciFormError, setCiFormError] = useState(null);
    const {currentUser} = useContext(AuthContext)
    
    const piInitialValues = {
        fname: (profile.name && profile.name.fname ? profile.name.fname : ""),
        lname: (profile.name && profile.name.lname ? profile.name.lname : ""),
        gender: (profile.gender || "")
    }
    const contactInitialValues = {
        mobile: (profile.mobile || "")
    }

    const resetDefPiValues = () => {
        /* let defVal = {
            ...piInitialValues
        }
        console.log('Resetting defvals', defVal); */
        //setFieldState(defVal);
    },
    resetDefCiValues = () => {
        /* let defVal = {
            ...fieldState,
            contactInitialValues
        }
        console.log('Resetting defvals', defVal); */
        //setFieldState(defVal);
    },
    updatePersonalInformation = async (userInput, {setSubmitting}) => {
        if(currentUser){

        }
    },
    updateContactInformation = async (userInput, {setSubmitting}) => {
        if(currentUser){
            
        }
    }
    
    return (
        <div className={"account-section editable-section"}>
            <AppForm 
            initialValues={piInitialValues}
            onSubmit={updatePersonalInformation}
            validationSchema={PERSONAL_INFORMATION_SCHEMA}
            >
                <div className={"editable-form mt-5"  +  (piEditMode ? " edit-mode" : "")}>
                    {
                        piFormError && <div className="row m-0 mb-4">
                            <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none">
                            <PageMessage type="error" text={piFormError} inline={false}/>
                            </div>
                        </div>
                    }
                    <div className="field-group-header mb-3 d-flex justify-content-between">
                        <span className="h4">Personal information</span><span className="cursor-pointer field-edit" onClick={() => {
                        if(piEditMode){
                            //resetDefPiValues();
                            //TODO find a way to resent initial values when user hits exit
                        }
                        setPiEditMode(!piEditMode)
                        }}>{piEditMode ? "Cancel": "Edit"}</span>
                    </div>
                    
                    <div className="row m-0">
                        <div className="field-group col-md-8 p-0">
                            <div className="col-md-6 pr-md-3 pl-0 float-left">
                                <AppTextInput
                                    type="text"
                                    disabled={!piEditMode}
                                    name="fname"
                                    label="First name"
                                />
                            </div>
                            <div className="col-md-6 pr-md-3 pl-0 float-left">
                                <AppTextInput
                                    type="text"
                                    disabled={!piEditMode}
                                    name="lname"
                                    label="Last name"
                                />
                            </div>
                            <div className="col-md-6 pl-0 float-left">
                                {/* <RadioButtonGroup
                                    title="Gender"
                                    disabled={!piEditMode}
                                    defvalue={fieldState.gender}
                                    handler={handleRadioButton}
                                    options={gender_options}
                                    name="gender"
                                    orientation="row"
                                /> */}
                                <AppRadioInput 
                                    name="gender"
                                    label="Gender"
                                    options={['male', 'female', 'other']}
                                    disabled={!piEditMode}
                                />
                            </div>
                        </div>
                        <div className={"save-btn-container clear-both col-md-4" + (piEditMode ? "" : " d-none")}>
                            <AppSubmitButton
                                text="Save"
                                className="w-100 border-0 border-radius-0"
                            />
                        </div>
                    </div>
                </div>
            </AppForm>
            <AppForm
            initialValues={contactInitialValues}
            onSubmit={updateContactInformation}
            validationSchema={CONTACT_INFORMATION_SCHEMA}>
                <div className={"editable-form mt-4 mb-5"  +  (ciEditMode ? " edit-mode" : "")}>
                    <div className="field-group-header mb-3 d-flex justify-content-between">
                        <span className="h4">Contact</span>
                        <span className="field-edit" onClick={() => {
                            if(ciEditMode){
                                //resetDefCiValues();
                            }
                            setCiEditMode(!ciEditMode)
                            }}>
                            {ciEditMode ? "Cancel": "Edit"}
                        </span>
                    </div>
                    <div className="row m-0">
                        <div className="field-group col-md-8 p-0">
                            <div className="col-md-6 pr-md-3 pl-0 float-left clearfix">
                                <AppTextInput
                                    type="email"
                                    disabled={!ciEditMode}
                                    name="email"
                                    label="Email"
                                />
                            </div>
                            <div className="col-md-6 pr-md-3 pl-0 float-left clearfix">
                                <AppTextInput
                                    type="text"
                                    disabled={!ciEditMode}
                                    name="contact"
                                    label="Mobile"
                                />
                            </div>
                        </div>
                        <div className={"save-btn-container col-md-4" + (ciEditMode ? "" : " d-none")}>
                            <AppSubmitButton
                                text="Save"
                                className="w-100 border-0 border-radius-0"
                            />
                        </div>
                    </div>
                </div>
            </AppForm>
        </div>
    )
}

export default ProfileUpdateForm;