import {
  themeQuartz,
  // colorSchemeDark,
  colorSchemeDarkBlue,
} from "ag-grid-community";
import { DropdownTheme } from "flowbite-react";

export const agGridTheme = themeQuartz.withPart(colorSchemeDarkBlue);
export const agGridThemeClassic = themeQuartz;

export const dropdownTheme = {
  arrowIcon: "ml-1 h-4 w-4",
  content: "py-1 focus:outline-none",
  floating: {
    base: "z-auto w-fit divide-y divide-gray-100 rounded shadow focus:outline-none translate-x-[-11%]",
    item: {
      container: "",
      base: "",
    },
  },
  inlineWrapper: "flex items-center",
} as DropdownTheme;
