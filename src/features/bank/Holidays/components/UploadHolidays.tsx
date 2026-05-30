import {
  Button,
  FileInput,
  HelperText,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "flowbite-react";
import { ChangeEvent, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { toast } from "react-toastify";
import { UseMutationResult } from "@tanstack/react-query";
import {
  buildHolidaysTemplate,
  downloadCsv,
  parseHolidaysCsv,
  ParseResult,
} from "../utils/csv";
import { UploadBankHolidayRequest } from "@/shared/types/dto/bank.dto";

interface UploadHolidaysProps {
  openModal: boolean;
  onClose: () => void;
  currentDates: string[];
  uploadMutation: UseMutationResult<
    boolean,
    Error,
    UploadBankHolidayRequest,
    unknown
  >;
}

export const UploadHolidays = ({
  openModal,
  onClose,
  currentDates,
  uploadMutation,
}: UploadHolidaysProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);

  const resetState = () => {
    setFileName(null);
    setParseResult(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const text = await file.text();
    setFileName(file.name);
    setParseResult(parseHolidaysCsv(text));
  };

  const handleDownloadTemplate = () => {
    downloadCsv("bank-holidays-template.csv", buildHolidaysTemplate());
  };

  const validRows = parseResult?.rows.filter((r) => r.error === null) ?? [];
  const invalidRows = parseResult?.rows.filter((r) => r.error !== null) ?? [];
  const validCount = validRows.length;
  const invalidCount = invalidRows.length;
  const totalCount = parseResult?.rows.length ?? 0;
  const headerOk = parseResult?.headerOk ?? true;

  const submitDisabled =
    uploadMutation.isPending ||
    !headerOk ||
    validCount === 0 ||
    invalidCount > 0;

  const handleSubmit = async () => {
    const merged = Array.from(
      new Set([...currentDates, ...validRows.map((r) => r.date as string)]),
    ).sort();
    const ok = await uploadMutation.mutateAsync({ dates: merged });
    if (ok) {
      toast.success("Holidays subidos correctamente");
      resetState();
      onClose();
    } else {
      toast.error("Error subiendo holidays");
    }
  };

  return (
    <Modal show={openModal} size="lg" onClose={handleClose}>
      <ModalHeader>Cargar feriados</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-4">
          <div className="w-full text-center items-center">
            <HelperText className="text-bone-primary">
              CSV con una columna <code>date</code> en formato{" "}
              <code>yyyy-mm-dd</code>.
            </HelperText>
          </div>

          <FileInput
            className="file:bg-bone-primary"
            id="bank-holidays-file"
            accept=".csv,text/csv"
            onChange={onFileChange}
          />

          {parseResult !== null && (
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium truncate">{fileName}</span>
                {headerOk && (
                  <span>
                    {totalCount} filas |{" "}
                    <span className="text-green-700">{validCount} válidas</span>{" "}
                    |{" "}
                    <span className={invalidCount > 0 ? "text-red-600" : ""}>
                      {invalidCount} inválidas
                    </span>
                  </span>
                )}
              </div>

              {!headerOk && (
                <p className="text-sm text-red-600">
                  El archivo no tiene el encabezado <code>date</code> en la
                  primera línea.
                </p>
              )}

              {headerOk && invalidCount > 0 && (
                <ul className="text-sm text-red-600 max-h-40 overflow-auto list-disc pl-5">
                  {invalidRows.map((r) => (
                    <li key={r.lineNumber}>
                      Línea {r.lineNumber}: {r.error}
                      {r.raw ? ` ("${r.raw}")` : ""}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="flex justify-between gap-2">
            <Button
              size="sm"
              color="gray"
              onClick={handleDownloadTemplate}
              type="button"
            >
              <FaDownload className="mr-2" />
              Plantilla
            </Button>
            <div className="flex gap-2">
              <Button color="gray" onClick={handleClose} type="button">
                Cancelar
              </Button>
              <Button
                type="button"
                disabled={submitDisabled}
                onClick={handleSubmit}
                className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
              >
                {uploadMutation.isPending ? (
                  <Spinner size="sm" />
                ) : (
                  `Cargar ${validCount} ${validCount === 1 ? "fecha" : "fechas"}`
                )}
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
