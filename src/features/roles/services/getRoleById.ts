import { RoleWithUserCount } from "@/@types/role";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export async function getRoleById(id: string): Promise<RoleWithUserCount> {
  await delay(200);

  const { roles, users } = useMockStore.getState();
  const role = roles.find((r) => r.id === id);

  if (!role) {
    throw new Error(`الدور برمز "${id}" غير موجود.`);
  }

  const userCount = users.filter((u) => u.roles?.includes(role.id)).length;

  return {
    ...structuredClone(role),
    userCount,
  };
}
