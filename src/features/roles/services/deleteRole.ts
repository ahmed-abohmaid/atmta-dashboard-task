import { delay } from "@/utils/delay";
import { useMockStore } from "@/mock/store";

export async function deleteRole(id: string): Promise<void> {
  await delay(250);

  const { roles, users } = useMockStore.getState();
  const target = roles.find((r) => r.id === id);

  if (!target) {
    throw new Error(`الدور برمز "${id}" غير موجود.`);
  }

  if (target.isSystem) {
    throw new Error("لا يمكن حذف أدوار النظام الأساسية.");
  }

  const assignedUsersCount = users.filter((u) => u.roles?.includes(id)).length;
  if (assignedUsersCount > 0) {
    throw new Error(
      `لا يمكن حذف الدور لأنه مرتبط حالياً بـ ${assignedUsersCount} من المستخدمين. يرجى نقل المستخدمين إلى أدوار أخرى أولاً.`
    );
  }

  useMockStore.setState((state) => ({
    roles: state.roles.filter((r) => r.id !== id),
  }));
}
