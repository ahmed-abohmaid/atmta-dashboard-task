import { delay } from "@/utils/delay";
import { useMockStore } from "@/mock/store";

export async function resetToSeed(): Promise<void> {
  await delay(200);
  useMockStore.getState().resetToSeed();
}
