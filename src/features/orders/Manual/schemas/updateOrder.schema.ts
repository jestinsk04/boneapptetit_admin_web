import * as yup from "yup";

export const updateOrderSchema = yup.object().shape({
  orderName: yup.string().required("Order Name is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount must be at least 0"),
  validateStatus: yup.string().required("Validate Status is required"),
  logisticValidate: yup.boolean().required("Logistic Validate is required"),
  paymentMethodId: yup.number().required("Payment Method ID is required"),
  requiresChange: yup.boolean().required("Requires Change is required"),
  bankReference: yup.string().optional().default(""),
});
