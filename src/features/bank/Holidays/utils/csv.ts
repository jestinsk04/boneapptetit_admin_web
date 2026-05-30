import Papa from "papaparse";

export type ParsedRow = {
  lineNumber: number;
  raw: string;
  date: string | null;
  error: string | null;
};

export type ParseResult = {
  headerOk: boolean;
  rows: ParsedRow[];
};

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TEMPLATE_CONTENT = "date\n2026-01-01\n";

export const parseHolidaysCsv = (text: string): ParseResult => {
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
    transform: (v) => v.trim(),
  });

  const fields = parsed.meta.fields ?? [];
  if (fields.length !== 1 || fields[0] !== "date") {
    return { headerOk: false, rows: [] };
  }

  const rows: ParsedRow[] = parsed.data.map((row, idx) => {
    const raw = row.date ?? "";
    if (!DATE_REGEX.test(raw)) {
      return {
        lineNumber: idx + 2,
        raw,
        date: null,
        error: "Formato inválido (esperado yyyy-mm-dd)",
      };
    }
    return { lineNumber: idx + 2, raw, date: raw, error: null };
  });

  const firstSeen = new Map<string, number>();
  for (const row of rows) {
    if (row.error !== null || row.date === null) continue;
    const seenAt = firstSeen.get(row.date);
    if (seenAt === undefined) {
      firstSeen.set(row.date, row.lineNumber);
    } else {
      row.error = `Fecha duplicada (línea ${seenAt})`;
    }
  }

  return { headerOk: true, rows };
};

export const buildHolidaysTemplate = (): string => TEMPLATE_CONTENT;

export const downloadCsv = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
