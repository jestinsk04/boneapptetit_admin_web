import { useCallback, useLayoutEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { colDefs } from "./utils/tableDefinitions";
import { AG_GRID_LOCALE_ES_MX } from "@/shared/libs/ag-grid-es";
import { agGridTheme } from "@/shared/ui/ag-grid-theme";
import { Card } from "flowbite-react";
import { webhookService } from "@/shared/services/webhook.service";
import { useQuery } from "@tanstack/react-query";
import { GridOptions, GridReadyEvent } from "ag-grid-community";
import { webhookLogs } from "@/shared/types/dto/webhook.dto";
import { useOutletContext } from "react-router";
import { LayoutOutletContext } from "@/shared/types/components/Layout";
import { ReintentButton } from "./components/ReintentButton";
import { toast } from "react-toastify";

export const WebhookLogsView = () => {
  const { handleChangeViewName, currentViewName } =
    useOutletContext<LayoutOutletContext>();

  useLayoutEffect(() => {
    if (currentViewName !== "Webhook Logs") {
      handleChangeViewName("Webhook Logs");
    }
  }, [currentViewName, handleChangeViewName]);
  const { data: gridData, refetch: refetchGridData } = useQuery({
    queryKey: ["webhook-logs-data"],
    queryFn: async () => await webhookService.GetLogs(),
    initialData: [],
    enabled: false, // Evita que se ejecute automáticamente al montar
  });

  const handleReintent = useCallback(
    async (data: webhookLogs) => {
      const res = await webhookService.ReintentLog(data.id);
      if (res) {
        toast.success(`Reintento de orden ${data.operation} exitoso`);
        await refetchGridData();
      } else {
        toast.error(`Error al reintentar orden ${data.operation}`);
      }
    },
    [refetchGridData]
  );

  const gridOptions: GridOptions = useMemo(() => {
    return {
      columnTypes: {
        menuColumn: {
          cellRenderer: ReintentButton,
          cellRendererParams: {
            handleReintent,
          },
        },
      },
    };
  }, [handleReintent]);

  const handleGridReady = useCallback(
    async (params: GridReadyEvent) => {
      await refetchGridData();
      params.api.sizeColumnsToFit();
    },
    [refetchGridData]
  );

  return (
    <>
      {/* Dashboard */}
      <div className="h-25 flex px-24 gap-10 mb-4 justify-center">
        <Card className="flex-1 text-center max-w-sm">
          <div className="text-lg font-semibold">Total Sync</div>
          <div className="text-xl">
            {gridData.filter((log: webhookLogs) => log.operationStatus)
              .length || 0}
          </div>
        </Card>
        <Card className="flex-1 text-center max-w-sm">
          <div className="text-lg font-semibold">Total Not Sync</div>
          <div className="text-xl">
            {gridData.filter((log: webhookLogs) => !log.operationStatus)
              .length || 0}
          </div>
        </Card>
      </div>
      <Card>
        <div className="w-full h-[40rem]">
          <AgGridReact
            localeText={AG_GRID_LOCALE_ES_MX}
            theme={agGridTheme}
            rowData={gridData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={50}
            paginationPageSizeSelector={[50, 100, 200]}
            className="text-sm"
            onGridReady={handleGridReady}
            gridOptions={gridOptions}
          />
        </div>
      </Card>
    </>
  );
};
