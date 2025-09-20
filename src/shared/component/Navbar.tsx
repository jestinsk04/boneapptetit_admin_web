import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import logo from "../../assets/logo.png"; // Adjust the path to your logo file
import { useAuthStore, useAuthStoreActions } from "../../app/store/auth"; // Importa el estado de autenticación
import { Link, useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";

export const Nav = () => {
  const [isLogout, setIsLogout] = useState(false);
  const removeSessionData = useAuthStoreActions().removeSessionData;
  const user = useAuthStore().email;
  const navigation = useNavigate();

  const handleLogout = useCallback(async () => {
    setIsLogout(true);
    await removeSessionData();
    navigation("/login");
  }, [removeSessionData, navigation]);

  return (
    <Navbar fluid className="w-full bg-[#f3e0be] border-b border-gray-300">
      <NavbarBrand
        as={Link}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        to="/"
      >
        <img src={logo} className="mr-3 h-6 sm:h-14" alt="Logo" />
        <span>Bienvenido {user} !</span>
      </NavbarBrand>

      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink
          as={Link}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          to="/"
          active
        >
          Home
        </NavbarLink>
        <NavbarLink
          as={Link}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          to="/webhook/config"
        >
          Webhook Config
        </NavbarLink>
        <NavbarLink
          as={Link}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          to="/webhook/logs"
        >
          Webhook Logs
        </NavbarLink>
      </NavbarCollapse>
      <Button
        disabled={isLogout}
        onClick={handleLogout}
        className="m-0 bg-[#ff7340] hover:bg-[#e66a38] focus:ring-[#ff7340] focus:ring-4 gap-1"
      >
        <FaArrowRightToBracket />
        Cerrar sesión
      </Button>
    </Navbar>
  );
};
