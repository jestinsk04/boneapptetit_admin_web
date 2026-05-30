import { BankHoliday } from "@/shared/types/dto/bank.dto";
import { formatToLocalDateStringTemporal } from "@/shared/utils/helpers";
import { ColDef } from "ag-grid-community";

export const colDefs: ColDef<BankHoliday>[] = [
  {
    field: "date",
    headerName: "Holiday Date",
    flex: 1,
    sort: "desc",
    valueFormatter: (params) => {
      return formatToLocalDateStringTemporal(params.value);
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    valueFormatter: (params) => {
      return formatToLocalDateStringTemporal(params.value);
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,
    valueFormatter: (params) => {
      return formatToLocalDateStringTemporal(params.value);
    },
  },
];
