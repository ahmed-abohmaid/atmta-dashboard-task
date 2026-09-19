import { User } from "@/@types/user";
import { delay } from "@/utils/delay";
import { normalizeSaudiPhone } from "@/utils/phone";
import { getCurrentSessionUser } from "@/features/auth/services/getCurrentSessionUser";
import { defineAbilityForUser } from "@/features/permissions/utils/defineAbility";
import { CreateUserInput } from "@/features/users/@types/user";
import { useMockStore } from "@/mock/store";

export async function createUser(input: CreateUserInput): Promise<User> {
  await delay(200);

  const { users, roles } = useMockStore.getState();

  const emailClean = input.email.trim().toLowerCase();
  const emailExists = users.some((u) => u.email.toLowerCase() === emailClean);
  if (emailExists) {
    throw new Error("البريد الإلكتروني مسجل مسبقاً لمستخدم آخر");
  }

  // Permission check: cannot grant what creator does not hold
  const currentUser = await getCurrentSessionUser();
  if (currentUser) {
    const userAbility = defineAbilityForUser(currentUser, roles);
    const isSuperAdmin = currentUser.roles?.includes("role_super_admin");

    if (!isSuperAdmin) {
      // Check roles being assigned
      for (const roleId of input.roles) {
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

      // Check extraGrants
      for (const grant of input.extraGrants || []) {
        if (!userAbility.can(grant.action, grant.subject)) {
          throw new Error(
            `لا يمكنك منح صلاحية (${grant.action} على ${grant.subject}) لا تمتلكها`
          );
        }
      }
    }
  }

  const now = new Date().toISOString();
  const newUser: User = {
    id: `user_${Date.now()}`,
    name: input.name.trim(),
    email: emailClean,
    password: input.password || "password123",
    phone: normalizeSaudiPhone(input.phone),
    photo: input.photo?.trim() || undefined,
    status: input.status,
    roles: input.roles,
    extraGrants: input.extraGrants || [],
    extraRevokes: input.extraRevokes || [],
    createdAt: now,
    updatedAt: now,
  };

  useMockStore.setState({
    users: [newUser, ...users],
  });

  return newUser;
}
