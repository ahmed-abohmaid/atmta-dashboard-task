import { Module } from "@/@types/module";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export async function getModules(): Promise<Module[]> {
  await delay(200);
  const modules = useMockStore.getState().modules;
  return JSON.parse(JSON.stringify(modules)) as Module[];
}
