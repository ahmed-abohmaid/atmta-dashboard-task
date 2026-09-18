import { RoleWithUserCount } from "@/@types/role";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export async function getRoles(): Promise<RoleWithUserCount[]> {
  await delay(200);

  const { roles, users } = useMockStore.getState();

  const userCountMap = new Map<string, number>();
  users.forEach((u) => {
    u.roles?.forEach((roleId) => {
      userCountMap.set(roleId, (userCountMap.get(roleId) || 0) + 1);
    });
  });

  return roles.map((role) => ({
    ...structuredClone(role),
    userCount: userCountMap.get(role.id) || 0,
  }));
}
