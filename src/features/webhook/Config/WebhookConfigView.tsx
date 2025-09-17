import { webhookService } from "@/shared/services/webhook.service";
import { LayoutOutletContext } from "@/shared/types/components/Layout";
import {
  syncOrderByStatusType,
  updateWebhookConfigRequest,
  webhookConfig,
} from "@/shared/types/dto/webhook.dto";
import { Button, Card, Label, Select } from "flowbite-react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { webhookConfigSchema } from "./schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputErrorMessage } from "@/shared/component/InputErrorMessage";

export const WebhookConfigView = () => {
  const [landing, setLanding] = useState(true);
  const { handleChangeViewName, currentViewName } =
    useOutletContext<LayoutOutletContext>();
  const [currentData, setCurrentData] = useState<webhookConfig | undefined>(
    undefined
  );

  const onSubmit: SubmitHandler<updateWebhookConfigRequest> = useCallback(
    async (data) => {
      setLanding(true);
      const response = await webhookService.UpdateConfig(data);

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
    const config = await webhookService.GetConfig();
    if (!config) {
      toast.error("Failed to fetch webhook configuration");
      return;
    }
    setCurrentData(config);
    setLanding(false);
  }, []);

  useEffect(() => {
    handleFetchConfig();
  }, [handleFetchConfig]);

  useLayoutEffect(() => {
    if (currentViewName !== "Webhook Configuration") {
      handleChangeViewName("Webhook Configuration");
    }
  }, [currentViewName, handleChangeViewName]);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<updateWebhookConfigRequest>({
    resolver: yupResolver(webhookConfigSchema),
    values: {
      id: currentData?.id || 0,
      odooOrderCreationState: currentData?.odooOrderCreationState || "",
      syncOrderByStatus: currentData?.syncOrderByStatus || "PAID",
    },
  });

  const handleChangeSyncOrderByStatus = (type: syncOrderByStatusType) => {
    setValue("syncOrderByStatus", type);
  };

  const handleChangeCreationState = (state: string) => {
    setValue("odooOrderCreationState", state);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="min-w-md grid grid-cols-1 gap-4">
        <Card>
          <div className="text-center text-lg font-semibold">
            Webhook Configuration
          </div>
          {/* Configuration form will go here */}
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  const value = e.target.value as string;
                  handleChangeCreationState(value);
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
                <Label htmlFor="syncOrderByStatus">Order Sync By Status</Label>
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
                <option value="FULLFILLED">FULLFILLED</option>
                <option value="PAID_AND_FULLFILLED">PAID AND FULLFILLED</option>
              </Select>
              <InputErrorMessage message={errors.syncOrderByStatus?.message} />
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
