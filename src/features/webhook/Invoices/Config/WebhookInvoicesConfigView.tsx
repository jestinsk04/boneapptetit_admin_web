import { webhookService } from "@/shared/services/webhook.service";
import { LayoutOutletContext } from "@/shared/types/components/Layout";
import {
  odooOrderCreationStateType,
  syncOrderByStatusType,
  updateWebhookConfigRequest,
  webhookConfig,
} from "@/shared/types/dto/webhook.dto";
import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { webhookConfigSchema } from "./schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputErrorMessage } from "@/shared/component/InputErrorMessage";
import { WebhookCurrenciesDropdown } from "./components/WebhookCurrenciesDropdown";
import { PaymentsMethodsDropdown } from "./components/PaymentsMethdsDropdown";
import { WebhookPriceListsDropdown } from "../../Sales/Config/components/WebhookPriceListsDropdown";

export const WebhookInvoicesConfigView = () => {
  const [landing, setLanding] = useState(false);
  const { handleChangeViewName, currentViewName } =
    useOutletContext<LayoutOutletContext>();
  const [currentData, setCurrentData] = useState<webhookConfig | undefined>(
    undefined
  );

  const onSubmit: SubmitHandler<updateWebhookConfigRequest> = useCallback(
    async (data) => {
      setLanding(true);
      const response = await webhookService.UpdateInvoicesConfig(data);

      if (response) {
        toast.success("Se actualizo la configuración del webhook");
      } else {
        toast.error("Error al actualizar la configuración del webhook");
      }
      setLanding(false);
    },
    []
  );

  const handleFetchConfig = useCallback(async () => {
    setLanding(true);
    const config = await webhookService.GetInvoicesConfig();
    if (!config) {
      toast.error("Failed to fetch webhook configuration");
      return;
    }
    setCurrentData(config);
    setLanding(false);
  }, []);

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<updateWebhookConfigRequest>({
    resolver: yupResolver(webhookConfigSchema),
  });

  const paymentMethods = watch("paymentMethods");

  const handleChangeSyncOrderByStatus = (type: syncOrderByStatusType) => {
    setValue("syncOrderByStatus", type);
  };

  const handleChangeCreationState = (state: odooOrderCreationStateType) => {
    setValue("odooOrderCreationState", state);
  };

  const handleChangeCurrency = (currencyId: number) => {
    setValue("odooCurrencyTypeId", currencyId);
  };

  const handleSelectedPaymentMethod = useCallback(
    (method: string) => {
      let updatedMethods = paymentMethods.split(",");
      if (updatedMethods.includes(method)) {
        updatedMethods = updatedMethods.filter((m) => m !== method);
      } else {
        updatedMethods.push(method);
      }
      setValue("paymentMethods", updatedMethods.join(","));
    },
    [paymentMethods, setValue]
  );

  useEffect(() => {
    if (!currentData && !landing) {
      handleFetchConfig();
    }
    if (currentData) {
      reset({
        id: currentData.id,
        odooOrderCreationState: currentData.odooOrderCreationState,
        syncOrderByStatus: currentData.syncOrderByStatus,
        odooCurrencyTypeId: currentData.odooCurrencyTypeId,
        odooPriceListId: currentData.odooPriceListId,
        paymentMethods: currentData.paymentMethods,
        odooTipSKU: currentData.odooTipSKU,
        odooDiscountSKU: currentData.odooDiscountSKU,
        odooShippingSKU: currentData.odooShippingSKU,
      });
    }
  }, [currentData, landing]);

  useLayoutEffect(() => {
    if (currentViewName !== "Webhook Invoices Configuration") {
      handleChangeViewName("Webhook Invoices Configuration");
    }
  }, [currentViewName, handleChangeViewName]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="min-w-md grid grid-cols-1 gap-4">
        <Card className="mb-5">
          <div className="text-center text-lg font-semibold">
            Webhook Configuration
          </div>
          {/* Configuration form will go here */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="odooOrderCreationState">
                    Order Creation State
                  </Label>
                </div>
                <Select
                  id="odooOrderCreationState"
                  required
                  value={watch("odooOrderCreationState")}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChangeCreationState(
                      e.target.value as odooOrderCreationStateType
                    );
                  }}
                >
                  <option value="DRAFT">DRAFT</option>
                </Select>
                <InputErrorMessage
                  message={errors.odooOrderCreationState?.message}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="syncOrderByStatus">
                    Order Sync By Status
                  </Label>
                </div>
                <Select
                  id="syncOrderByStatus"
                  required
                  value={watch("syncOrderByStatus")}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value as syncOrderByStatusType;
                    handleChangeSyncOrderByStatus(value);
                  }}
                >
                  <option value="PAID">PAID</option>
                  <option value="FULFILLED">FULFILLED</option>
                  <option value="PAID_AND_FULFILLED">PAID AND FULFILLED</option>
                </Select>
                <InputErrorMessage
                  message={errors.syncOrderByStatus?.message}
                />
              </div>
              <div>
                <WebhookCurrenciesDropdown
                  currentValue={watch("odooCurrencyTypeId")}
                  onSelect={handleChangeCurrency}
                />
              </div>
              <div>
                <WebhookPriceListsDropdown
                  currentValue={watch("odooPriceListId")}
                  onSelect={handleChangeCurrency}
                />
              </div>
              <div>
                <PaymentsMethodsDropdown
                  currentValue={paymentMethods}
                  onSelected={handleSelectedPaymentMethod}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="odooOrderCreationState">Tip SKU</Label>
                </div>
                <TextInput id="odooTipSKU" {...register("odooTipSKU")} />
                <InputErrorMessage message={errors.odooTipSKU?.message} />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="odooOrderCreationState">Discount SKU</Label>
                </div>
                <TextInput
                  id="odooDiscountSKU"
                  {...register("odooDiscountSKU")}
                />
                <InputErrorMessage message={errors.odooDiscountSKU?.message} />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="odooOrderCreationState">Shipping SKU</Label>
                </div>
                <TextInput
                  id="odooShippingSKU"
                  {...register("odooShippingSKU")}
                />
                <InputErrorMessage message={errors.odooShippingSKU?.message} />
              </div>
            </div>
            <div className="w-full flex justify-center mt-4">
              <Button color="green" disabled={landing} type="submit">
                {landing ? "Saving..." : "Save Configuration"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
