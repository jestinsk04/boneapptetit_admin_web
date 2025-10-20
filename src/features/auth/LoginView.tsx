import { useCallback } from "react";
import { GoogleButton } from "./components/GoogleButton";
import type { LoginUserData } from "@/shared/types/dto/login.dto";
import { useAuthStoreActions } from "@/app/store/auth";
import { useNavigate } from "react-router";
import BoneAppetitLogo from "@/assets/logo";

const LoginView = () => {
  const setUserData = useAuthStoreActions().setUserData;
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (user: LoginUserData) => {
      setUserData({
        displayName: user.displayName,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      navigate("/");
    },
    [setUserData, navigate]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-bone-beige">
      <div className="shadow-xl rounded-2xl p-8 w-full max-w-md text-center bg-white">
        {/* Logo */}
        {/* <img
          src={Logo}
          alt="Logo Boneappetit"
          className="mx-auto w-20 h-20 mb-4"
        /> */}
        <div className="flex justify-center mb-4">
          <BoneAppetitLogo />
        </div>

        {/* Nombre de la empresa */}
        <h1 className="text-3xl font-extrabold mb-2">
          Boneappetit Food
        </h1>

        {/* Subtítulo */}
        <p className="mb-6">Sistema de administración</p>

        {/* Botón de Google */}
        <GoogleButton handleLogin={handleLogin} />

        {/* Helper */}
        <p className="mt-6 text-sm">
          Accede con tu cuenta Google para continuar
        </p>
      </div>
    </div>
  );
};

export default LoginView;
