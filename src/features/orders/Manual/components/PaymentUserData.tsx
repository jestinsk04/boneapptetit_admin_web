import { CashReturnData } from "@/shared/types/dto/orders.dto";

interface PaymentUserDataProps {
  returnData?: CashReturnData;
}

export const PaymentUserData = ({ returnData }: PaymentUserDataProps) => {
  return (
    <div className="text-gray-500 text-sm">
      <h1>Datos del Usuario:</h1>
      <p>{`Banco: ${returnData?.bank || "No definido"}`}</p>
      <p>{`Telefono: ${returnData?.phone || "No definido"}`}</p>
      <p>{`Cédula / RIF: ${returnData?.dniType || "No definido"}-${
        returnData?.dni || "No definido"
      }`}</p>
    </div>
  );
};
