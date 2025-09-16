import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { colDefs } from "./utils/tableDefinitions";
import { AG_GRID_LOCALE_ES_MX } from "@/shared/libs/ag-grid-es";
import { agGridTheme } from "@/shared/ui/ag-grid-theme";

interface EventLog {
  id: number;
  event: string;
  status: string;
  timestamp: string;
}

export const WebhookLogsView = () => {
  const [rowData] = React.useState<EventLog[]>([
    {
      id: 1,
      event: "user.created",
      status: "success",
      timestamp: "2023-10-01 12:00:00",
    },
    {
      id: 2,
      event: "order.updated",
      status: "failed",
      timestamp: "2023-10-01 12:05:00",
    },
    {
      id: 3,
      event: "payment.created",
      status: "success",
      timestamp: "2023-10-01 12:10:00",
    },
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-4/5 max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Webhook Logs</h2>
        <div className="w-full h-[40rem]">
          <AgGridReact
            localeText={AG_GRID_LOCALE_ES_MX}
            theme={agGridTheme}
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={50}
            paginationPageSizeSelector={[50, 100, 200]}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};
