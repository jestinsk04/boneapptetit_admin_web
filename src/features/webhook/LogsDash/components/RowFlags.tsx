import { webhookLogs } from "@/shared/types/dto/webhook.dto";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface RowFlagsParams {
  data: webhookLogs;
}

export const RowFlags = ({ data }: RowFlagsParams) => (
  <span className="flex justify-center items-center h-full">
    {data.operationStatus === "SUCCESS" ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaTimesCircle className="text-red-500" />
    )}
  </span>
);
