import { delay } from "@/utils/delay";
import { useMockStore } from "@/mock/store";

export async function deleteModule(id: string): Promise<void> {
  await delay(250);

  const modules = useMockStore.getState().modules;
  const target = modules.find((m) => m.id === id);

  if (!target) {
    throw new Error(`الوحدة "${id}" غير موجودة.`);
  }

  const nextModules = modules.filter((m) => m.id !== id);
  useMockStore.setState({ modules: nextModules });
}
