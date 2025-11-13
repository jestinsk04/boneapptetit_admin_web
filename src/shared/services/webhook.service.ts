import { EndpointsList } from "../config/endpoints";
import { IsVoidResponseType, restApiHttpRequest } from "../libs/httpClient";
import {
  updateWebhookConfigRequest,
  webhookConfig,
  webhookCurrencies,
  webhookLogs,
} from "../types/dto/webhook.dto";

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

const GetPriceList = async (): Promise<webhookCurrencies[]> => {
  try {
    const res = await restApiHttpRequest<webhookCurrencies[]>({
      endpoint: EndpointsList.Webhook.GetPriceList.endpoint,
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

const GetInvoicesLogs = async (): Promise<webhookLogs[]> => {
  try {
    const res = await restApiHttpRequest<webhookLogs[]>({
      endpoint: EndpointsList.Webhook.GetInvoicesLogs.endpoint,
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

const GetInvoicesConfig = async (): Promise<webhookConfig | undefined> => {
  try {
    const res = await restApiHttpRequest<webhookConfig>({
      endpoint: EndpointsList.Webhook.GetInvoicesConfig.endpoint,
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

const UpdateInvoicesConfig = async (
  data: updateWebhookConfigRequest
): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: EndpointsList.Webhook.UpdateInvoicesConfig.endpoint,
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

const ReintentInvoicesLog = async (id: number): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: `${EndpointsList.Webhook.ReintentInvoicesLog.endpoint}/${id}`,
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

const GetSalesLogs = async (): Promise<webhookLogs[]> => {
  try {
    const res = await restApiHttpRequest<webhookLogs[]>({
      endpoint: EndpointsList.Webhook.GetSalesLogs.endpoint,
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

const GetSalesConfig = async (): Promise<webhookConfig | undefined> => {
  try {
    const res = await restApiHttpRequest<webhookConfig>({
      endpoint: EndpointsList.Webhook.GetSalesConfig.endpoint,
    });
    console.log("Webhook sales config response:", res);
    if (res) {
      return res;
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const UpdateSalesConfig = async (
  data: updateWebhookConfigRequest
): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: EndpointsList.Webhook.UpdateSalesConfig.endpoint,
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

const ReintentSalesLog = async (id: number): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: `${EndpointsList.Webhook.ReintentSalesLog.endpoint}/${id}`,
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

export const webhookService = {
  GetCurrencies,
  GetPriceList,
  GetInvoicesLogs,
  GetInvoicesConfig,
  UpdateInvoicesConfig,
  ReintentInvoicesLog,
  GetSalesLogs,
  GetSalesConfig,
  UpdateSalesConfig,
  ReintentSalesLog,
};
