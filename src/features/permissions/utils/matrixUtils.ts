import { Module } from "@/@types/module";
import { Permission } from "@/@types/permission";

export function buildGrantedSet(
  value: Permission[],
  modules: Module[],
  isSuperAdmin: boolean
): Set<string> {
  const set = new Set<string>();

  if (isSuperAdmin) {
    for (const m of modules) {
      for (const a of m.actions) {
        set.add(`${m.id}:${a.id}`);
      }
    }
    return set;
  }

  for (const p of value) {
    set.add(`${p.subject}:${p.action}`);
  }

  return set;
}
