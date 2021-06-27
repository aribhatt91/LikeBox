import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileFragment from './fragments/UserProfileFragment';
import UserAddressFragment from './fragments/UserAddressFragment';
import { Tabs } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import LikeBoxSizing from '../components/LikeBoxSizing';
import Page from './Page';
import { useContext, useEffect } from 'react';
import { AuthContext } from './../../store/contexts/AuthContext';


function UserSettings({currentUser}){
    const [showDetail, setShowDetail] = useState("");

    return (
        <div className={"user-settings w-100" + (showDetail !== "" ? " detail-open" : "")}>
            <div className="user-settings-menu">
                <ul>
                    {/* <li key="0" onClick={() => setShowDetail('sizing')}>Sizing</li> */}
                    {/* <li key="1" onClick={() => setShowDetail('pay')}>Payment method</li> */}
                    <li key="2" onClick={() => setShowDetail('addr')}>Addresses</li>
                    <li key="3" onClick={() => setShowDetail('contact')}>Contact preferences </li>
                    <li key="4" onClick={() => setShowDetail('lang')}>Language</li>
                    <li key="5" onClick={() => setShowDetail('country')}>Country</li>
                </ul>
            </div>
            <div className="user-settings-detail">
                <div className="back" onClick={() => setShowDetail("")}>Back to settings</div>
                <ul className="col-12 p-0">
                    {/* <li key="0" className={showDetail === "sizing" ? "d-flex" : "d-none"}>
                        <LikeBoxPreference/>
                    </li> */}
                    {/* <li key="1" className={showDetail === "pay" ? "d-flex" : "d-none"}>
                        <UserPaymentOptionsFragment />
                    </li> */}
                    <li key="2" className={showDetail === "addr" ? "d-flex" : "d-none"}>
                        <UserAddressFragment currentUser={currentUser}/>
                    </li>
                    <li key="3" className={showDetail === "contact" ? "d-flex" : "d-none"}>
                        
                    </li>
                    <li key="4" className={showDetail === "lang" ? "d-flex" : "d-none"}>
                        
                    </li>
                    <li key="5" className={showDetail === "country" ? "d-flex" : "d-none"}>
                        
                    </li>
                </ul>
            </div>
        </div>
    )
}
function YourBox({user}) {
    useEffect(()=>{
        if(user){
            /* (async () => {
                let items = await get
            })() */
        }
    },[user])
    return <div></div>
}
function DashboardNavigation({userFirstName, logoSrc}){
    const {slug} = useParams();
    const {currentUser} = useContext(AuthContext);
    let k = ['box', 'profile', 'sizing', 'settings'].some(el => el === (slug || "").toLowerCase()) ? (slug || "").toLowerCase() : 'profile';
    const [key, setKey] = useState(k);
    return (
        <div className="app-tab-layout">
            <Tabs
                activeKey={key}
                onSelect={k => setKey(k)}>
                
                <Tab eventKey="profile" title="Profile">
                    <UserProfileFragment currentUser={currentUser}/>
                </Tab>
                <Tab eventKey="box" title="Your box">
                    <div></div>
                </Tab>
                <Tab eventKey="sizing" title="Sizing">
                    <LikeBoxSizing slideIn={true}/>
                </Tab>
                {/* <Tab eventKey="settings" title="Settings">
                    <div className="user-settings-wrapper">
                        <UserSettings currentUser={currentUser} />
                    </div>
                </Tab> */}
            </Tabs>
        </div>
    )
}
function UserDashboard(props) {
    return (
        <Page className="user-dashboard d-flex" pageName={"dashboard"}>
            <DashboardNavigation></DashboardNavigation>
        </Page>
    );
    
}

export default UserDashboard;