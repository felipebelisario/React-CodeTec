import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCOQ2va4pM_a3onbCpGlSVDpm4M3e7LPZo",
    authDomain: "mymoney-71935.firebaseapp.com",
    databaseURL: "https://mymoney-71935.firebaseio.com",
    projectId: "mymoney-71935",
    storageBucket: "mymoney-71935.appspot.com",
    messagingSenderId: "693457190637"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();