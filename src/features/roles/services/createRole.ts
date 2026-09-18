import { CreateRoleInput, RoleWithUserCount } from "@/@types/role";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export function generateRoleSlug(name: string): string {
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (normalized.length >= 2) {
    return `role_${normalized}`;
  }

  return `role_${Date.now().toString(36)}`;
}

export async function createRole(input: CreateRoleInput): Promise<RoleWithUserCount> {
  await delay(300);

  const trimmedName = input.name.trim();
  if (!trimmedName) {
    throw new Error("اسم الدور مطلوب.");
  }

  const { roles } = useMockStore.getState();

  const isDuplicateName = roles.some(
    (r) => r.name.trim().toLowerCase() === trimmedName.toLowerCase()
  );
  if (isDuplicateName) {
    throw new Error(`الدور باسم "${trimmedName}" موجود مسبقاً.`);
  }

  let slug = generateRoleSlug(trimmedName);
  let counter = 1;
  while (roles.some((r) => r.id === slug)) {
    slug = `${generateRoleSlug(trimmedName)}_${counter}`;
    counter++;
  }

  const now = new Date().toISOString();
  const newRole = {
    id: slug,
    name: trimmedName,
    description: input.description?.trim() || undefined,
    permissions: input.permissions,
    isSystem: false,
    createdAt: now,
    updatedAt: now,
  };

  useMockStore.setState((state) => ({
    roles: [...state.roles, newRole],
  }));

  return {
    ...newRole,
    userCount: 0,
  };
}
