import { Temporal } from '@js-temporal/polyfill';

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
    timeZone: "UTC",
  });
};

export const formatToLocalDateStringTemporal = (isoDateString: string): string => {
  // Extrae solo la parte de la fecha (año, mes, día) de forma segura
  const date = Temporal.Instant.from(isoDateString).toZonedDateTimeISO('UTC').toPlainDate();
  
  return date.toLocaleString("es-VE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};