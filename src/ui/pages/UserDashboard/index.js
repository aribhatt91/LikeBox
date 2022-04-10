import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../Page';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import { Suspense } from 'react';
import LoadingModule from '../../components/LoadingModule';
import EventTracker from '../../../libs/api/EventTracker';
import Slider from "react-slick";
import './style.page.css';
import AppButton from '../../components/_generic/AppButton';

const UserAddress = React.lazy(() =>  import('./components/UserAddress'));
const YourBox = React.lazy(() => import('./components/YourBox'));
const UserProfile = React.lazy(() => import('./components/UserProfile'));
const UserSizing = React.lazy(() => import('./components/UserSizing'));
const Orders = React.lazy(() => import('./components/Orders'));

const TABS = [
    {
        key: 'profile',
        title: 'Your profile',
        component: UserProfile
    },
    {
        key: 'sizing',
        title: 'Measurements',
        component: UserSizing
    },
    {
        key: 'box',
        title: 'Your Box',
        component: YourBox
    }
],
CONFIG = {
    dots: false,
    infinite: false,
    variableWidth: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: false,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

if(window.DEV_MODE) {
    TABS.push(
        {
            key: 'address-book',
            title: 'Your addresses',
            component: UserAddress
        },
        {
            key: 'orders',
            title: 'Your orders',
            component: Orders,
            dev: true
        }
    )
}

const TabSlider = ({tabs, settings, user, activeIndex=0}) => {
    const [selected, setSelected] = useState(tabs[activeIndex]);

    const selectTab = (index) => {
        if(selected !== tabs[index]){
            setSelected(tabs[index]);
            EventTracker.trackEvent(EventTracker.events.page.VIEW_CHANGE, "user-dashboard-" + index);
        }
    }
    return (
        <div className='tab-slider container row d-flex flex-column mr-0 ml-0'>
            <div className='col-12 col-lg-9 mx-auto'>
                <Slider className='tab-slider_buttons' {...settings}>
                    {
                        tabs.map((tab, index) => <div className="tab-slider_button mr-4" key={tab.key}>
                            <AppButton onClick={() => {selectTab(index);}} variant={selected.key === tab.key ? "primary" : "secondary"} label={tab.title}  key={tab.key} />
                        </div>)
                    }
                </Slider>
            </div>
            
            <div className='d-flex col-12'>
                {
                    <Suspense fallback={<LoadingModule />}>
                        <selected.component currentUser={user} />
                    </Suspense>
                }
            </div>
        </div>
    )
}


function UserDashboard() {
    const {slug, topic} = useParams();
    const {currentUser} = useContext(AuthContext);
    const SLUGS = TABS.map(tab => tab.key);
    let activeIndex = SLUGS.indexOf(slug);
    activeIndex = activeIndex > -1 ? activeIndex : 0;

    return (
        <Page className="user-dashboard d-flex" pageName={"dashboard"}>
            <div className="container">
                <TabSlider settings={CONFIG} tabs={TABS} onClick={()=>{}} user={currentUser} activeIndex={activeIndex} />
            </div>
        </Page>
    );
    
}

export default UserDashboard;