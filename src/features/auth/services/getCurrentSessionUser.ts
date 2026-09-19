import { User } from "@/@types/user";
import { delay } from "@/utils/delay";
import { getSessionCookie, removeSessionCookie } from "@/features/auth/utils/sessionCookie";
import { useMockStore } from "@/mock/store";

export async function getCurrentSessionUser(): Promise<User | null> {
  await delay(150);

  const session = getSessionCookie();
  if (!session?.userId) return null;

  const users = useMockStore.getState().users;
  const user = users.find((u) => u.id === session.userId);

  if (!user || user.status === "inactive") {
    removeSessionCookie();
    return null;
  }

  return user;
}
