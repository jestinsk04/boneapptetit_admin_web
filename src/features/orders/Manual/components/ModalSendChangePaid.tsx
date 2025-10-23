import { ChangePaidRequest, ManualOrder } from "@/shared/types/dto/orders.dto";
import {
  Alert,
  Button,
  createTheme,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TabItem,
  Tabs,
  ThemeProvider,
} from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendChangePaidSchema } from "../schemas/sendChangePaid.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { ordersService } from "@/shared/services/orders.service";
import { useBCVTasaStore } from "@/app/store/bcv";
import { currencyFormat } from "@/shared/utils/helpers";
import { FaArrowsRotate, FaCheck, FaXmark } from "react-icons/fa6";
import { PaymentUserData } from "./PaymentUserData";
import { useAuthStore } from "@/app/store/auth";
import { HiInformationCircle } from "react-icons/hi";

interface ModalSendChangePaidProps {
  openModal: boolean;
  order: ManualOrder | undefined;
  onResult: (result: boolean) => void;
  onClose: () => void;
}

const theme = createTheme({
  tabs: {
    tablist: {
      variant: {
        fullWidth: "shadow-none",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-0 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 py-2",
        variant: {
          fullWidth: {
            base: "ml-0 flex w-full rounded-md first:ml-0",
            active: {
              on: "rounded-xl bg-bone-yellow p-0 text-bone-primary py-2",
              off: "rounded-xl bg-white hover:bg-gray-50 hover:text-gray-700 border-1 border-[#3C2525]",
            },
          },
        },
      },
    },
  },
});

export const ModalSendChangePaid = ({
  openModal,
  order,
  onResult,
  onClose,
}: ModalSendChangePaidProps) => {
  const { tasa } = useBCVTasaStore();
  const [amount, setAmount] = useState<number>(0);
  const { isAdmin } = useAuthStore();
  const [landing, setLanding] = useState(false);

  const onSubmit: SubmitHandler<ChangePaidRequest> = useCallback(
    async (data: ChangePaidRequest) => {
      setLanding(true);
      const resp = await ordersService.SendChangePaid(data);
      setLanding(false);
      onResult(resp);
    },
    [onResult]
  );

  const { handleSubmit, reset, watch } = useForm<ChangePaidRequest>({
    resolver: yupResolver(sendChangePaidSchema),
  });

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
    <ThemeProvider theme={theme}>
      <Modal show={openModal} onClose={onClose} size="sm">
        <ModalHeader>Enviar Vuelto {order?.orderName}</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Tabs variant="fullWidth">
              <TabItem active={true} title="Vuelto">
                <div className="text-sm">
                  <p>
                    {`Monto Total de la Orden: $${
                      order?.orderTotalAmount || 0
                    }`}
                  </p>

                  <p className="flex gap-2 items-center">
                    {`Validado por logística:`}{" "}
                    {order?.logisticValidate ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaXmark color="red" />
                    )}
                  </p>
                  <p>Monto cancelado por el usuario: ${amount}</p>
                  <p>{`Tasa del dia: ${currencyFormat.format(tasa.amount)}`}</p>
                </div>

                <div className="flex flex-col gap-2 my-2 bg-bone-light-beige rounded-md">
                  <div className="flex justify-between items-center text-sm">
                    <p className="">
                      Vuelto:{" "}
                      {`$${(amount - (order?.orderTotalAmount || 0)).toFixed(
                        2
                      )}`}
                    </p>
                    <FaArrowsRotate color="green" />
                    <Label htmlFor="serial">
                      Vuelto: {currencyFormat.format(watch("amount"))}
                    </Label>
                  </div>
                </div>
                {isAdmin && (
                  <>
                    <Alert
                      className="bg-bone-beige text-bone-primary text-xxs py-2 px-4"
                      icon={HiInformationCircle}
                    >
                      Al confirmar se enviara el dinero al cliente via Pago
                      Movil R4. y no podra enviar otro para esta ordern
                    </Alert>
                    <div className="flex justify-center mt-2">
                      <Button
                        type="submit"
                        disabled={landing}
                        className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
                      >
                        {landing ? <Spinner /> : "Confirmar"}
                      </Button>
                    </div>
                  </>
                )}
              </TabItem>
              <TabItem title="Datos">
                <PaymentUserData returnData={order?.returnData} />
              </TabItem>
            </Tabs>
          </ModalBody>
        </form>
      </Modal>
    </ThemeProvider>
  );
};
