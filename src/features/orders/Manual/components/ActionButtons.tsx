import { ManualOrder } from "@/shared/types/dto/orders.dto";
import { dropdownTheme } from "@/shared/ui/ag-grid-theme";
import {
  createTheme,
  Dropdown,
  DropdownItem,
  ThemeProvider,
} from "flowbite-react";
import { FaBars, FaMoneyBill, FaPenToSquare } from "react-icons/fa6";

interface ActionButtonsProps {
  data: ManualOrder;
  onPaidButtonClick: (data: ManualOrder) => void;
  onEditButtonClick?: (data: ManualOrder) => void;
}

const sectionTheme = createTheme({
  dropdown: dropdownTheme,
});

export const ActionButtons = ({
  data,
  onPaidButtonClick,
  onEditButtonClick,
}: ActionButtonsProps) => {
  return (
    <ThemeProvider theme={sectionTheme}>
      <div className="flex justify-center items-center">
        <Dropdown
          size="sm"
          label={<FaBars />}
          dismissOnClick={false}
          placement="left-start"
        >
          <DropdownItem
            icon={FaPenToSquare}
            onClick={() => onEditButtonClick?.(data)}
          >
            Edit
          </DropdownItem>
          {data.requiresChange && (
            <DropdownItem
              icon={FaMoneyBill}
              onClick={() => onPaidButtonClick(data)}
            >
              Vuelto
            </DropdownItem>
          )}
        </Dropdown>
      </div>
    </ThemeProvider>
  );
};
