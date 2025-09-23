export const API_HOST =
  import.meta.env.VITE_API_HOST || "https://boneappetit-food-webhook-341937476244.us-central1.run.app";

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
    ReintentLog: {
      endpoint: "/webhook/admin/reintent",
    },
  },
};
