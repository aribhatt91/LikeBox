import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import DEVCONFIG1 from '../keys/firebase-dev-1.json';
import DEVCONFIG2 from '../keys/firebase-dev-2.json';

const app = firebase.initializeApp(DEVCONFIG2)

export const auth = app.auth();

export const db = firebase.firestore();

export const fieldPath = firebase.firestore.FieldPath;

export default app;

