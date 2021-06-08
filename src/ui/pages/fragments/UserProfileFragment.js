import React, {useState, useEffect, useContext } from 'react';

import { AuthContext } from './../../../store/contexts/AuthContext';
import { fetchUserProfile } from '../../../service/userProfile';
import ProfileUpdateForm from './../../components/forms/ProfileUpdateForm';
import { LoadingSpinner } from '../../components/LoadingModule';


function UserProfileFragment({}){
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        
        if(currentUser){
            setLoading(true);
            (async ()=>{
                try{
                    window.mlog('UserProfileFragment:fetchUserProfile:getUser: request', currentUser.email, (new Date()).getTime());
                    let res = await fetchUserProfile(currentUser.email);
                    
                    window.mlog('UserProfileFragment:fetchUserProfile:getUser: response', res, (new Date()).getTime());
                    setProfile(res);
                }catch(err){
                    console.error('UserProfileFragment:fetchUserProfile:getUser:error', err);
                }finally{
                    setLoading(false);
                }
            })()
        }
    }, [currentUser])

    const onUpdateComplete = async () => {
        if(currentUser){
            try{
                window.mlog('onUpdateComplete:fetchUserProfile:getUser: request', currentUser.email, (new Date()).getTime());
                let res = await fetchUserProfile(currentUser.email);
                window.mlog('onUpdateComplete:fetchUserProfile:getUser: response', res, (new Date()).getTime());
                setProfile(res);
            }catch(err){
                console.error('onUpdateComplete:fetchUserProfile:getUser:error', err);
            }
        }
    }

    
    
    return (
        <div className={"account-section editable-section position-relative"}>
            {
                !loading && <ProfileUpdateForm profile={profile || {}} onResult={onUpdateComplete} />
            }
            {
                loading && <LoadingSpinner text={"Please wait while we fetch your profile"} />
            }
        </div>
    )
}

export default UserProfileFragment;