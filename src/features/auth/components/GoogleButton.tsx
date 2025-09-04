import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/shared/config/firebase';
import { Button } from 'flowbite-react';
import { FaGoogle } from 'react-icons/fa';

interface GoogleButtonProps {
    handleLogin: (user: string) => void;
}

export const GoogleButton = ({ handleLogin }: GoogleButtonProps) => {
    const handleGoogleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);
            if (response.user.email) {
                handleLogin(response.user.email);
                console.log('¡Usuario ha iniciado sesión con Google!');
            }
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }
    };

    return (
        <Button
            onClick={handleGoogleLogin}
            color="light"
            className="flex items-center gap-2 border border-gray-300 shadow-sm hover:bg-gray-100"
            pill
        >
            <FaGoogle className="w-5 h-5" />
            Iniciar sesión con Google
        </Button>
    );
};
