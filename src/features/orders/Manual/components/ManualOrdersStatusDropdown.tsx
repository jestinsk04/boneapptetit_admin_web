import { ordersService } from "@/shared/services/orders.service";
import { ManualOrder } from "@/shared/types/dto/orders.dto";
import { Select } from "flowbite-react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface ManualOrdersStatusDropdownProps {
  data: ManualOrder;
  onChange: () => void;
}

export const ManualOrdersStatusDropdown = ({
  data,
  onChange,
}: ManualOrdersStatusDropdownProps) => {
  const [status, setStatus] = useState(data.validateStatus);

  const UpdateModalStatus = useCallback(
    async (newStatus: string) => {
      const resp = await ordersService.UpdateManualOrderStatus({
        newStatus,
        orderId: data.id,
      });
      if (resp) {
        toast.success("Status updated successfully");
        onChange();
      } else {
        toast.error("Error updating status");
        setStatus(data.validateStatus);
      }
    },
    [data, onChange]
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let confirmMessage = `Esta seguro que desea marcar la orden como ${event.target.value}?`;
    if (event.target.value === "COMPLETED") {
      confirmMessage = `${confirmMessage} Al confirmar se marcara la orden como completada en shopify.`;
    }
    if (event.target.value === "CANCELED") {
      confirmMessage = `${confirmMessage} Al cancelar no podra generar ninguna otra gestion sobre la orden.`;
    }
    // confirm change
    if (confirm(confirmMessage)) {
      UpdateModalStatus(event.target.value);
    } else {
      setStatus(data.validateStatus);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center ">
      {status === "PENDING" ? (
        <Select
          className="w-full"
          sizing="sm"
          disabled={status !== "PENDING"}
          onChange={handleOnChange}
          value={status}
        >
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELED">Canceled</option>
        </Select>
      ) : (
        <p
          style={{
            color: status === "COMPLETED" ? "green" : "red",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
};
