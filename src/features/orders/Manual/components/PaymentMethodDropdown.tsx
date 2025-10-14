import { ordersService } from "@/shared/services/orders.service";
import { PaymentMethod } from "@/shared/types/dto/orders.dto";
import { Select } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";

interface PaymentMethodDropdownProps {
  currentValue: number;
  onChange: (value: number) => void;
}

export const PaymentMethodDropdown = ({
  currentValue,
  onChange,
}: PaymentMethodDropdownProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const fetchPaymentMethods = useCallback(async () => {
    const methods = await ordersService.GetPaymentMethods();
    setPaymentMethods(methods);
  }, []);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  return (
    <Select
      value={currentValue}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {paymentMethods.map((method) => (
        <option key={method.id} value={method.id}>
          {method.name}
        </option>
      ))}
    </Select>
  );
};
