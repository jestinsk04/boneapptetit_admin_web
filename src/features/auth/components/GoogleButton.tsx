import { loginWithGoogle } from "@/shared/config/firebase";
import type { LoginUserData } from "@/shared/types/dto/login.dto";
import { Button, createTheme, ThemeProvider } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";

interface GoogleButtonProps {
  handleLogin: (user: LoginUserData) => void;
}

export const GoogleButton = ({ handleLogin }: GoogleButtonProps) => {
  const handleGoogleLogin = async () => {
    try {
      const response = await loginWithGoogle();
      if (response) {
        handleLogin(response);
        console.log("¡Usuario ha iniciado sesión con Google!");
      } else {
        alert("No se pudo iniciar sesión con Google");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const theme = createTheme({
    button: {
        color:{
          modifed: "bg-[#ff7340] text-white hover:bg-[#e66a38] focus:ring-[#ff7340] focus:ring-4 gap-2",
          default: "bg-yellow-700 text-white hover:bg-yellow-800 focus:ring-primary-300"
        }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={handleGoogleLogin}
        color="modifed"
        pill
       className= " bg-[#ff7340] w-full flex items-center justify-center gap-2"
      >
        <FaGoogle className="w-5 h-5" />
        Iniciar sesión con Google
      </Button>
    </ThemeProvider>
  );
};
