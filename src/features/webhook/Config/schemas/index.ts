import * as yup from "yup";

export const webhookConfigSchema = yup.object().shape({
  id: yup.number().required(),
  odooOrderCreationState: yup
    .string()
    .required("Odoo Order Creation State is required"),
  syncOrderByStatus: yup.string().required("Sync Order By Status is required"),
});
