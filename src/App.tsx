import { useState } from 'react';
import './App.css';
import { Button } from 'flowbite-react';
import LoginView from './features/auth/LoginView';
import { auth } from './shared/config/firebase';

function App() {
    const [user, setUser] = useState<string | null>(null);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            console.log('¡Usuario ha cerrado sesión!');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleLogin = (user: string) => {
        setUser(user);
    };

    return (
        <div className="w-screen flex justify-center items-center">
            {user ? (
                <div className="grid grid-cols-1 gap-4 justify-items-center">
                    <p>¡Hola, {user}!</p>
                    <Button onClick={handleLogout}>Cerrar sesión</Button>
                </div>
            ) : (
                <LoginView handleLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
