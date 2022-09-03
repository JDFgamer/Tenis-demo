import axios from 'axios'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBZMCQfovXdlkdj1x6YhjLW4ISpd80FSXQ",
    authDomain: "nucba-proyecto-c114b.firebaseapp.com",
    projectId: "nucba-proyecto-c114b",
    storageBucket: "nucba-proyecto-c114b.appspot.com",
    messagingSenderId: "323727796106",
    appId: "1:323727796106:web:dcc7f05dd73d64e0e48a73"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const singInWithGoogle = (setUserLogin) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            return {
                name: result.user.displayName,
                email: result.user.email
            }
        })
        .then(async (result) => {
            const payload = await axios.post(`${process.env.REACT_APP_URL}/api/user/createuser`, result)
            return payload.data
        })
        .then((result) => {
            window.localStorage.setItem('login', result)
        })
        .catch((err) => console.log(err))
}