import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import DEVCONFIG1 from '../keys/firebase-dev-1.json';
import DEVCONFIG2 from '../keys/firebase-dev-2.json';

const app = firebase.initializeApp(DEVCONFIG2);

export const firebaseAnalytics = firebase.analytics();
export const firebaseAnalyticsEvents = firebase.analytics.EventName;

export const auth = app.auth();

export const db = firebase.firestore();

export const fieldPath = firebase.firestore.FieldPath;

export const logEvent = (event_name, payload) => {
    window.mlog('logEvent', event_name, payload);
    firebaseAnalytics.logEvent(event_name, payload);
}

export default app;

