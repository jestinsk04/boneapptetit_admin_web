import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { colDefs } from "./utils/tableDefinitions";
import { AG_GRID_LOCALE_ES_MX } from "@/shared/libs/ag-grid-es";
import { agGridTheme } from "@/shared/ui/ag-grid-theme";
import { Button, Card } from "flowbite-react";
import { webhookService } from "@/shared/services/webhook.service";
import { useQuery } from "@tanstack/react-query";
import { GridOptions, GridReadyEvent } from "ag-grid-community";
import { webhookLogs } from "@/shared/types/dto/webhook.dto";
import { useOutletContext } from "react-router";
import { LayoutOutletContext } from "@/shared/types/components/Layout";
import { ReintentButton } from "./components/ReintentButton";
import { toast } from "react-toastify";
import { SearchBox } from "@/shared/component/SearchBox";
import { FaRotateRight } from "react-icons/fa6";

export const WebhookInvoicesLogsView = () => {
  const { handleChangeViewName, currentViewName } =
    useOutletContext<LayoutOutletContext>();
  const [searchArgument, setSearchArgument] = useState<string>("");

  // Estado para el filtro
  const [filterStatus, setFilterStatus] = useState<"ALL" | "SUCCESS" | "ERROR">(
    "ALL"
  );

  useLayoutEffect(() => {
    if (currentViewName !== "Webhook Invoices Logs") {
      handleChangeViewName("Webhook Invoices Logs");
    }
  }, [currentViewName, handleChangeViewName]);
  const { data: gridData, refetch: refetchGridData } = useQuery({
    queryKey: ["webhook-invoices-logs-data"],
    queryFn: async () => await webhookService.GetInvoicesLogs(),
    initialData: [],
    enabled: false, // Evita que se ejecute automáticamente al montar
  });

  // Filtrar los datos según el filtro seleccionado
  const filteredGridData = useMemo(() => {
    if (filterStatus === "ALL") return gridData;
    if (filterStatus === "SUCCESS")
      return gridData.filter(
        (log: webhookLogs) => log.operationStatus === "SUCCESS"
      );
    if (filterStatus === "ERROR")
      return gridData.filter(
        (log: webhookLogs) => log.operationStatus !== "SUCCESS"
      );
    return gridData;
  }, [gridData, filterStatus]);

  const handleReintent = useCallback(
    async (data: webhookLogs) => {
      const res = await webhookService.ReintentInvoicesLog(data.id);
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
            onClick: handleReintent,
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

  const handleSearchArgument = (text: string) => setSearchArgument(text);

  return (
    <>
      {/* Dashboard */}
      <div className="h-25 flex px-24 gap-10 mb-4 justify-center">
        <Card className="flex-1 text-center max-w-sm">
          <div className="text-lg font-semibold">Total Sync</div>
          <div className="text-xl">
            {gridData.filter(
              (log: webhookLogs) => log.operationStatus === "SUCCESS"
            ).length || 0}
          </div>
        </Card>
        <Card className="flex-1 text-center max-w-sm">
          <div className="text-lg font-semibold">Total Not Sync</div>
          <div className="text-xl">
            {gridData.filter(
              (log: webhookLogs) => log.operationStatus !== "SUCCESS"
            ).length || 0}
          </div>
        </Card>
      </div>
      <Card>
        {/* Filtros por botones */}
        <div className="flex justify-between">
          <div className="flex gap-4 justify-left">
            <Button
              color={filterStatus === "ALL" ? "blue" : "light"}
              onClick={() => setFilterStatus("ALL")}
            >
              All
            </Button>
            <Button
              color={filterStatus === "SUCCESS" ? "green" : "light"}
              onClick={() => setFilterStatus("SUCCESS")}
            >
              Success
            </Button>
            <Button
              color={filterStatus === "ERROR" ? "red" : "light"}
              onClick={() => setFilterStatus("ERROR")}
            >
              Error
            </Button>
          </div>
          <div className="flex justify-between gap-4">
            <Button color={"gray"} onClick={() => refetchGridData()}>
              <FaRotateRight className="mr-2" />
              Refresh
            </Button>
            <SearchBox handleSearchArgument={handleSearchArgument} />
          </div>
        </div>

        <div className="w-full h-[40rem]">
          <AgGridReact
            localeText={AG_GRID_LOCALE_ES_MX}
            theme={agGridTheme}
            rowData={filteredGridData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={50}
            paginationPageSizeSelector={[50, 100, 200]}
            className="text-sm"
            onGridReady={handleGridReady}
            gridOptions={gridOptions}
            quickFilterText={searchArgument}
            tooltipShowDelay={0}
          />
        </div>
      </Card>
    </>
  );
};
