// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCG_O9rjLeh2ey-pmWjETjGNR1lO3E_qYQ',
  authDomain: 'leboncoin-b5eac.firebaseapp.com',
  projectId: 'leboncoin-b5eac',
  storageBucket: 'leboncoin-b5eac.appspot.com',
  messagingSenderId: '576101855785',
  appId: '1:576101855785:web:5f79595766fdef3cf2e238',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
