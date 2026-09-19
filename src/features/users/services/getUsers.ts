import { delay } from "@/utils/delay";
import { UserFilters, UserWithRelations } from "@/features/users/@types/user";
import { useMockStore } from "@/mock/store";

export async function getUsers(filters?: UserFilters): Promise<UserWithRelations[]> {
  await delay(150);

  const { users, roles, vendors } = useMockStore.getState();

  let filtered = [...users];

  if (filters?.search) {
    const q = filters.search.trim().toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q)
    );
  }

  if (filters?.role && filters.role !== "all") {
    filtered = filtered.filter((u) => u.roles?.includes(filters.role!));
  }

  if (filters?.status && filters.status !== "all") {
    filtered = filtered.filter((u) => u.status === filters.status);
  }

  const roleMap = new Map(roles.map((r) => [r.id, r]));

  const vendorCountMap = new Map<string, number>();
  vendors.forEach((v) => {
    if (!v.deletedAt && v.createdBy) {
      vendorCountMap.set(v.createdBy, (vendorCountMap.get(v.createdBy) || 0) + 1);
    }
  });

  return filtered.map((u) => ({
    ...structuredClone(u),
    roleObjects: (u.roles || [])
      .map((roleId) => roleMap.get(roleId))
      .filter((r): r is NonNullable<typeof r> => Boolean(r)),
    createdVendorsCount: vendorCountMap.get(u.id) || 0,
  }));
}
