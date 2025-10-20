import { ManualOrder } from "@/shared/types/dto/orders.dto";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

interface BillImageLinkProps {
  data: ManualOrder;
}

export const BillImageLink = ({ data }: BillImageLinkProps) => {
  return (
    <div className="flex items-center justify-center">
      <a
        href={`${data.billImageUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center gap-1 text-blue-500"
      >
        Open
        <FaArrowUpRightFromSquare  />
      </a>
    </div>
  );
};
