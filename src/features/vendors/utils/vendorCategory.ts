import { CategoryBreadcrumbItem } from "@/features/vendors/@types/vendor";

export function formatCategoryPath(breadcrumb: CategoryBreadcrumbItem[]): string {
  if (!breadcrumb || breadcrumb.length === 0) return "";
  return breadcrumb.map((item) => item.name_ar).join(" ← ");
}
