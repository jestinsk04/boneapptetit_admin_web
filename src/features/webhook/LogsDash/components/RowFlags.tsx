import { webhookLogs } from "@/shared/types/dto/webhook.dto";

interface RowFlagsParams {
  data: webhookLogs;
}

export const RowFlags = ({ data }: RowFlagsParams) => (
  <span className="flex justify-center items-center h-full">
    {
      <img
        src={`https://www.ag-grid.com/example-assets/icons/${
          data.operationStatus ? "tick-in-circle" : "cross-in-circle"
        }.png`}
        className="missionIcon"
      />
    }
  </span>
);
