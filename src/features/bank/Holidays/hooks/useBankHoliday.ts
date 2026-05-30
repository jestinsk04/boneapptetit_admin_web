import { BankService } from "@/shared/services/bank.service";
import { UploadBankHolidayRequest } from "@/shared/types/dto/bank.dto";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useBankHoliday = () => {
  const { data: gridData, refetch: refetchGridData } = useQuery({
    queryKey: ["bank-holidays-data"],
    queryFn: async () => await BankService.getBankHolidays(),
    initialData: [],
    enabled: false, // Evita que se ejecute automáticamente al montar
  });

  const uploadBankHoliday = useMutation({
    mutationFn: async (data: UploadBankHolidayRequest) =>
      await BankService.uploadBankHoliday(data),
    onSuccess: () => {
      refetchGridData();
    },
  });

  return {
    holidays: gridData,
    refetchHolidays: refetchGridData,
    uploadBankHoliday,
  };
};
