import firebase from 'firebase/app';
import 'firebase/database'; 

const config = {
    apiKey: "AIzaSyA_Q8j3cYRSgSWO8PvU4OSJ4Kd9n5nqg24",
    authDomain: "testing-speakup.firebaseapp.com",
    projectId: "testing-speakup",
    storageBucket: "testing-speakup.appspot.com",
    messagingSenderId: "630260348505",
    appId: "1:630260348505:web:772c7527762ada2791a348"
};

const app= firebase.initializeApp(config);

export default app;
