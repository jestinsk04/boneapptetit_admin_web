export interface webhookLogs {
  id: number;
  createDate: string;
  operation: string;
  operationStatus: string;
  objectID: number;
}

export interface webhookConfig {
  id: number;
  odooOrderCreationState: string;
  syncOrderByStatus: string;
  odooCurrencyTypeId: number;
  odooPriceListId: number;
  paymentMethods: string;
  odooTipSKU: string;
  odooDiscountSKU: string;
  odooShippingSKU: string;
  createAt: string;
  updateAt: string;
}

export type odooOrderCreationStateType = "CONFIRMED" | "UNCONFIRMED";

export type syncOrderByStatusType =
  | "PAID"
  | "FULLFILLED"
  | "PAID_AND_FULLFILLED";

export type updateWebhookConfigRequest = {
  id: number;
  odooOrderCreationState: string;
  syncOrderByStatus: string;
  odooCurrencyTypeId: number;
  odooPriceListId: number;
  paymentMethods: string;
  odooTipSKU: string;
  odooDiscountSKU: string;
  odooShippingSKU: string;
};

export type webhookCurrencies = {
  id: number;
  odooId: number;
  symbol: string;
  createAt: string;
  updateAt: string;
};
