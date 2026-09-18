import { Module } from "@/@types/module";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export async function getModuleById(id: string): Promise<Module | null> {
  await delay(150);
  const normalizedId = id.trim().toLowerCase();
  const modules = useMockStore.getState().modules;
  const target = modules.find((m) => m.id.toLowerCase() === normalizedId);

  if (!target) {
    return null;
  }

  return JSON.parse(JSON.stringify(target)) as Module;
}
