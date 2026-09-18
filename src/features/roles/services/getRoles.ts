import { Role } from "@/@types/role";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export async function getRoles(): Promise<Role[]> {
  await delay(200);
  const roles = useMockStore.getState().roles;
  return JSON.parse(JSON.stringify(roles)) as Role[];
}
