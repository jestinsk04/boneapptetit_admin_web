import { ColDef } from "ag-grid-community";

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
    field: "orderName",
    headerName: "Order Name",
    flex: 1,
  },
  {
    field: "paymentMethod.name",
    headerName: "Payment Method",
    flex: 1,
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
    field: "validateStatus",
    headerName: "Status",
    flex: 1,
    type: "statusColumn",
    cellStyle: { overflow: "visible", zIndex: "auto" },
  },
  {
    colId: "menu",
    type: "menuColumn",
    cellStyle: { overflow: "visible", zIndex: "auto" },
    suppressSizeToFit: true,
    maxWidth: 80,
    onCellClicked: () => {
      return false;
    },
  },
];
