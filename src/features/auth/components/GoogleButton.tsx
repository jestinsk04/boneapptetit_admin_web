import { loginWithGoogle } from '@/shared/config/firebase';
import type { LoginUserData } from '@/shared/types/dto/login.dto';
import { Button } from 'flowbite-react';
import { FaGoogle } from 'react-icons/fa';

interface GoogleButtonProps {
    handleLogin: (user: LoginUserData) => void;
}

export const GoogleButton = ({ handleLogin }: GoogleButtonProps) => {
    const handleGoogleLogin = async () => {
        try {
            const response = await loginWithGoogle();
            if (response) {
                handleLogin(response);
                console.log('¡Usuario ha iniciado sesión con Google!');
            } else {
                alert('No se pudo iniciar sesión con Google');
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
