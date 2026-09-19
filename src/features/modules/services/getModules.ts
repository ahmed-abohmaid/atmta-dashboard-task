import { Module } from "@/@types/module";
import { delay } from "@/utils/delay";
import { useMockStore } from "@/mock/store";

export async function getModules(): Promise<Module[]> {
  await delay(200);
  const modules = useMockStore.getState().modules;
  return JSON.parse(JSON.stringify(modules)) as Module[];
}
