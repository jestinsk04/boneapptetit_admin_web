export const API_HOST =
  import.meta.env.VITE_API_HOST ||
  "https://boneappetit-food-webhook-341937476244.us-central1.run.app";

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
    GetPriceList: {
      endpoint: "/webhook/admin/price-lists",
    },
    GetCurrencies: {
      endpoint: "/webhook/admin/currencies",
    },
    GetSalesConfig: {
      endpoint: "/webhook/admin/sales/config",
    },
    UpdateSalesConfig: {
      endpoint: "/webhook/admin/sales/config",
    },
    GetSalesLogs: {
      endpoint: "/webhook/admin/sales/logs",
    },
    ReintentSalesLog: {
      endpoint: "/webhook/admin/sales/reintent",
    },
    GetInvoicesConfig: {
      endpoint: "/webhook/admin/invoices/config",
    },
    UpdateInvoicesConfig: {
      endpoint: "/webhook/admin/invoices/config",
    },
    GetInvoicesLogs: {
      endpoint: "/webhook/admin/invoices/logs",
    },
    ReintentInvoicesLog: {
      endpoint: "/webhook/admin/invoices/reintent",
    },
  },
  Orders: {
    getBCVTasa: {
      endpoint: "bcv-tasa",
    },
    GetManualOrders: {
      endpoint: "/orders/manual",
    },
    UpdateManualOrderStatus: {
      endpoint: "/orders/manual",
    },
    SendChangePaid: {
      endpoint: "/orders/change-paid",
    },
    GetPaymentMethods: {
      endpoint: "/orders/payment-methods",
    },
  },
};
