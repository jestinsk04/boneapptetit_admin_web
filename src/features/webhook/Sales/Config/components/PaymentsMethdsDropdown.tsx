import {
  Checkbox,
  createTheme,
  Dropdown,
  DropdownItem,
  Label,
  ThemeProvider,
} from "flowbite-react";

const paymentsMethods = [
  "Zelle",
  "Efectivo a la Entrega",
  "Pago Móvil",
  "shopify_payments",
];

interface PaymentsMethodsDropdownProps {
  currentValue: string;
  onSelected: (methods: string) => void;
}

export const PaymentsMethodsDropdown = ({
  currentValue,
  onSelected,
}: PaymentsMethodsDropdownProps) => {
  const theme = createTheme({
    dropdown: {
      arrowIcon: "h-6 w-6 text-gray-500",
      floating: {
        target: "w-full",
      },
    },
    button: {
      size: {
        md: "h-10 px-2 text-sm",
      },
      base: "relative flex items-center justify-between rounded-lg text-left font-normal focus:outline-none focus:ring-4",
      color: {
        light:
          "border border-gray-300 bg-gray-50 text-gray-900 hover:bg-gray-50 focus:ring-gray-100",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-2 block">
        <Label htmlFor="syncOrderByStatus">Metodos de Pago</Label>
      </div>
      <Dropdown fullSized color={"light"} label="Select Payment Methods">
        {paymentsMethods.map((value, key) => (
          <DropdownItem key={key}>
            <Checkbox
              color={"dark"}
              id={value}
              onChange={() => onSelected(value)}
              checked={currentValue?.includes(value) || false}
            />
            <Label htmlFor={value} className="ml-1 flex">
              {value}
            </Label>
          </DropdownItem>
        ))}
      </Dropdown>
    </ThemeProvider>
  );
};
