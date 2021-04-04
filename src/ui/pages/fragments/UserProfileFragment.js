import React, {useState, useEffect, useContext } from 'react';

import RadioButtonGroup from '../../components/generic/RadioButtonGroup';
import TextInput from '../../components/generic/TextInput';
import ThemedButton from '../../components/generic/ThemedButton';
import USER from '../../../mock/user.json';
import { AuthContext } from './../../../store/contexts/AuthContext';
import { fetchUserProfile } from '../../../service/userProfile';
import ProfileUpdateForm from './../../components/forms/ProfileUpdateForm';

function UserProfileFragment({}){
    const [profile, setProfile] = useState(null);//Edit Personal Information
    const [ciEditMode, setCiEditMode] = useState(false);//Edit Personal Information
    const [fieldState, setFieldState] = useState(USER);

    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        if(currentUser){
            (async ()=>{
                try{
                    console.log('useEffect:fetchUserProfile: request', currentUser.email);
                    fetchUserProfile(currentUser.email).then(res => {
                        setProfile(res);
                        console.log('useEffect:fetchUserProfile: response', res);
                    }).catch(err => {

                    });
                    
                    
                }catch(err){
                    console.error('useEffect:fetchUserProfile', err);
                }
            })()
        }
    }, [currentUser])
    
    return (
        <div className={"account-section editable-section"}>
            {
                profile && <ProfileUpdateForm profile={profile} />
            }
            
            {
                !profile && <div></div>
            }
        </div>
    )
}

export default UserProfileFragment;