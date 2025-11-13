import {
  Button,
  MegaMenu,
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useAuthStore, useAuthStoreActions } from "../../app/store/auth"; // Importa el estado de autenticación
import { Link, useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useBCVTasaStore } from "@/app/store/bcv";
import { currencyFormat } from "../utils/helpers";
import BoneAppetitLogo from "@/assets/logo";

export const Nav = () => {
  const [isLogout, setIsLogout] = useState(false);
  const { tasa } = useBCVTasaStore();
  const removeSessionData = useAuthStoreActions().removeSessionData;
  const user = useAuthStore().email;
  const isAdmin = useAuthStore().isAdmin;
  const navigation = useNavigate();

  const handleLogout = useCallback(async () => {
    setIsLogout(true);
    await removeSessionData();
    navigation("/login");
  }, [removeSessionData, navigation]);

  return (
    <MegaMenu className="w-full bg-bone-beige border-b border-gray-300">
      <NavbarBrand
        as={Link}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        to="/"
      >
        <BoneAppetitLogo />
        <span className="ml-2">Bienvenido {user} !</span>
      </NavbarBrand>
      <div className="order-2 hidden items-center md:flex">
        <span className="border-r-1 pr-2">
          Tasa BCV: {currencyFormat.format(tasa.amount) ?? 0}
        </span>
        <Button
          size="sm"
          disabled={isLogout}
          onClick={handleLogout}
          className="ml-1 bg-bone-orange hover:bg-[#e66a38] focus:ring-[#ff7340] focus:ring-4 gap-1"
        >
          <FaArrowRightToBracket />
          Cerrar sesión
        </Button>
      </div>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink
          as={Link}
          className="md:hover:text-bone-orange"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          to="/"
        >
          Home
        </NavbarLink>
        <NavbarLink className="md:hover:text-bone-orange">
          <MegaMenuDropdown toggle={<>Webhook</>}>
            <ul className={isAdmin ? "grid grid-cols-2" : ""}>
              {isAdmin && (
                <div className="space-y-4 p-4">
                  <li>
                    <Link
                      to="/webhook/sales/config"
                      className="hover:text-bone-orange"
                    >
                      Sales Config
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/webhook/invoices/config"
                      className="hover:text-bone-orange"
                    >
                      Invoices Config
                    </Link>
                  </li>
                </div>
              )}
              <div className="space-y-4 p-4">
                <li>
                  <Link
                    to="/webhook/sales/logs"
                    className="hover:text-bone-orange"
                  >
                    Sales Logs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/webhook/invoices/logs"
                    className="hover:text-bone-orange"
                  >
                    Invoices Logs
                  </Link>
                </li>
              </div>
            </ul>
          </MegaMenuDropdown>
        </NavbarLink>
        <NavbarLink
          as={Link}
          className="md:hover:text-bone-orange"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          to="/orders/manual"
        >
          Manual Orders
        </NavbarLink>
      </NavbarCollapse>
    </MegaMenu>
  );
};
