import { delay } from "@/utils/delay";
import { VendorFilterParams } from "@/features/vendors/@types/vendor";
import { getVendors } from "@/features/vendors/services/getVendors";
import { formatSaudiPhoneDisplay } from "@/utils/phone";

export async function exportVendorsCsv(filters?: VendorFilterParams): Promise<Blob> {
  // Simulate backend report generation and query delay
  await delay(600);

  // Fetch all filtered vendors (unpaginated export)
  const result = await getVendors({
    ...filters,
    page: 1,
    pageSize: 10000,
  });

  const headers = [
    "الاسم بالعربية",
    "الاسم بالإنجليزية",
    "رقم السجل التجاري",
    "رقم الجوال",
    "التصنيف",
    "الحالة",
    "تاريخ الإضافة",
    "نبذة",
  ];

  const escapeCell = (val: string | number | null | undefined): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = result.items.map((v) => [
    escapeCell(v.name_ar),
    escapeCell(v.name_en),
    escapeCell(v.cr_number),
    escapeCell(formatSaudiPhoneDisplay(v.mobile)),
    escapeCell(v.categoryName_ar || v.categoryId),
    escapeCell(v.status === "active" ? "نشط" : "غير نشط"),
    escapeCell(new Date(v.createdAt).toLocaleDateString("ar-SA")),
    escapeCell(v.about),
  ]);

  // Prepend UTF-8 BOM (\uFEFF) for Excel Arabic compatibility
  const csvContent =
    "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

  return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
}
