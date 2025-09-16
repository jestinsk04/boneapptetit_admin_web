import { EndpointsList } from "../config/endpoints";
import { restApiHttpRequest } from "../libs/httpClient";

const Login = async (tokenID: string): Promise<boolean> => {
  try {
    await restApiHttpRequest({
      endpoint: EndpointsList.Login.Login.endpoint,
      method: "post",
      body: {
        tokenID,
      },
      isResponseVoid: true,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const ValidateSession = async (): Promise<boolean> => {
  try {
    await restApiHttpRequest({
      endpoint: EndpointsList.Login.ValidateSession.endpoint,
      method: "post",
      body: {},
      isResponseVoid: true,
    });

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
