import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, themeMaterial } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Registrar módulos (obligatorio en v33+)clear
ModuleRegistry.registerModules([AllCommunityModule]);

interface EventLog {
  id: number;
  event: string;
  status: string;
  timestamp: string;
}

export const WebhookLogs = () => {
  const [rowData] = React.useState<EventLog[]>([
    { id: 1, event: "user.created", status: "success", timestamp: "2023-10-01 12:00:00" },
    { id: 2, event: "order.updated", status: "failed", timestamp: "2023-10-01 12:05:00" },
    { id: 3, event: "payment.created", status: "success", timestamp: "2023-10-01 12:10:00" },
  ]);

  const [colDefs] = React.useState<ColDef<EventLog>[]>([
    { field: "id", headerName: "ID", sortable: true, filter: true, width: 90 },
    { field: "event", headerName: "Event", sortable: true, filter: true, flex: 1 },
    { field: "status", headerName: "Status", sortable: true, filter: true, flex: 1 },
    { field: "timestamp", headerName: "Timestamp", sortable: true, filter: true, flex: 1 },
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
    <div className="w-4/5 max-w-5xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Webhook Logs</h2>
      <div
        className="ag-theme-alpine rounded-2xl shadow-lg border border-gray-200"
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          className="text-sm"
        />
      </div>
    </div>
  </div>
  );
};
