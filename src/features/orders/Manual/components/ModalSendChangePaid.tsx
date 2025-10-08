import { InputErrorMessage } from "@/shared/component/InputErrorMessage";
import { ChangePaidRequest, ManualOrder } from "@/shared/types/dto/orders.dto";
import {
  Button,
  HelperText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendChangePaidSchema } from "../schemas/sendChangePaid.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { ordersService } from "@/shared/services/orders.service";
import { useBCVTasaStore } from "@/app/store/bcv";
import { currencyFormat } from "@/shared/utils/helpers";
import { FaArrowsRotate } from "react-icons/fa6";

interface ModalSendChangePaidProps {
  openModal: boolean;
  order: ManualOrder | undefined;
  onResult: (result: boolean) => void;
  onClose: () => void;
}

export const ModalSendChangePaid = ({
  openModal,
  order,
  onResult,
  onClose,
}: ModalSendChangePaidProps) => {
  const { tasa } = useBCVTasaStore();
  const [amount, setAmount] = useState<number>(0);

  const onSubmit: SubmitHandler<ChangePaidRequest> = useCallback(
    async (data: ChangePaidRequest) => {
      const resp = await ordersService.SendChangePaid(data);
      onResult(resp);
    },
    [onResult]
  );

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ChangePaidRequest>({
    resolver: yupResolver(sendChangePaidSchema),
  });

  const handleChangeAmount = useCallback(
    (value: string) => {
      const numericValueUSD = parseFloat(value).toFixed(2) as unknown as number;
      const numericVES = parseFloat(
        ((numericValueUSD - order!.orderTotalAmount) * tasa.amount).toFixed(2)
      );
      setValue("amount", numericVES);
      setAmount(numericValueUSD);
    },
    [setValue, tasa, order]
  );

  useEffect(() => {
    if (openModal && order) {
      const amount = order.amount - order.orderTotalAmount;
      const numericVES = parseFloat((amount * tasa.amount).toFixed(2));
      reset({
        orderId: order.id,
        orderName: order.orderName.replace("#", ""),
        amount: numericVES,
      });
      setAmount(parseFloat(order.amount.toFixed(2)));
    }
  }, [openModal, order, reset, tasa]);

  return (
    <ThemeProvider>
      <Modal show={openModal} onClose={onClose} size="sm">
        <ModalHeader>Enviar Vuelto {order?.orderName}</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="text-gray-400 text-sm">
              <p>
                {`Monto Total de la Orden: $${order?.orderTotalAmount || 0}`}
              </p>
              <p>{`Tasa del dia: ${currencyFormat.format(tasa.amount)}`}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <div className="block">
                  <Label htmlFor="serial">
                    Monto cancelado por el usuario (USD):
                  </Label>
                </div>
                <TextInput
                  required
                  inputMode="numeric"
                  type="number"
                  step={0.01}
                  min={1}
                  value={amount}
                  onChange={(e) => handleChangeAmount(e.target.value)}
                  color={errors.amount && "failure"}
                />
                <InputErrorMessage message={errors.amount?.message} />
              </div>
              <div className="mt-1">
                <div className="flex justify-between items-center text-sm">
                  <p className="">
                    Vuelto:{" "}
                    {`$${(amount - (order?.orderTotalAmount || 0)).toFixed(2)}`}
                  </p>
                  <FaArrowsRotate color="green" />
                  <Label htmlFor="serial">
                    Vuelto: {currencyFormat.format(watch("amount"))}
                  </Label>
                </div>
                <HelperText>
                  Al confirmar se enviara el dinero al cliente via Pago Movil
                  R4. y no podra enviar otro para esta ordern
                </HelperText>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <Button type="submit">Confirmar</Button>
            </div>
          </ModalBody>
        </form>
      </Modal>
    </ThemeProvider>
  );
};
