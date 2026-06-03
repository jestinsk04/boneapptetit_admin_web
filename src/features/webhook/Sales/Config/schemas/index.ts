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
  odooPriceListId: yup
    .number()
    .required("Odoo Price List is required")
    .moreThan(0, "Odoo Price List must be selected"),
  paymentMethods: yup.string().required("Payment Methods is required"),
  odooTipSKU: yup.string().required("Tip SKU is required"),
  odooDiscountSKU: yup.string().required("Discount SKU is required"),
  odooShippingSKU: yup.string().required("Shipping SKU is required"),
  odooShippingDiscountSKU: yup
    .string()
    .required("Shipping Discount SKU is required"),
});
