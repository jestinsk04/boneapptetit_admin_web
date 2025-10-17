import { ManualOrder } from "@/shared/types/dto/orders.dto";
import { Button } from "flowbite-react";
import { FaPenToSquare } from "react-icons/fa6";

interface ActionButtonsProps {
  data: ManualOrder;
  onEditButtonClick?: (data: ManualOrder) => void;
}

export const ActionButtons = ({
  data,
  onEditButtonClick,
}: ActionButtonsProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button size="xs" onClick={() => onEditButtonClick?.(data)}>
        <FaPenToSquare className="w-4 h-4" />
      </Button>
    </div>
  );
};
