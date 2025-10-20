import { ColDef } from "ag-grid-community";
import { BillImageLink } from "../components/billImageLink";

export const colDefs: ColDef[] = [
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    sort: "desc",
    valueFormatter: (params) => {
      return new Date(params.value).toLocaleString();
    },
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
  },
  {
    field: "orderName",
    headerName: "Order Name",
    flex: 1,
    pinned: "left",
  },
  {
    field: "paymentMethod.name",
    headerName: "Payment Method",
    flex: 1,
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
  },
  {
    field: "amount",
    headerName: "User Amount",
    flex: 1,
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
