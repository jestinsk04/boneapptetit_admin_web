import { ColDef } from "ag-grid-community";

export const colDefs: ColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    filter: true,
    width: 90,
  },
  {
    field: "createDate",
    headerName: "Create Date",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    field: "operation",
    headerName: "Operation",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    field: "operationStatus",
    headerName: "Operation Status",
    sortable: true,
    filter: true,
    flex: 1,
    cellRenderer: (params: { value: boolean }) =>
      params.value ? "Success" : "Failed",
  },
  {
    field: "objectID",
    headerName: "Object ID",
    sortable: true,
    filter: true,
    flex: 1,
  },
];
