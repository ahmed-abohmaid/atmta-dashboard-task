import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export async function resetToSeed(): Promise<void> {
  await delay(200);
  useMockStore.getState().resetToSeed();
}
