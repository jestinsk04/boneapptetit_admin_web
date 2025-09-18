import { webhookLogs } from "@/shared/types/dto/webhook.dto";
import { Button } from "flowbite-react";
import { useCallback, useState } from "react";
import { FaRotate } from "react-icons/fa6";

interface ReintentButtonProps {
  data: webhookLogs;
  onClick: (data: webhookLogs) => Promise<void>;
}

export const ReintentButton = ({ data, onClick }: ReintentButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleReintent = useCallback(async () => {
    setLoading(true);
    await onClick(data);
    setLoading(false);
  }, [data, onClick]);

  return (
    <>
      {data.operationStatus === "ERROR" && (
        <div className="flex justify-center items-center h-full">
          <Button
            size="xs"
            disabled={loading}
            color="yellow"
            onClick={handleReintent}
          >
            <FaRotate />
          </Button>
        </div>
      )}
    </>
  );
};
