export type UploadBankHolidayRequest = {
  dates: string[]; // Array of yyyy-mm-dd formatted date strings
};

export interface BankHoliday {
  date: string; // yyyy-mm-dd formatted date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
