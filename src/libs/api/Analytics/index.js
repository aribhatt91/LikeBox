import UI_EVENTS from './ui';
import USER_EVENTS from './user';
import TRANSACTION_EVENTS from './transaction';
import PRODUCT_EVENTS from './product';
import PAGE_EVENTS from './page';
import { sendEvent } from './GtagHelper';
/* 
Google Analytics event Reference
https://developers.google.com/gtagjs/reference/event

GTAG Events
https://developers.google.com/tag-platform/gtagjs/reference/events
*/

/* 
Generic
*/
const logException = (error_message="", fatal=false) => {
    sendEvent("exception", {
        description: error_message,
        fatal
    });
}

const GAEventStore = {
    logException,
    PAGE_EVENTS,
    UI_EVENTS,
    TRANSACTION_EVENTS,
    USER_EVENTS,
    PRODUCT_EVENTS
}

export default GAEventStore;