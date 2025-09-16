import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import logo from "../../assets/logo.png"; // Adjust the path to your logo file
import { useAuthStore, useAuthStoreActions } from "../../app/store/auth"; // Importa el estado de autenticación
import { useNavigate } from "react-router";



export const Nav = () => {
    const removeSessionData = useAuthStoreActions().removeSessionData;
    const isLoggedIn = useAuthStore().isLoggedIn;
    const user = useAuthStore().email;
  
    const handleLogout = async () => {
      removeSessionData();
    };

     const navigate = useNavigate();
  if (!isLoggedIn) {
    return null; // No renderiza el Navbar si el usuario no está logueado
  }
  

  return (

      <Navbar fluid  className="w-full bg-[#f3e0be] fixed ">
        <NavbarBrand href="https://flowbite-react.com">
          <img src={logo} className="mr-3 h-6 sm:h-14" alt="Logo"/>
          <span>Bienvenido {user} !</span>
        </NavbarBrand>

        <NavbarToggle />
        <NavbarCollapse>
        <NavbarLink onClick={() => navigate("/")} active>
          Home
        </NavbarLink>
        <NavbarLink onClick={() => navigate("/webhookConfig")}>
          Webhook Config
        </NavbarLink>
        <NavbarLink onClick={() => navigate("/webhookLogs")}>
          Webhook Logs
        </NavbarLink>


        </NavbarCollapse>
        <Button onClick={handleLogout} className=" m-0 bg-[#ff7340] hover:bg-[#e66a38] focus:ring-[#ff7340] focus:ring-4">Cerrar sesión</Button>


      </Navbar>
      

  );
};

