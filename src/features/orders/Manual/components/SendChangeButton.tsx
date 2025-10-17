import { ManualOrder } from "@/shared/types/dto/orders.dto";
import { Button } from "flowbite-react";
import { FaMoneyBill } from "react-icons/fa6";

interface SendChangeButtonProps {
  data: ManualOrder;
  onPaidButtonClick: (data: ManualOrder) => void;
  onViewChangePaymentLogClick: (data: ManualOrder) => void;
}

export const SendChangeButton = ({
  data,
  onPaidButtonClick,
  onViewChangePaymentLogClick,
}: SendChangeButtonProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {!data.requiresChange && !data.changePaymentLog && (
        <Button size="xs" color={"gray"} disabled>
          <FaMoneyBill className="w-5 h-5" />
        </Button>
      )}
      {data.requiresChange && !data.changePaymentLog && (
        <Button
          size="xs"
          color={"yellow"}
          onClick={() => onPaidButtonClick(data)}
        >
          <FaMoneyBill className="w-5 h-5" />
        </Button>
      )}
      {data.changePaymentLog && (
        <Button
          size="xs"
          color={"green"}
          onClick={() => onViewChangePaymentLogClick(data)}
        >
          <FaMoneyBill className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};
