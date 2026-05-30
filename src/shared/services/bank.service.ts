import { EndpointsList } from "../config/endpoints";
import { IsVoidResponseType, restApiHttpRequest } from "../libs/httpClient";
import { BankHoliday, UploadBankHolidayRequest } from "../types/dto/bank.dto";

const getBankHolidays = async (): Promise<BankHoliday[] | undefined> => {
  try {
    const response = await restApiHttpRequest<BankHoliday[]>({
      method: "get",
      endpoint: EndpointsList.Bank.GetBankHolidays.endpoint,
    });
    return response || undefined;
  } catch (error) {
    console.error("Error fetching bank holidays:", error);
  }
};

const uploadBankHoliday = async (
  data: UploadBankHolidayRequest,
): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: `${EndpointsList.Bank.UploadBankHoliday.endpoint}`,
      body: data,
      method: "post",
      isResponseVoid: true,
    });
    if (res === undefined || res.status !== 200) return false;
    return true;
  } catch (error) {
    console.error("Error uploading bank holiday:", error);
    return false;
  }
};

export const BankService = {
  getBankHolidays,
  uploadBankHoliday,
};
