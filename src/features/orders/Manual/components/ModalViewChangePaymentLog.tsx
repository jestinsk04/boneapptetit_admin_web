import { ChangePaymentLog } from "@/shared/types/dto/orders.dto";
import {
  currencyFormat,
  formatToLocalDateString,
} from "@/shared/utils/helpers";
import { Modal, ModalBody, ModalHeader, ThemeProvider } from "flowbite-react";

interface ModalViewChangePaymentLogProps {
  openModal: boolean;
  paymentLog: ChangePaymentLog | undefined;
  onClose: () => void;
}

export const ModalViewChangePaymentLog = ({
  openModal,
  paymentLog,
  onClose,
}: ModalViewChangePaymentLogProps) => {
  return (
    <ThemeProvider>
      <Modal show={openModal} onClose={onClose} size="sm">
        <ModalHeader>Resultado de Vuelto</ModalHeader>
        <ModalBody>
          <div className="text-gray-500 text-sm">
            <h1>Detalles de la transacción:</h1>
            <p>{`Fecha: ${
              (paymentLog?.createdAt &&
                formatToLocalDateString(paymentLog?.createdAt)) ||
              "N/A"
            }`}</p>
            <p>{`Referencia: ${paymentLog?.reference || "N/A"}`}</p>
            <p>{`Monto: ${currencyFormat.format(paymentLog?.amount || 0)}`}</p>
          </div>
        </ModalBody>
      </Modal>
    </ThemeProvider>
  );
};
