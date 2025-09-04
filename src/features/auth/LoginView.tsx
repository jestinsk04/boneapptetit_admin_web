import { GoogleButton } from './components/GoogleButton';

interface LoginViewProps {
    handleLogin: (user: string) => void;
}

const LoginView = ({ handleLogin }: LoginViewProps) => {
    return (
        <div className="grid grid-cols-1 gap-2 justify-items-center">
            <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
            <GoogleButton handleLogin={handleLogin} />
        </div>
    );
};

export default LoginView;
