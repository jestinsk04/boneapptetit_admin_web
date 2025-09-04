import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import type { LoginUserData } from '../types/dto/login.dto';
import { loginService } from '../services/login.service';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function loginWithGoogle(): Promise<undefined | LoginUserData> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const tokenID = await cred.user.getIdToken(/* forceRefresh */ true);

    if (!cred.user) return;

    const response = await loginService.Login(tokenID);

    // Si el backend borró al usuario por no tener claim:
    if (!response) {
        await signOut(auth); // limpia sesión del cliente
        console.error('acceso denegado');
        return;
    }

    const user: LoginUserData = {
        displayName: cred.user.displayName || '',
        email: cred.user.email || '',
    };

    return user;
}

export async function logoutEverywhere() {
    await loginService.Logout();
    await signOut(auth);
}
