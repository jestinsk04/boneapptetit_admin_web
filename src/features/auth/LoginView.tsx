import { useCallback } from 'react';
import { GoogleButton } from './components/GoogleButton';
import type { LoginUserData } from '@/shared/types/dto/login.dto';
import { useAuthStoreActions } from '@/app/store/auth';

const LoginView = () => {
    const setUserData = useAuthStoreActions().setUserData;
    const handleLogin = useCallback(
        (user: LoginUserData) => {
            setUserData({
                displayName: user.displayName,
                email: user.email,
            });
        },
        [setUserData]
    );

    return (
        <div className="grid grid-cols-1 gap-2 justify-items-center">
            <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
            <GoogleButton handleLogin={handleLogin} />
        </div>
    );
};

export default LoginView;
