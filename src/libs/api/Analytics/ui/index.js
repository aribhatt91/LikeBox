import { sendEvent } from '../GtagHelper';

export default { 
    /*
    Header 
    */
    logOpenNavigation: (panel_name) => {
        sendEvent('open_navigation', {event_category: 'ui-event'});
    },
    logOpenMobileNavigation: (panel_name) => {
        sendEvent('open_mobile_navigation', {event_category: 'ui-event'});

    },
    logClickNavigationStyleCTA: () => {
        sendEvent('nav_item_click', {event_category: 'ui-event'});
    },
    /* Home page */
    logHomePageTilesClick: () => {
        sendEvent('home_page_tile', {event_category: 'ui-event'});
    },
    /* 
    Landing page
    */
    logClickSubscriptionCTA: () => {
        sendEvent('click_subscription_cta', {event_category: 'ui-event'});
    },
    logOpenFAQAccordion: () => {
        sendEvent('view_faq', {event_category: 'ui-event'});
    },
    logOpenTNC: () => {
        sendEvent('view_tnc', {event_category: 'ui-event'});
    },
    /* 
    Your style page
    */
    logVisitYourStyle: () => {

    },
    logVisitYourStyleCards: () => {

    },
    /* 
    User dashboard
    */
    logVisitSizingDashboard: () => {

    },
    logVisitBoxDashboard: () => {

    },
    logUpdateProfile: () => {

    }
}

