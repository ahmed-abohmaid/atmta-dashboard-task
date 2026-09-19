import { delay } from "@/utils/delay";
import { AuthResponse, LoginCredentials, SessionPayload } from "@/features/auth/@types/auth";
import { useMockStore } from "@/mock/store";

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  await delay(300);

  const users = useMockStore.getState().users;
  const normalizedEmail = credentials.email.trim().toLowerCase();

  const user = users.find((u) => u.email.trim().toLowerCase() === normalizedEmail);

  if (!user || user.password !== credentials.password) {
    throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }

  if (user.status === "inactive") {
    throw new Error("هذا الحساب معطل حالياً. يرجى التواصل مع مسؤول النظام");
  }

  const session: SessionPayload = {
    userId: user.id,
    token: `mock_jwt_${user.id}_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  const allRoles = useMockStore.getState().roles;
  const userRoles = allRoles.filter((r) => user.roles.includes(r.id));
  const userPermissions = userRoles.flatMap((r) => r.permissions);

  return {
    user,
    roles: userRoles,
    permissions: userPermissions,
    session,
  };
}
