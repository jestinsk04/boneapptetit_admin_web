import { webhookService } from "@/shared/services/webhook.service";
import { webhookCurrencies } from "@/shared/types/dto/webhook.dto";
import { Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
// Singleton para cachear las monedas
let cachedCurrencies: webhookCurrencies[] | null = null;
import { toast } from "react-toastify";

interface WebhookPriceListsDropdownProps {
  currentValue: number;
  onSelect: (value: number) => void;
  required?: boolean;
}

export const WebhookPriceListsDropdown = ({
  currentValue,
  onSelect,
  required,
}: WebhookPriceListsDropdownProps) => {
  const [currencies, setCurrencies] = useState<webhookCurrencies[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (cachedCurrencies) {
        setCurrencies(cachedCurrencies);
        return;
      }
      const res = await webhookService.GetPriceList();
      if (!isMounted) return;
      if (res) {
        cachedCurrencies = res;
        setCurrencies(res);
      } else {
        toast.error("Failed to fetch currencies");
      }
    };

    // Fetch data after a short delay
    setTimeout(() => fetchData(), 0);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="priceList">Price List</Label>
      </div>
      <Select
        value={currentValue}
        onChange={(e) => onSelect(Number(e.target.value))}
        required={required}
      >
        <option value={0}>Select a currency</option>
        {currencies.map((currency) => (
          <option key={currency.id} value={currency.id}>
            {currency.symbol}
          </option>
        ))}
      </Select>
    </>
  );
};
