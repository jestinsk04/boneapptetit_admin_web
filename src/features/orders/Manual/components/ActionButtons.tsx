import { ManualOrder } from "@/shared/types/dto/orders.dto";
import { Button } from "flowbite-react";
import { FaMoneyBill } from "react-icons/fa6";

interface ActionButtonsProps {
  data: ManualOrder;
  onPaidButtonClick: (data: ManualOrder) => void;
}

export const ActionButtons = ({
  data,
  onPaidButtonClick,
}: ActionButtonsProps) => {
  return (
    <div className="flex w-full h-full justify-center items-center gap-1">
      {data.requiresChange && data.validateStatus === "PENDING" && (
        <Button
          size="xs"
          color={"green"}
          onClick={() => onPaidButtonClick(data)}
        >
          <FaMoneyBill />
        </Button>
      )}
    </div>
  );
};
