export interface webhookLogs {
  id: string;
  createDate: string;
  operation: string;
  operationStatus: boolean;
  objectID: number;
}

export interface webhookConfig {
  id: number;
  odooOrderCreationState: string;
  syncOrderByStatus: string;
  odooCurrencyTypeId: number;
  createAt: string;
  updateAt: string;
}

export type syncOrderByStatusType =
  | "PAID"
  | "FULLFILLED"
  | "PAID_AND_FULLFILLED";

export type updateWebhookConfigRequest = {
  id: number;
  odooOrderCreationState: string;
  syncOrderByStatus: string;
  odooCurrencyTypeId: number;
};

export type webhookCurrencies = {
  id: number;
  odooId: number;
  symbol: string;
  createAt: string;
  updateAt: string;
};
