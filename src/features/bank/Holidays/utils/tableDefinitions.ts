import { BankHoliday } from "@/shared/types/dto/bank.dto";
import { formatToLocalDateStringTemporal } from "@/shared/utils/helpers";
import { ColDef } from "ag-grid-community";

export const colDefs: ColDef<BankHoliday>[] = [
  {
    field: "date",
    headerName: "Holiday Date",
    flex: 1,
    sort: "desc",
    filter: "agDateColumnFilter",
    cellDataType: "dateString",
    valueFormatter: (params) => {
      return formatToLocalDateStringTemporal(params.value);
    },
    filterValueGetter: (params) => {
      return params.data?.date ? params.data.date.substring(0, 10) : null;
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    valueFormatter: (params) => {
      return formatToLocalDateStringTemporal(params.value);
    },
    filterValueGetter: (params) => {
      return params.data?.createdAt
        ? params.data.createdAt.substring(0, 10)
        : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,
    valueFormatter: (params) => {
      return formatToLocalDateStringTemporal(params.value);
    },
    filterValueGetter: (params) => {
      return params.data?.updatedAt
        ? params.data.updatedAt.substring(0, 10)
        : null;
    },
  },
];
