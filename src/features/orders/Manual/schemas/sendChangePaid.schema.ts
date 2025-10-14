import * as yup from "yup";

export const sendChangePaidSchema = yup.object().shape({
  orderId: yup.number().required("Order ID is required"),
  orderName: yup.string().required("Order Name is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0, "Amount must be at least 0"),
});