// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_nQHJETXCRbv47_m4hxdNFD8cqY3HUyY",
  authDomain: "login-922a2.firebaseapp.com",
  projectId: "login-922a2",
  storageBucket: "login-922a2.appspot.com",
  messagingSenderId: "244417374878",
  appId: "1:244417374878:web:8ef5e25ca2dd4c184fe98f"
};

let auth;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export default auth;