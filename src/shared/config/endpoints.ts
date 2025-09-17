export const API_HOST =
  import.meta.env.VITE_API_HOST || "http://localhost:8080";

export const EndpointsList = {
  Login: {
    Login: {
      endpoint: "/login",
    },
    ValidateSession: {
      endpoint: "/login/verify ",
    },
    Logout: {
      endpoint: "/logout",
    },
  },
  Webhook: {
    GetLogs: {
      endpoint: "/webhook/admin/logs",
    },
    GetConfig: {
      endpoint: "/webhook/admin/config",
    },
    UpdateConfig: {
      endpoint: "/webhook/admin/config",
    },
    GetCurrencies: {
      endpoint: "/webhook/admin/currencies",
    },
  },
};
