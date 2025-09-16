import { useCallback } from "react";
import { GoogleButton } from "./components/GoogleButton";
import type { LoginUserData } from "@/shared/types/dto/login.dto";
import { useAuthStoreActions } from "@/app/store/auth";
import Logo from "../../assets/logo.png"; // 👈 tu logo aquí

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
    
    <div className="flex items-center justify-center min-h-screen bg-[#f3e0be]">
      <div className="shadow-xl rounded-2xl p-8 w-full max-w-md text-center bg-white">
        
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo Boneappetit"
          className="mx-auto w-20 h-20 mb-4"
        />

        {/* Nombre de la empresa */}
        <h1 className="text-3xl font-extrabold text-[#3b2b2b] mb-2">
          Boneappetit Food
        </h1>

        {/* Subtítulo */}
        <p className="text-gray-600 mb-6">Sistema de administración</p>

        {/* Botón de Google */}
        <GoogleButton handleLogin={handleLogin} />

        {/* Helper */}
        <p className="mt-6 text-sm text-gray-500">
          Accede con tu cuenta Google para continuar
        </p>
      </div>
    </div>
  );
};

export default LoginView;
