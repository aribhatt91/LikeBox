import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Page from '../Page';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../store/contexts/AuthContext';
//import YourBox from './components/YourBox';
//import { logScreenView } from '../../../service/api/analytics';
import { Suspense } from 'react';
import LoadingModule from '../../components/LoadingModule';
import './index.css';
import EventTracker from '../../../service/api/EventTracker';
import Settings from './components/Settings';

const YourBox = React.lazy(() => import('./components/YourBox'));
const UserProfile = React.lazy(() => import('./components/UserProfile'));
const UserSizing = React.lazy(() => import('./components/UserSizing'));


function UserDashboard(props) {
    const {slug, topic} = useParams();
    const {currentUser} = useContext(AuthContext);
    let k = ['box', 'profile', 'sizing', 'settings'].some(el => el === (slug || "").toLowerCase()) ? (slug || "").toLowerCase() : 'profile';
    const [key, setKey] = useState(k);
    const switchTab = (k) => {
        setKey(k);
        //logScreenView();
        EventTracker.trackEvent(EventTracker.events.page.VIEW_CHANGE, "user-dashboard-" + k);
    }
    window.mlog('SLUG', slug, topic);

    const SETTINGS_MAP = {
        'sizing': 1,
        'address-book': 2,
        'orders': 3
    }

    return (
        <Page className="user-dashboard d-flex" pageName={"dashboard"}>
            <div className="container">
                <div className="app-tab-layout">
                    <Tabs
                        activeKey={key}
                        onSelect={switchTab}>
                        
                        <Tab eventKey="profile" title="Profile">
                            <Suspense fallback={<LoadingModule />}>
                                <UserProfile currentUser={currentUser}/>
                            </Suspense>
                        </Tab>
                        <Tab eventKey="box" title="Your box">
                            <Suspense fallback={<LoadingModule />}>
                                <YourBox currentUser={currentUser} />
                            </Suspense>
                            
                        </Tab>
                        
                        {
                            window.DEV_MODE && <Tab eventKey="settings" title="Settings">
                                <div className="user-settings-wrapper">
                                    <Settings currentUser={currentUser} open={topic && SETTINGS_MAP[topic] ? SETTINGS_MAP[topic] : 0}  />
                                </div>
                            </Tab> 
                        }
                        {
                            !window.DEV_MODE && <Tab eventKey="sizing" title="Sizing">
                                <Suspense fallback={<LoadingModule />}>
                                    <UserSizing currentUser={currentUser} slideIn={true}/>
                                </Suspense>
                            </Tab>
                        }
                    </Tabs>
                </div>
            </div>
        </Page>
    );
    
}

export default UserDashboard;