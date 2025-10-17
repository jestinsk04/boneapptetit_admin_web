import { ManualOrder, UpdateOrderRequest } from "@/shared/types/dto/orders.dto";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  Spinner,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateOrderSchema } from "../schemas/updateOrder.schema";
import { useCallback, useEffect, useState } from "react";
import { InputErrorMessage } from "@/shared/component/InputErrorMessage";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { ordersService } from "@/shared/services/orders.service";
import { PaymentMethodDropdown } from "./PaymentMethodDropdown";

interface ModalUpdateOrderProps {
  openModal: boolean;
  onClose: () => void;
  currentData?: ManualOrder;
  onResult: (success: boolean) => void;
}

export const ModalUpdateOrder = ({
  openModal,
  onClose,
  onResult,
  currentData,
}: ModalUpdateOrderProps) => {
  const [landing, setLanding] = useState(false);
  const onSubmit: SubmitHandler<UpdateOrderRequest> = useCallback(
    async (data) => {
      setLanding(true);
      if (!currentData) return;
      const response = await ordersService.UpdateManualOrder(
        data,
        currentData.id
      );
      setLanding(false);
      onResult(response);
    },
    [onResult, currentData]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateOrderRequest>({
    resolver: yupResolver(updateOrderSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (currentData && openModal) {
      reset({
        orderName: currentData.orderName,
        amount: currentData.amount,
        logisticValidate: currentData.logisticValidate,
        paymentMethodId: currentData.paymentMethodId,
        requiresChange: currentData.requiresChange,
        validateStatus: currentData.validateStatus,
      });
    }
  }, [currentData, openModal, reset]);

  return (
    <ThemeProvider>
      <Modal show={openModal} size="lg" onClose={onClose}>
        <ModalHeader>Actualizar orden {currentData?.orderName}</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="flex flex-col gap-4 mb-4 md:grid md:grid-cols-2">
              <div>
                <div className="block">
                  <Label htmlFor="serial">
                    Monto cancelado por el usuario:
                  </Label>
                </div>
                <TextInput
                  required
                  inputMode="numeric"
                  type="number"
                  step={0.01}
                  min={1}
                  color={errors.amount && "failure"}
                  {...register("amount")}
                />
                <InputErrorMessage message={errors.amount?.message} />
              </div>

              <div className="flex flex-col justify-end">
                <div className="block">
                  <Label htmlFor="serial">Estado de validación:</Label>
                </div>
                <Select
                  disabled={
                    !currentData || currentData.validateStatus === "COMPLETED"
                  }
                  {...register("validateStatus")}
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELED">Canceled</option>
                </Select>
                <InputErrorMessage message={errors.amount?.message} />
              </div>

              <div className="col-span-2">
                <div className="block">
                  <Label htmlFor="serial">Método de pago:</Label>
                </div>
                <PaymentMethodDropdown
                  currentValue={watch("paymentMethodId")}
                  onChange={(value) => setValue("paymentMethodId", value)}
                />
                <InputErrorMessage message={errors.orderName?.message} />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="accept"
                  checked={watch("logisticValidate")}
                  onChange={(e) =>
                    setValue("logisticValidate", e.target.checked)
                  }
                />
                <Label htmlFor="accept" className="flex">
                  Validado por logística
                </Label>
              </div>
              {currentData?.returnData && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="accept"
                    checked={watch("requiresChange")}
                    onChange={(e) =>
                      setValue("requiresChange", e.target.checked)
                    }
                  />
                  <Label htmlFor="accept" className="flex">
                    Requiere Vuelto
                  </Label>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 border-t pt-2 border-gray-200">
              <Button color="red" onClick={onClose}>
                <FaXmark className="h-5 w-5" />
              </Button>
              <Button
                type="submit"
                className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
                disabled={landing}
                color="green"
              >
                {landing ? <Spinner /> : <FaCheck className="h-5 w-5" />}
              </Button>
            </div>
          </ModalBody>
        </form>
      </Modal>
    </ThemeProvider>
  );
};
