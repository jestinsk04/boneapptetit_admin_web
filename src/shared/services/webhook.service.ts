import { EndpointsList } from "../config/endpoints";
import { IsVoidResponseType, restApiHttpRequest } from "../libs/httpClient";
import {
  updateWebhookConfigRequest,
  webhookConfig,
  webhookCurrencies,
  webhookLogs,
} from "../types/dto/webhook.dto";

const GetLogs = async (): Promise<webhookLogs[]> => {
  try {
    const res = await restApiHttpRequest<webhookLogs[]>({
      endpoint: EndpointsList.Webhook.GetLogs.endpoint,
    });
    console.log("Webhook logs response:", res);
    if (res) {
      return res;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const GetConfig = async (): Promise<webhookConfig | undefined> => {
  try {
    const res = await restApiHttpRequest<webhookConfig>({
      endpoint: EndpointsList.Webhook.GetConfig.endpoint,
    });
    if (res) {
      return res;
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const UpdateConfig = async (
  data: updateWebhookConfigRequest
): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: EndpointsList.Webhook.UpdateConfig.endpoint,
      body: data,
      method: "put",
      isResponseVoid: true,
    });
    if (res === undefined || res.status !== 200) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const GetCurrencies = async (): Promise<webhookCurrencies[]> => {
  try {
    const res = await restApiHttpRequest<webhookCurrencies[]>({
      endpoint: EndpointsList.Webhook.GetCurrencies.endpoint,
      method: "get",
    });
    if (res) {
      return res;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const webhookService = {
  GetLogs,
  GetConfig,
  UpdateConfig,
  GetCurrencies,
};
