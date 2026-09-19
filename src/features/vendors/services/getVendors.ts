import { Category } from "@/@types/category";
import { delay } from "@/utils/delay";
import {
  CategoryBreadcrumbItem,
  PaginatedVendorsResult,
  VendorFilterParams,
  VendorWithRelations,
} from "@/features/vendors/@types/vendor";
import { useMockStore } from "@/mock/store";

export function getCategoryBreadcrumb(
  categories: Category[],
  categoryId: string
): CategoryBreadcrumbItem[] {
  const categoryMap = new Map<string, Category>();
  for (const cat of categories) {
    categoryMap.set(cat.id, cat);
  }

  const breadcrumbs: CategoryBreadcrumbItem[] = [];
  let currentId: string | null = categoryId;
  const visited = new Set<string>();

  while (currentId && !visited.has(currentId)) {
    visited.add(currentId);
    const cat = categoryMap.get(currentId);
    if (!cat) break;

    breadcrumbs.unshift({
      id: cat.id,
      name_ar: cat.name_ar,
      name_en: cat.name_en,
    });

    currentId = cat.parentId;
  }

  return breadcrumbs;
}

function getCategorySubtreeIds(categories: Category[], targetId: string): string[] {
  const result: string[] = [targetId];

  const childrenByParent: Record<string, Category[]> = {};
  for (const cat of categories) {
    if (cat.parentId) {
      (childrenByParent[cat.parentId] ??= []).push(cat);
    }
  }

  function collect(id: string) {
    const children = childrenByParent[id] ?? [];
    for (const child of children) {
      result.push(child.id);
      collect(child.id);
    }
  }

  collect(targetId);
  return result;
}

export async function getVendors(params?: VendorFilterParams): Promise<PaginatedVendorsResult> {
  await delay(200);

  const { vendors, categories, users } = useMockStore.getState();

  // Create fast lookups
  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const userMap = new Map(
    users.map((u) => [u.id, { id: u.id, name: u.name, email: u.email, photo: u.photo }])
  );

  // 1. Exclude soft-deleted
  let filtered = vendors.filter((v) => !v.deletedAt);

  // 2. Text search (AR/EN name or CR number)
  if (params?.search && params.search.trim()) {
    const q = params.search.trim().toLowerCase();
    filtered = filtered.filter(
      (v) =>
        v.name_ar.toLowerCase().includes(q) ||
        v.name_en.toLowerCase().includes(q) ||
        v.cr_number.includes(q)
    );
  }

  // 3. Category subtree filter
  if (params?.categoryId && params.categoryId.trim()) {
    const targetId = params.categoryId.trim();
    const subtreeIds = new Set(getCategorySubtreeIds(categories, targetId));
    filtered = filtered.filter((v) => subtreeIds.has(v.categoryId));
  }

  // 4. Status filter
  if (params?.status && params.status !== "all") {
    filtered = filtered.filter((v) => v.status === params.status);
  }

  // 5. Date range filters
  if (params?.from) {
    const fromDate = new Date(params.from);
    fromDate.setHours(0, 0, 0, 0);
    filtered = filtered.filter((v) => new Date(v.createdAt) >= fromDate);
  }
  if (params?.to) {
    const toDate = new Date(params.to);
    toDate.setHours(23, 59, 59, 999);
    filtered = filtered.filter((v) => new Date(v.createdAt) <= toDate);
  }

  // 6. Sort newest first
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = filtered.length;
  const page = Math.max(1, params?.page || 1);
  const pageSize = Math.max(1, params?.pageSize || 10);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // 7. Paginate
  const start = (page - 1) * pageSize;
  const paginatedItems = filtered.slice(start, start + pageSize);

  // 8. Resolve relations
  const items: VendorWithRelations[] = paginatedItems.map((v) => {
    const cat = categoryMap.get(v.categoryId);
    const breadcrumb = getCategoryBreadcrumb(categories, v.categoryId);
    return {
      ...structuredClone(v),
      categoryName_ar: cat?.name_ar || "",
      categoryName_en: cat?.name_en || "",
      categoryBreadcrumb: breadcrumb,
      creator: userMap.get(v.createdBy) || null,
      updater: userMap.get(v.updatedBy) || null,
    };
  });

  return {
    items,
    total,
    totalPages,
    page,
    pageSize,
  };
}
