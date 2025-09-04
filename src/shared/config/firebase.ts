import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCJzuJjTkbrwwoechYQI-pYGGZJkKCGTLk',
    authDomain: 'gen-lang-client-0359101987.firebaseapp.com',
    projectId: 'gen-lang-client-0359101987',
    storageBucket: 'gen-lang-client-0359101987.firebasestorage.app',
    messagingSenderId: '341937476244',
    appId: '1:341937476244:web:c6e737b76cb2101fdd1a81',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
