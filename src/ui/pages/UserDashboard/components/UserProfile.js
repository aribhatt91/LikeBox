import React, {useState, useEffect } from 'react';
import { fetchUserProfile } from '../../../../libs/UserService';
import ProfileUpdateForm from '../../../components/_forms/ProfileUpdateForm';
import { LoadingPendulum } from '../../../components/LoadingModule';


function UserProfile({currentUser}){
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    


    useEffect(()=>{
        
        if(currentUser){
            setLoading(true);
            (async ()=>{
                try{
                    window.loginfo('UserProfileFragment:fetchUserProfile:getUser: request', currentUser.email, (new Date()).getTime());
                    let res = await fetchUserProfile(currentUser.email);
                    
                    window.loginfo('UserProfileFragment:fetchUserProfile:getUser: response', res, (new Date()).getTime());
                    setProfile(res);
                }catch(err){
                    window.logerror('UserProfileFragment:fetchUserProfile:getUser:error', err);
                }finally{
                    setLoading(false);
                }
            })()
        }
    }, [currentUser])

    const onUpdateComplete = async () => {
        if(currentUser){
            try{
                window.loginfo('onUpdateComplete:fetchUserProfile:getUser: request', currentUser.email, (new Date()).getTime());
                let res = await fetchUserProfile(currentUser.email);
                window.loginfo('onUpdateComplete:fetchUserProfile:getUser: response', res, (new Date()).getTime());
                setProfile(res);
            }catch(err){
                window.logerror('onUpdateComplete:fetchUserProfile:getUser:error', err);
            }
        }
    }

    
    
    return (
        <React.Fragment>
            <div className={"account-section editable-section position-relative mx-auto col-lg-8"}>
                {
                    !loading && <ProfileUpdateForm profile={profile || {}} onResult={onUpdateComplete} />
                }
                
            </div>
            {
                loading && <LoadingPendulum />
            }
        </React.Fragment>
    )
}

export default UserProfile;