import { getSessionCookie } from "@/features/auth/utils/sessionCookie";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export async function deleteVendor(id: string): Promise<void> {
  await delay(200);

  const { vendors } = useMockStore.getState();
  const existing = vendors.find((v) => v.id === id && !v.deletedAt);

  if (!existing) {
    throw new Error("المورد المطلوب حذفه غير موجود.");
  }

  const session = getSessionCookie();
  const currentUserId = session?.userId || "user_super_admin";
  const now = new Date().toISOString();

  useMockStore.setState((state) => ({
    vendors: state.vendors.map((v) =>
      v.id === id
        ? {
            ...v,
            deletedAt: now,
            updatedBy: currentUserId,
            updatedAt: now,
          }
        : v
    ),
  }));
}
