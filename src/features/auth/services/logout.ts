import { removeSessionCookie } from "@/features/auth/utils/sessionCookie";
import { delay } from "@/utils/delay";

export async function logout(): Promise<void> {
  await delay(150);
  removeSessionCookie();
}
