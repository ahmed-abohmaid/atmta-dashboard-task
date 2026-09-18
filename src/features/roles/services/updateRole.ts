import { RoleWithUserCount, UpdateRoleInput } from "@/@types/role";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export async function updateRole(input: UpdateRoleInput): Promise<RoleWithUserCount> {
  await delay(300);

  const trimmedName = input.name.trim();
  if (!trimmedName) {
    throw new Error("اسم الدور مطلوب.");
  }

  const { roles, users } = useMockStore.getState();
  const existingRole = roles.find((r) => r.id === input.id);

  if (!existingRole) {
    throw new Error(`الدور برمز "${input.id}" غير موجود.`);
  }

  const isDuplicateName = roles.some(
    (r) => r.id !== input.id && r.name.trim().toLowerCase() === trimmedName.toLowerCase()
  );
  if (isDuplicateName) {
    throw new Error(`يوجد دور آخر يحمل الاسم "${trimmedName}".`);
  }

  // Preserve Super Admin invariants if editing super admin
  const isSuperAdmin = existingRole.id === "role_super_admin";
  const permissions = isSuperAdmin
    ? [{ action: "manage", subject: "all" }]
    : input.permissions;

  const now = new Date().toISOString();
  const updatedRole = {
    ...existingRole,
    name: trimmedName,
    description: input.description?.trim() || undefined,
    permissions,
    updatedAt: now,
  };

  useMockStore.setState((state) => ({
    roles: state.roles.map((r) => (r.id === input.id ? updatedRole : r)),
  }));

  const userCount = users.filter((u) => u.roles?.includes(input.id)).length;

  return {
    ...updatedRole,
    userCount,
  };
}
