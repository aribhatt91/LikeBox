import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyAG6MR9BYDyLM5hTfuvzGoVpRj3pKh76nE",
        authDomain: "webapp-470b3.firebaseapp.com",
        projectId: "webapp-470b3",
        storageBucket: "webapp-470b3.appspot.com",
        messagingSenderId: "503191097763",
        appId: "1:503191097763:web:871ca4c3ee0e57dab0ca16",
        databaseURL: "https://webapp-470b3-default-rtdb.firebaseio.com/"
    }
)

export const auth = app.auth();

export default app;