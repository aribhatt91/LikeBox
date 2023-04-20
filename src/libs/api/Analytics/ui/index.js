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
        sendEvent('click_subscription_cta', {type: 'ui-event'});
    },
    logOpenFAQAccordion: () => {
        sendEvent('view_faq', {type: 'ui-event'});
    },
    logOpenTNC: () => {
        sendEvent('view_tnc', {type: 'ui-event'});
    },
    /* 
    Your style page
    */
    logVisitYourStyle: () => {
        sendEvent('view_styles', {type: 'ui-event'});
    },
    logVisitYourStyleCards: () => {
        sendEvent('view_swipe_cards', {'type': 'ui-event'});
    },
    /* 
    User dashboard
    */
    logVisitSizingDashboard: () => {

    },
    logVisitBoxDashboard: () => {

    },
    logUpdateProfile: () => {

    },
    logFormSubmission: (formId) => {
        sendEvent('form_submission', {
            'type': 'form',
            'form.name': formId
        })
    },
    logFormError: (formId, error) => {
        sendEvent('form_error', {
            'type': 'form',
            'form.name': formId,
            'form.error': error
        })
    }
}

