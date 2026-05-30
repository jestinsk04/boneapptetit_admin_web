import { SearchBox } from "@/shared/component/SearchBox";
import { AG_GRID_LOCALE_ES_MX } from "@/shared/libs/ag-grid-es";
import { agGridTheme } from "@/shared/ui/ag-grid-theme";
import { AgGridReact } from "ag-grid-react";
import { Button, Card } from "flowbite-react";
import { FaRotateRight, FaUpload } from "react-icons/fa6";
import { useBankHoliday } from "./hooks/useBankHoliday";
import { colDefs } from "./utils/tableDefinitions";
import { useCallback, useLayoutEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { LayoutOutletContext } from "@/shared/types/components/Layout";
import { GridReadyEvent } from "ag-grid-community";
import { UploadHolidays } from "./components/UploadHolidays";

export const BankHolidaysView = () => {
  const { handleChangeViewName, currentViewName } =
    useOutletContext<LayoutOutletContext>();
  const { holidays, refetchHolidays, uploadBankHoliday } = useBankHoliday();
  const [searchArgument, setSearchArgument] = useState<string>("");
  const [openUploadModal, setOpenUploadModal] = useState(false);

  useLayoutEffect(() => {
    if (currentViewName !== "Bank Holidays") {
      handleChangeViewName("Bank Holidays");
    }
  }, [currentViewName, handleChangeViewName]);

  const handleSearchArgument = (text: string) => setSearchArgument(text);

  const handleGridReady = useCallback(
    async (params: GridReadyEvent) => {
      await refetchHolidays();
      params.api.sizeColumnsToFit();
    },
    [refetchHolidays]
  );

  return (
    <>
      <UploadHolidays
        openModal={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
        currentDates={(holidays ?? []).map((h) => h.date)}
        uploadMutation={uploadBankHoliday}
      />
      <Card>
        <div className="flex justify-between">
          <div className="flex gap-4 justify-left"></div>
          <div className="flex justify-between gap-4">
            <SearchBox handleSearchArgument={handleSearchArgument} />
            <div className="flex gap-2">
              <Button color="gray" onClick={() => setOpenUploadModal(true)}>
                <FaUpload className="mr-2" />
                Cargar CSV
              </Button>
              <Button color="gray" onClick={() => refetchHolidays()}>
                <FaRotateRight className="mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full h-[40rem]">
          <AgGridReact
            localeText={AG_GRID_LOCALE_ES_MX}
            theme={agGridTheme}
            rowData={holidays}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={50}
            paginationPageSizeSelector={[50, 100, 200]}
            className="text-sm"
            onGridReady={handleGridReady}
            quickFilterText={searchArgument}
            tooltipShowDelay={0}
          />
        </div>
      </Card>
    </>
  );
};
