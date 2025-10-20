import { EndpointsList } from "../config/endpoints";
import { IsVoidResponseType, restApiHttpRequest } from "../libs/httpClient";
import {
  BCVTasaUSDResponse,
  ChangePaidRequest,
  ManualOrder,
  PaymentMethod,
  UpdateOrderRequest,
} from "../types/dto/orders.dto";

const getBCVTasa = async (): Promise<BCVTasaUSDResponse | undefined> => {
  try {
    const response = await restApiHttpRequest<BCVTasaUSDResponse>({
      method: "get",
      endpoint: EndpointsList.Orders.getBCVTasa.endpoint,
    });
    return response || undefined;
  } catch (error) {
    console.error("Error fetching BCV Tasa:", error);
  }
};

const GetManualOrders = async (): Promise<ManualOrder[]> => {
  try {
    const res = await restApiHttpRequest<ManualOrder[]>({
      endpoint: EndpointsList.Orders.GetManualOrders.endpoint,
    });
    if (res) {
      return res;
    }
    return [];
  } catch (error) {
    console.error("Error fetching manual orders:", error);
    return [];
  }
};

const UpdateManualOrder = async (
  data: UpdateOrderRequest,
  id: number
): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: `${EndpointsList.Orders.UpdateManualOrderStatus.endpoint}/${id}`,
      body: data,
      method: "put",
      isResponseVoid: true,
    });
    if (res === undefined || res.status !== 200) return false;
    return true;
  } catch (error) {
    console.error("Error updating manual order status:", error);
    return false;
  }
};

const SendChangePaid = async (data: ChangePaidRequest): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: EndpointsList.Orders.SendChangePaid.endpoint,
      body: data,
      method: "post",
      isResponseVoid: true,
    });
    if (res === undefined || res.status !== 200) return false;
    return true;
  } catch (error) {
    console.error("Error sending change paid request:", error);
    return false;
  }
};

const GetPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    const res = await restApiHttpRequest<PaymentMethod[]>({
      endpoint: EndpointsList.Orders.GetPaymentMethods.endpoint,
    });
    if (res) {
      return res;
    }
    return [];
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }
};

export const ordersService = {
  GetManualOrders,
  UpdateManualOrder,
  SendChangePaid,
  getBCVTasa,
  GetPaymentMethods,
};
