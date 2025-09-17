import {
  Breadcrumb,
  BreadcrumbItem,
  createTheme,
  ThemeProvider,
} from "flowbite-react";
import { JSX, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router";
import { LayoutOutletContext } from "../types/components/Layout";

export interface LayoutProps {
  sectionName: string;
}

export const Layout = ({ sectionName }: LayoutProps) => {
  const [viewName, setViewName] = useState("");
  const [viewNameWithComponent, setViewNameWithComponent] = useState<
    JSX.Element | undefined
  >(undefined);
  const [breadcrumbItems, setBreacrombItems] = useState<
    JSX.Element | undefined
  >(undefined);

  const navigation = useNavigate();
  const sectionTheme = createTheme({
    breadcrumb: {
      item: {
        href: {
          off: "text-lg",
          on: "text-lg",
        },
      },
    },
    badge: {
      root: {
        color: {
          dark: "bg-gray-800 text-white hover:bg-gray-400",
          success: "bg-green-100 text-green-800 hover:bg-green-200",
        },
      },
    },
  });

  const handleChangeViewName = (name: string) => {
    setViewName(name);
    setViewNameWithComponent(undefined);
  };
  const handleChangeViewNameComponent = (component: JSX.Element) =>
    setViewNameWithComponent(component);
  const handleBreadCrombsItemsWithComponents = (component: JSX.Element) =>
    setBreacrombItems(component);

  return (
    <div className="@container/admin w-full mb-auto mt-2 px-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex text-3xl text-gray-800 gap-2">
          {viewNameWithComponent ? viewNameWithComponent : viewName}
        </div>
        <ThemeProvider theme={sectionTheme}>
          <Breadcrumb>
            <BreadcrumbItem
              href=""
              onClick={() => {
                navigation("/");
              }}
              icon={FaHouse}
            >
              Inicio
            </BreadcrumbItem>

            {breadcrumbItems ? (
              breadcrumbItems
            ) : (
              <>
                <BreadcrumbItem>{sectionName}</BreadcrumbItem>
                <BreadcrumbItem>{viewName}</BreadcrumbItem>
              </>
            )}
          </Breadcrumb>
        </ThemeProvider>
      </div>
      <Outlet
        context={
          {
            handleChangeViewName,
            currentViewName: viewName,
            handleChangeViewNameComponent,
            handleBreadCrombsItemsWithComponents,
          } satisfies LayoutOutletContext
        }
      />
    </div>
  );
};
