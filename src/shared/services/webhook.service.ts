import { EndpointsList } from "../config/endpoints";
import { restApiHttpRequest } from "../libs/httpClient";
import {
  updateWebhookConfigRequest,
  webhookConfig,
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
    await restApiHttpRequest({
      endpoint: EndpointsList.Webhook.UpdateConfig.endpoint,
      body: data,
      method: "put",
      isResponseVoid: true,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const webhookService = {
  GetLogs,
  GetConfig,
  UpdateConfig,
};
