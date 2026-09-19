import { Module } from "@/@types/module";
import { Permission } from "@/@types/permission";

export function toPermissionKey(p: Pick<Permission, "subject" | "action">): string {
  return `${p.subject}:${p.action}`;
}

export function toPermissionSet(permissions: Permission[]): Set<string> {
  return new Set(permissions.map(toPermissionKey));
}

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
    set.add(toPermissionKey(p));
  }

  return set;
}
