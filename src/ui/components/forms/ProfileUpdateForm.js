import React, {useState, useContext } from 'react';

import AppForm from './AppForm';
import AppTextInput from './../generic/AppTextInput';
import AppSubmitButton from './../generic/AppSubmitButton';
import AppRadioInput from '../generic/AppRadioInput';
import { CONTACT_INFORMATION_SCHEMA } from '../../../service/validationSchema';
import { PERSONAL_INFORMATION_SCHEMA } from './../../../service/validationSchema';
import { AuthContext } from './../../../store/contexts/AuthContext';
import PageMessage from '../generic/PageMessage';
import { updateUserProfile } from './../../../service/userProfile';
import { LoadingSpinner } from '../LoadingModule';
import { useNotification } from './../../../store/contexts/NotificationProvider';
import AppDateInput from '../generic/AppDateInput';
function ProfileUpdateForm({profile={}, onResult}){
    const [piEditMode, setPiEditMode] = useState(false);//Edit Personal Information
    const [ciEditMode, setCiEditMode] = useState(false);//Edit Personal Information
    const [piFormError, setPiFormError] = useState(null);
    const [ciFormError, setCiFormError] = useState(null);
    const [loading, setLoading] = useState(false);

    let day = "", month = "", year = "";

    if(profile.dob){
        try{
            let d = new Date(profile.dob);
            day = d.getDate();
            month = d.getMonth() + 1;
            year = d.getFullYear();
        }catch(err){

        }
    }

    const dispatch = useNotification();

    const {currentUser} = useContext(AuthContext)
    profile = profile || {};
    const piInitialValues = {
        fname: (profile.name && profile.name.fname ? profile.name.fname : ""),
        lname: (profile.name && profile.name.lname ? profile.name.lname : ""),
        gender: (profile.gender || ""),
        day,
        month,
        year
    }
    const contactInitialValues = {
        mobile: (profile.mobile || "")
    }

    console.log('ProfileUpdateForm:getUser', piInitialValues, contactInitialValues)

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
    updateProfile = async (userInput, {setSubmitting}) => {
        if(currentUser){
            try {
                setLoading(true);
                setSubmitting(true)
                let update = {}
                if(userInput.fname || userInput.lname){
                    update.name = {};
                    if(userInput.fname){
                        update.name.fname = userInput.fname;  
                    }
                    if(userInput.lname){
                        update.name.lname = userInput.lname;  
                    }
                }
                if(userInput.gender){
                    update.gender = userInput.gender;
                }
                if(userInput.contact){
                    update.contact = userInput.contact;
                }
                if(userInput.day && userInput.month && userInput.year){
                    try{
                        var dob = new Date();
                        dob.setDate(Number(userInput.day));
                        dob.setMonth(Number(userInput.month) - 1);
                        dob.setFullYear(Number(userInput.year));
                        update.dob = dob.toDateString();
                        console.log('DOB -> ', update.dob);
                    }catch(err){
                        console.error('Error updating Date of Birth');
                    }
                }
                let res = await updateUserProfile(currentUser.email, update);
                console.log('updateProfile: response', res);
                setPiEditMode(false);
                setCiEditMode(false);
                if(typeof onResult === 'function'){
                    onResult();
                }
                dispatch({
                    type: 'success',
                    message: 'Updated your profile!'
                })
            }catch(err){
                console.error('updateProfile: error', err);
                dispatch({
                    type: 'error',
                    message: 'Uh oh! Something went wrong'
                })
            }finally{
                setSubmitting(false);
                setLoading(false);
            }
            /* validate update values */
            
        }
    }
    
    return (
        <div className={"account-section editable-section position-relative"}>
            <AppForm 
            initialValues={piInitialValues}
            validationSchema={PERSONAL_INFORMATION_SCHEMA}
            onSubmit={updateProfile}>
                <div className={"editable-form mt-5"  +  (piEditMode ? " edit-mode" : "")}>
                    {
                        piFormError && <div className="row m-0 mb-4">
                            <div className="col-md-12 col-lg-12 pl-2 pr-2 clearfix float-none">
                            <PageMessage type="error" text={piFormError} inline={false}/>
                            </div>
                        </div>
                    }
                    <div className="field-group-header mb-3 d-flex justify-content-between">
                        <span className="h4">Personal information</span>
                        <a href="#" className="text-decoration-none font-weight-bolder field-edit" onClick={() => {
                        if(piEditMode){
                            //resetDefPiValues();
                            //TODO find a way to resent initial values when user hits exit
                        }
                        setPiEditMode(!piEditMode)
                        }}>{piEditMode ? "Cancel": "Edit"}</a>
                    </div>
                    
                    <div className="row m-0">
                        <div className="field-group col-md-8 p-0">
                            <div className="col-xs-12 col-md-6 pr-md-3 pl-0 float-left">
                                <AppTextInput
                                    type="text"
                                    disabled={!piEditMode}
                                    name="fname"
                                    label="First name"
                                />
                            </div>
                            <div className="col-xs-12 col-md-6 pr-md-3 pl-0 float-left">
                                <AppTextInput
                                    type="text"
                                    disabled={!piEditMode}
                                    name="lname"
                                    label="Last name"
                                />
                            </div>
                            <div className="col-xs-12 pl-0 float-left mt-1">
                                <p className="col-form-label">Gender</p>
                                <AppRadioInput 
                                    name="gender"
                                    label="Gender"
                                    options={['male', 'female', 'other']}
                                    disabled={!piEditMode}
                                />
                            </div>
                            
                            <div className="col-12 pr-md-3 pl-0 float-left mt-3">
                                <p className="col-form-label">Date of birth (DD/MM/YYYY)</p>
                                <AppDateInput disabled={!piEditMode} />
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
            onSubmit={updateProfile}
            validationSchema={CONTACT_INFORMATION_SCHEMA}>
                <div className={"editable-form mt-4 mb-5"  +  (ciEditMode ? " edit-mode" : "")}>
                    <div className="field-group-header mb-3 d-flex justify-content-between">
                        <span className="h4">Contact</span>
                        <a href="#" className="text-decoration-none font-weight-bolder field-edit" onClick={() => {
                            if(ciEditMode){
                                //resetDefCiValues();
                            }
                            setCiEditMode(!ciEditMode)
                            }}>
                            {ciEditMode ? "Cancel": "Edit"}
                        </a>
                    </div>
                    <div className="row m-0">
                        <div className="field-group col-md-8 p-0">
                            {/* <div className="col-md-6 pr-md-3 pl-0 float-left clearfix">
                                <AppTextInput
                                    type="email"
                                    disabled={!ciEditMode}
                                    name="email"
                                    label="Email"
                                />
                            </div> */}
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
            {loading && <LoadingSpinner text="Please wait while we update your profile" />}
        </div>
    )
}

export default ProfileUpdateForm;