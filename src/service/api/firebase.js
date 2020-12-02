import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyBYOdKnJRiZZJ9d6a4SFqVDHRS1AooLviA",
        authDomain: "spa-aribhatt.firebaseapp.com",
        databaseURL: "https://spa-aribhatt.firebaseio.com",
        projectId: "spa-aribhatt",
        storageBucket: "spa-aribhatt.appspot.com",
        messagingSenderId: "331228169107"
    }
)

export const auth = app.auth();

export default app;