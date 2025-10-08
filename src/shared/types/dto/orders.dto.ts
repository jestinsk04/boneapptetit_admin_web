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
  paymentMethod?: PaymentMethod | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type UpdateOrderStatusRequest = {
  orderId: number;
  newStatus: string;
};

export type ChangePaidRequest = {
  orderId: number;
  orderName: string;
  amount: number;
};
