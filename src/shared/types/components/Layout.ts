import { JSX } from "react";

export interface LayoutOutletContext {
  currentViewName: string;
  handleChangeViewName: (name: string) => void;
  handleChangeViewNameComponent: (component: JSX.Element) => void;
  handleBreadCrombsItemsWithComponents: (component: JSX.Element) => void;
}
