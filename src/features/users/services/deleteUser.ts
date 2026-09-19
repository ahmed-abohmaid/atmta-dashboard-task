import { delay } from "@/utils/delay";
import { getCurrentSessionUser } from "@/features/auth/services/getCurrentSessionUser";
import { useMockStore } from "@/mock/store";

export async function deleteUser(id: string): Promise<string> {
  await delay(150);

  const { users } = useMockStore.getState();

  const user = users.find((u) => u.id === id);
  if (!user) {
    throw new Error("المستخدم غير موجود");
  }

  const currentUser = await getCurrentSessionUser();
  if (currentUser?.id === id) {
    throw new Error("لا يمكنك حذف حسابك الشخصي الحالي");
  }

  // Last Super Admin Safeguard
  const activeSuperAdmins = users.filter(
    (u) => u.status === "active" && (u.roles || []).includes("role_super_admin")
  );
  const isLastSuperAdmin =
    user.status === "active" &&
    (user.roles || []).includes("role_super_admin") &&
    activeSuperAdmins.length <= 1;

  if (isLastSuperAdmin) {
    throw new Error("لا يمكن حذف آخر مدير نظام (Super Admin) متبقي في النظام");
  }

  useMockStore.setState({
    users: users.filter((u) => u.id !== id),
  });

  return id;
}
