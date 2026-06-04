import { ColDef } from "ag-grid-community";
import { BillImageLink } from "../components/billImageLink";
import { ManualOrder } from "@/shared/types/dto/orders.dto";

export const colDefs: ColDef<ManualOrder>[] = [
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    sort: "desc",
    valueFormatter: (params) => {
      return new Date(params.value).toLocaleString();
    },
    filter: "agDateColumnFilter",
  },
  {
    field: "validateStatus",
    headerName: "Status",
    flex: 1,
    type: "statusColumn",
    cellStyle: (params) => {
      if (params.value === "PENDING") {
        return { color: "yellow" };
      }
      if (params.value === "COMPLETED") {
        return { color: "green" };
      }
      return { color: "red" };
    },
    filter: "agTextColumnFilter",
  },
  {
    field: "orderName",
    headerName: "Order Name",
    flex: 1,
    pinned: "left",
    filter: "agTextColumnFilter",
  },
  {
    field: "paymentMethod.name",
    headerName: "Payment Method",
    flex: 1,
    filter: "agTextColumnFilter",
  },
  {
    field: "bankReference",
    headerName: "Bank Reference",
    flex: 1,
    filter: "agTextColumnFilter",
  },
  {
    field: "billImageUrl",
    headerName: "Bill Image",
    flex: 1,
    cellRenderer: BillImageLink,
  },
  {
    field: "orderTotalAmount",
    headerName: "Order Total Amount",
    flex: 1,
    filter: "agNumberColumnFilter",
  },
  {
    field: "amount",
    headerName: "User Amount",
    flex: 1,
    filter: "agNumberColumnFilter",
  },
  {
    field: "requiresChange",
    headerName: "Vuelto",
    flex: 1,
    type: "changeColumn",
    // valueFormatter: (params) => (params.value ? "Yes" : "No"),
  },
  {
    colId: "menu",
    type: "menuColumn",
    // cellStyle: { overflow: "visible", zIndex: "auto" },
    // suppressSizeToFit: true,
    maxWidth: 80,
    // pinned: "right",
    onCellClicked: () => {
      return false;
    },
  },
];
