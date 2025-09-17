import { webhookService } from "@/shared/services/webhook.service";
import { webhookCurrencies } from "@/shared/types/dto/webhook.dto";
import { Label, Select } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
// Singleton para cachear las monedas
let cachedCurrencies: webhookCurrencies[] | null = null;
import { toast } from "react-toastify";

interface WebhookCurrenciesDropdownProps {
  currentValue: number;
  onSelect: (value: number) => void;
  required?: boolean;
}

export const WebhookCurrenciesDropdown = ({
  currentValue,
  onSelect,
  required,
}: WebhookCurrenciesDropdownProps) => {
  const [currencies, setCurrencies] = useState<webhookCurrencies[]>([]);

  const handleFetchCurrencies = useCallback(async () => {
    if (cachedCurrencies) {
      setCurrencies(cachedCurrencies);
      return;
    }
    const res = await webhookService.GetCurrencies();
    if (res) {
      cachedCurrencies = res;
      setCurrencies(res);
    } else {
      toast.error("Failed to fetch currencies");
    }
  }, []);

  useEffect(() => {
    handleFetchCurrencies();
  }, [handleFetchCurrencies]);

  return (
    <>
      <div>
        <Label htmlFor="currency">Currency</Label>
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
