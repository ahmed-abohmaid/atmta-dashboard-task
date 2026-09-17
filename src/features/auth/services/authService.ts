import { User } from "@/@types/user";
import {
  AuthResponse,
  LoginCredentials,
  SessionPayload,
} from "@/features/auth/@types/auth";
import {
  getSessionCookie,
  setSessionCookie,
  removeSessionCookie,
} from "@/features/auth/utils/sessionCookie";
import { useMockStore } from "@/mock/store";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(300);

    const users = useMockStore.getState().users;
    const normalizedEmail = credentials.email.trim().toLowerCase();

    const user = users.find(
      (u) => u.email.trim().toLowerCase() === normalizedEmail
    );

    if (!user || user.password !== credentials.password) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    if (user.status === "inactive") {
      throw new Error(
        "هذا الحساب معطل حالياً. يرجى التواصل مع مسؤول النظام"
      );
    }

    const session: SessionPayload = {
      userId: user.id,
      token: `mock_jwt_${user.id}_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setSessionCookie(session);

    return { user, session };
  },

  async getCurrentSessionUser(): Promise<User | null> {
    const session = getSessionCookie();
    if (!session?.userId) {
      return null;
    }

    const users = useMockStore.getState().users;
    const user = users.find((u) => u.id === session.userId);

    if (!user || user.status === "inactive") {
      removeSessionCookie();
      return null;
    }

    return user;
  },

  async logout(): Promise<boolean> {
    await delay(150);
    removeSessionCookie();
    return true;
  },
};
