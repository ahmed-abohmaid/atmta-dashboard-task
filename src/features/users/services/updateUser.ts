import { User } from "@/@types/user";
import { delay } from "@/utils/delay";
import { normalizeSaudiPhone } from "@/utils/phone";
import { getCurrentSessionUser } from "@/features/auth/services/getCurrentSessionUser";
import { defineAbilityForUser } from "@/features/permissions/utils/defineAbility";
import { UpdateUserInput } from "@/features/users/@types/user";
import { useMockStore } from "@/mock/store";

export async function updateUser(input: UpdateUserInput): Promise<User> {
  await delay(200);

  const { users, roles } = useMockStore.getState();

  const userIndex = users.findIndex((u) => u.id === input.id);
  if (userIndex === -1) {
    throw new Error("المستخدم غير موجود");
  }

  const existing = users[userIndex];

  // Email unique check
  const emailClean = input.email.trim().toLowerCase();
  const emailExists = users.some(
    (u) => u.id !== input.id && u.email.toLowerCase() === emailClean
  );
  if (emailExists) {
    throw new Error("البريد الإلكتروني مسجل مسبقاً لمستخدم آخر");
  }

  // Last Super Admin Safeguard
  const activeSuperAdmins = users.filter(
    (u) => u.status === "active" && (u.roles || []).includes("role_super_admin")
  );
  const isExistingLastSuperAdmin =
    existing.status === "active" &&
    (existing.roles || []).includes("role_super_admin") &&
    activeSuperAdmins.length <= 1;

  if (isExistingLastSuperAdmin) {
    if (input.status === "inactive") {
      throw new Error("لا يمكن إلغاء تفعيل آخر مدير نظام (Super Admin) في النظام");
    }
    if (!input.roles.includes("role_super_admin")) {
      throw new Error("لا يمكن سحب دور مدير النظام (Super Admin) عن آخر مدير نظام متبقي");
    }
  }

  // Permission check: cannot grant what updater does not hold
  const currentUser = await getCurrentSessionUser();
  if (currentUser) {
    const userAbility = defineAbilityForUser(currentUser, roles);
    const isSuperAdmin = currentUser.roles?.includes("role_super_admin");

    if (!isSuperAdmin) {
      // Check roles being assigned
      for (const roleId of input.roles) {
        if (!existing.roles.includes(roleId)) {
          const role = roles.find((r) => r.id === roleId);
          if (role) {
            for (const perm of role.permissions) {
              if (!userAbility.can(perm.action, perm.subject)) {
                throw new Error(
                  `لا يمكنك تعيين دور يحتوي على صلاحية (${perm.action} على ${perm.subject}) لا تمتلكها`
                );
              }
            }
          }
        }
      }

      // Check extraGrants
      for (const grant of input.extraGrants || []) {
        const alreadyGranted = existing.extraGrants?.some(
          (g) => g.action === grant.action && g.subject === grant.subject
        );
        if (!alreadyGranted && !userAbility.can(grant.action, grant.subject)) {
          throw new Error(
            `لا يمكنك منح صلاحية (${grant.action} على ${grant.subject}) لا تمتلكها`
          );
        }
      }
    }
  }

  const updatedUser: User = {
    ...existing,
    name: input.name.trim(),
    email: emailClean,
    password: input.password ? input.password : existing.password,
    phone: normalizeSaudiPhone(input.phone),
    photo: input.photo !== undefined ? input.photo.trim() || undefined : existing.photo,
    status: input.status,
    roles: input.roles,
    extraGrants: input.extraGrants !== undefined ? input.extraGrants : existing.extraGrants,
    extraRevokes: input.extraRevokes !== undefined ? input.extraRevokes : existing.extraRevokes,
    updatedAt: new Date().toISOString(),
  };

  const newUsers = [...users];
  newUsers[userIndex] = updatedUser;

  useMockStore.setState({ users: newUsers });

  return updatedUser;
}
