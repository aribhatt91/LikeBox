import React, { useState } from 'react';
import UserSizing from './UserSizing';
import UserAddress from './UserAddress';
import OrdersList from './OrdersList';

function Settings({currentUser, open=0}){
    const [showDetail, setShowDetail] = useState(open);

    return (
        <div className={"user-settings w-100" + (showDetail !== 0 ? " detail-open" : "")}>
            <div className="user-settings-menu">
                <ul>
                    <li key="1" onClick={() => setShowDetail(1)}>Sizing</li>
                    <li key="2" onClick={() => setShowDetail(2)}>Addresses</li>
                    <li key="3" onClick={() => setShowDetail(3)}>Past orders</li>
                </ul>
            </div>
            <div className="user-settings-detail">
                <div className="back" onClick={() => setShowDetail("")}>Back to settings</div>
                <ul className="col-12 p-0">
                    <li key="1" className={showDetail === 1 ? "d-flex" : "d-none"}>
                        <UserSizing/>
                    </li>
                    <li key="2" className={showDetail === 2 ? "d-flex" : "d-none"}>
                        <UserAddress currentUser={currentUser}/>
                    </li>
                    <li key="3" className={showDetail === 3 ? "d-flex" : "d-none"}>
                        <OrdersList />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Settings;
