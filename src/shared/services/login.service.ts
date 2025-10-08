import { EndpointsList } from "../config/endpoints";
import { IsVoidResponseType, restApiHttpRequest } from "../libs/httpClient";

const Login = async (tokenID: string): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: EndpointsList.Login.Login.endpoint,
      method: "post",
      body: {
        tokenID,
      },
      isResponseVoid: true,
    });
    console.log(res);
    if (res?.status !== 200) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const ValidateSession = async (): Promise<boolean> => {
  try {
    const res = await restApiHttpRequest<IsVoidResponseType>({
      endpoint: EndpointsList.Login.ValidateSession.endpoint,
      method: "post",
      body: {},
      isResponseVoid: true,
    });

    if (res?.status !== 200) return false;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const Logout = async (): Promise<boolean> => {
  try {
    await restApiHttpRequest({
      endpoint: EndpointsList.Login.Logout.endpoint,
      method: "post",
      isResponseVoid: true,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loginService = {
  Login,
  Logout,
  ValidateSession,
};
