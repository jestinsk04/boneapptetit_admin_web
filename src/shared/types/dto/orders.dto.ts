export interface BCVTasaUSDResponse {
  date: string;
  rate: number;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface ManualOrder {
  id: number;
  orderName: string;
  orderId: number;
  billImageUrl: string;
  amount: number;
  orderTotalAmount: number;
  requiresChange: boolean;
  validateStatus: string;
  //   returnData?: Uint8Array | null;
  paymentMethodId?: number;
  logisticValidate: boolean;
  paymentMethod?: PaymentMethod | null;
  returnData?: CashReturnData;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  changePaymentLog?: ChangePaymentLog;
  bankReference?: string;
}

export type UpdateOrderRequest = {
  orderName: string;
  validateStatus: string;
  amount: number;
  logisticValidate: boolean;
  requiresChange: boolean;
  paymentMethodId: number;
  bankReference: string;
};

export type ChangePaidRequest = {
  orderId: number;
  orderName: string;
  amount: number;
};

export interface CashReturnData {
  bank: string;
  phone: string;
  dni: string;
  dniType: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface ChangePaymentLog {
  id: number;
  manualOrderId: number;
  reference: string;
  amount: number;
  createdAt: string; // ISO date string
}
