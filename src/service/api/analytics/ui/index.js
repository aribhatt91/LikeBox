import { logEvent, firebaseAnalyticsEvents } from "../../firebase";

export default { 
    /*
    Header 
    */
    logOpenNavigation: (panel_name) => {
        logEvent('open_navigation');
    },
    logOpenMobileNavigation: (panel_name) => {
        logEvent('open_mobile_navigation');

    },
    logClickNavigationStyleCTA: () => {
        logEvent('nav_item_click');
    },
    /* Home page */
    logHomePageTilesClick: () => {
        logEvent('home_page_tile');
    },
    /* 
    Landing page
    */
    logClickSubscriptionCTA: () => {
        
    },
    logOpenFAQAccordion: () => {

    },
    logOpenTNC: () => {

    },
    logClickCategoryTiles: () => {

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

