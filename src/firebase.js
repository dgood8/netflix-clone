import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCO_2Dxk8u1uLkjLLR4wjPFc9rRZ6EkfLY",
    authDomain: "netflix-clone-e8681.firebaseapp.com",
    projectId: "netflix-clone-e8681",
    storageBucket: "netflix-clone-e8681.appspot.com",
    messagingSenderId: "11577002292",
    appId: "1:11577002292:web:ac077fa0b7640dde7e3d61",
    measurementId: "G-63EY6VET2L"
});

const db = firebaseApp.firestore();
export{db};
