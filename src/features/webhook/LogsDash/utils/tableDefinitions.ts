import { ColDef } from "ag-grid-community";
import { RowFlags } from "../components/RowFlags";

export const colDefs: ColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    filter: true,
    width: 90,
    sort: "desc",
    hide: true,
  },
  {
    field: "operation",
    headerName: "Operation",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    field: "createDate",
    headerName: "Create Date",
    sortable: true,
    filter: true,
    flex: 1,
    valueFormatter: (params: { value: string }) => {
      const date = new Date(params.value);
      return isNaN(date.getTime()) ? "" : date.toLocaleString();
    },
  },
  {
    field: "objectId",
    headerName: "Object ID",
    sortable: true,
    filter: true,
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    tooltipValueGetter: (p) => (p.value === "" ? undefined : p.value),
    valueFormatter: (p) => (p.value === "" ? "Sin errores" : p.value),
    cellStyle: (p) => (p.value !== "" ? { color: "red" } : null),
  },
  {
    field: "operationStatus",
    headerName: "Status",
    sortable: true,
    filter: true,
    flex: 1,
    cellRenderer: RowFlags,
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
