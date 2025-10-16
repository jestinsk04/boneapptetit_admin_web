import { AG_GRID_LOCALE_ES_MX } from "@/shared/libs/ag-grid-es";
import { agGridTheme } from "@/shared/ui/ag-grid-theme";
import { AgGridReact } from "ag-grid-react";
import { colDefs } from "./utils/tableDefinitions";
import { Button, Card } from "flowbite-react";
import { SearchBox } from "@/shared/component/SearchBox";
import { FaRotateRight } from "react-icons/fa6";
import { LayoutOutletContext } from "@/shared/types/components/Layout";
import { useOutletContext } from "react-router";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/shared/services/orders.service";
import { GridOptions, GridReadyEvent } from "ag-grid-community";
import { ManualOrder } from "@/shared/types/dto/orders.dto";
import { toast, ToastContainer } from "react-toastify";
import { ActionButtons } from "./components/ActionButtons";
import { ModalSendChangePaid } from "./components/ModalSendChangePaid";
import { ModalUpdateOrder } from "./components/ModalUpdateOrder";

export const OrdersManualView = () => {
  const { handleChangeViewName, currentViewName } =
    useOutletContext<LayoutOutletContext>();
  const [searchArgument, setSearchArgument] = useState<string>("");
  const [currentData, setCurrentData] = useState<ManualOrder | undefined>(
    undefined
  );
  const [openSendChangePaidModal, setOpenSendChangePaidModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { data: gridData, refetch: refetchGridData } = useQuery({
    queryKey: ["manual-orders-data"],
    queryFn: async () => await ordersService.GetManualOrders(),
    initialData: [],
    enabled: false, // Evita que se ejecute automáticamente al montar
  });

  const handleChangePaidButtonClick = useCallback((data: ManualOrder) => {
    setCurrentData(data);
    setOpenSendChangePaidModal(true);
  }, []);

  const handleEditButtonClick = useCallback((data: ManualOrder) => {
    setCurrentData(data);
    setOpenEditModal(true);
  }, []);

  const gridOptions: GridOptions = useMemo(() => {
    return {
      columnTypes: {
        // statusColumn: {
        //   cellRenderer: ManualOrdersStatusDropdown,
        //   cellRendererParams: {
        //     onChange: refetchGridData,
        //   },
        // },
        menuColumn: {
          cellRenderer: ActionButtons,
          cellRendererParams: {
            onPaidButtonClick: handleChangePaidButtonClick,
            onEditButtonClick: handleEditButtonClick,
          },
        },
      },
    };
  }, [handleChangePaidButtonClick, handleEditButtonClick]);

  const handleSearchArgument = (text: string) => setSearchArgument(text);

  const handleGridReady = useCallback(
    async (params: GridReadyEvent) => {
      await refetchGridData();
      params.api.sizeColumnsToFit();
    },
    [refetchGridData]
  );

  useLayoutEffect(() => {
    if (currentViewName !== "Manual") {
      handleChangeViewName("Manual");
    }
  }, [currentViewName, handleChangeViewName]);

  const handleSendChangePaidResult = (success: boolean) => {
    if (success) {
      refetchGridData();
      toast.success("Send vuelto request sent successfully");
    } else {
      toast.error("Error sending vuelto request");
    }

    setCurrentData(undefined);
    setOpenSendChangePaidModal(false);
  };

  const handleUpdateOrderResult = (success: boolean) => {
    if (success) {
      refetchGridData();
      toast.success("Order updated successfully");
    } else {
      toast.error("Error updating order");
    }

    setCurrentData(undefined);
    setOpenEditModal(false);
  };

  return (
    <>
      <ToastContainer />
      <ModalSendChangePaid
        openModal={openSendChangePaidModal}
        order={currentData}
        onResult={handleSendChangePaidResult}
        onClose={() => setOpenSendChangePaidModal(false)}
      />
      <ModalUpdateOrder
        openModal={openEditModal}
        onClose={() => setOpenEditModal(false)}
        currentData={currentData}
        onResult={handleUpdateOrderResult}
      />
      <Card>
        {/* Filtros por botones */}
        <div className="flex justify-between">
          <div className="flex gap-4 justify-left">
            {/* <Button
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
            </Button> */}
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
            // rowData={filteredGridData}
            rowData={gridData}
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
