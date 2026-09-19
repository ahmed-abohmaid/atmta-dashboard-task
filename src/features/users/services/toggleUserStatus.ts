import { User, UserStatus } from "@/@types/user";
import { delay } from "@/utils/delay";
import { getCurrentSessionUser } from "@/features/auth/services/getCurrentSessionUser";
import { useMockStore } from "@/mock/store";

export async function toggleUserStatus(id: string, newStatus: UserStatus): Promise<User> {
  await delay(150);

  const { users } = useMockStore.getState();

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    throw new Error("المستخدم غير موجود");
  }

  const user = users[userIndex];

  if (newStatus === "inactive") {
    const currentUser = await getCurrentSessionUser();
    if (currentUser?.id === id) {
      throw new Error("لا يمكنك تعطيل حسابك الشخصي الحالي");
    }

    const activeSuperAdmins = users.filter(
      (u) => u.status === "active" && (u.roles || []).includes("role_super_admin")
    );
    const isLastSuperAdmin =
      user.status === "active" &&
      (user.roles || []).includes("role_super_admin") &&
      activeSuperAdmins.length <= 1;

    if (isLastSuperAdmin) {
      throw new Error("لا يمكن تعطيل آخر مدير نظام (Super Admin) في النظام");
    }
  }

  const updatedUser: User = {
    ...user,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  const newUsers = [...users];
  newUsers[userIndex] = updatedUser;

  useMockStore.setState({ users: newUsers });

  return updatedUser;
}
