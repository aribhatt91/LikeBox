import React, { useEffect, useState, useContext } from 'react'
import Page from '../Page';
import { AuthContext } from '../../../store/contexts/AuthContext';
import AppImage from '../../components/generic/AppImage';
import STYLES from '../../../service/constants/styles';
import AppButton from '../../components/generic/AppButton';
import { getUserStylePref } from '../../../service/userProfile';
import { useNotification } from '../../../store/contexts/NotificationProvider';
import { updateUserStylePref } from '../../../service/userProfile';
import { useHistory } from 'react-router';
import { LoadingPendulum } from '../../components/LoadingModule';
import EventTracker from '../../../service/api/EventTracker';

function StyleTile({styleName, toggleFunction, thumbnail, selected=false}){
    return (
        <button type="button" onClick={(e) => {
            e.preventDefault();
            toggleFunction(styleName);
        }} className={"style-tile" + (selected ? ' selected' : '')}>
            <AppImage src={thumbnail} className="style-thumb" alt={styleName} />
            <span className="style-text">{styleName}</span>
            <div className={"style-check"}></div>
        </button>
    )
}
let modified = false;
export default function YourStyle() {
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const notify = useNotification();
    const history = useHistory();
    const toggleSelected = (style) => {
        modified = true;
        if(selected.indexOf(style) > -1){
            /* 
            Remove style from selected list
            */
            let s = selected.filter(item => item !== style);
            
            setSelected(s);
        }else {
            setSelected([].concat(selected).concat(style));
        }
    }

    useEffect(() => {
        if(currentUser){
            (async () => {
                //TODO - Fetch past user selection and set default
                try{
                    let styles = await getUserStylePref(currentUser.email);
                    if(styles && Array.isArray(styles)){
                        setSelected(styles);
                    }
                }catch(err){
                    console.error(err);
                }
            })();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [currentUser])

    const submit = async () => {
        try {
            setSubmitting(true);

            if(modified){
                await updateUserStylePref(currentUser.email, selected);
                notify({
                    type: 'success',
                    message: 'Saved your preferences',
                    title: 'Success!'
                });

                /* 
                Sending selected styles to Google Analytics
                */
                //setUserStyles(selected);
                EventTracker.trackEvent(EventTracker.events.user.UPDATE_STYLE, selected);
            }
            
            setTimeout(() => {
                history.push('/your-style-cards');
            }, 500);
            
        }catch(err) {
            notify({
                type: 'error',
                message: 'Something went wrong!',
                title: 'Uh!'
            });
            setSubmitting(false);
        }finally {
            
        }
    }
    return (
        <Page pageName="Your style">
            {loading && <LoadingPendulum />}
            {!loading && <section className="your-style">
                <div className="container d-flex flex-column justify-content-start mb-5">
                    <h1 className="text-center mt-5">Your style</h1>
                    <h4 className="text-center color mb-5">(Select each of the styles that apply to you)</h4>
                    <div className="row">
                        {
                            STYLES.map((style, index) => <div key={index} className="col-12 col-md-4 col-lg-3 p-2 float-left zoom-in">
                                <StyleTile 
                                    styleName={style.name} 
                                    thumbnail={style.img} 
                                    selected={selected.indexOf(style.name) > -1} 
                                    toggleFunction={toggleSelected} />
                            </div>)
                        }
                    </div>
                </div>
                <div className="container mt-5 mb-5">
                    <AppButton loading={submitting} label="Continue" className="d-block ml-auto mr-auto pr-5 pl-5 mb-5" onClick={submit} />
                </div>

            </section>}
            
        </Page>
    )
}
