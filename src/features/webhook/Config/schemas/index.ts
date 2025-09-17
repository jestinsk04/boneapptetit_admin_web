import * as yup from "yup";

export const webhookConfigSchema = yup.object().shape({
  id: yup.number().required(),
  odooOrderCreationState: yup
    .string()
    .required("Odoo Order Creation State is required"),
  syncOrderByStatus: yup.string().required("Sync Order By Status is required"),
  odooCurrencyTypeId: yup
    .number()
    .required("Odoo Currency Type is required")
    .moreThan(0, "Odoo Currency Type must be selected"),
});
