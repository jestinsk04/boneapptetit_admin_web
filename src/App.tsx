import './App.css';
import { Button } from 'flowbite-react';
import LoginView from './features/auth/LoginView';
import { useAuthStore, useAuthStoreActions } from './app/store/auth';

function App() {
    const removeSessionData = useAuthStoreActions().removeSessionData;
    const isLoggedIn = useAuthStore().isLoggedIn;
    const user = useAuthStore().email;

    const handleLogout = async () => {
        removeSessionData();
    };

    return (
        <div className="w-screen flex justify-center items-center">
            {isLoggedIn ? (
                <div className="grid grid-cols-1 gap-4 justify-items-center">
                    <p>¡Hola, {user}!</p>
                    <Button onClick={handleLogout}>Cerrar sesión</Button>
                </div>
            ) : (
                <LoginView />
            )}
        </div>
    );
}

export default App;
