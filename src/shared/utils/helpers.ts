export const currencyFormat = new Intl.NumberFormat("es-VE", {
  style: "currency",
  currency: "VES",
});

// format date to ISO string to Local Date String
export const formatToLocalDateString = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString("es-VE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const paymentsMethods = [
  "Zelle",
  "Efectivo a la Entrega",
  "Pago Móvil",
  "shopify_payments",
  "Cashea ",
  "Domiciliación Cuenta Bancaria Nacional",
];