import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyBijQah0gEqZpI9fYUxq-Iw_OE59xLHxNA",
    authDomain: "outh-via-social-network.firebaseapp.com",
    projectId: "outh-via-social-network",
    storageBucket: "outh-via-social-network.appspot.com",
    messagingSenderId: "696222547265",
    appId: "1:696222547265:web:c4b926daf2eb3c9fd775c0",
    measurementId: "G-QRV99TBMP0",
    databaseURL: "https://outh-via-social-network-default-rtdb.europe-west1.firebasedatabase.app",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase
export const database = firebase.database();