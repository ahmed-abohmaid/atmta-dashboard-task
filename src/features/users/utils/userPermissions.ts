import { Permission } from "@/@types/permission";
import { Role } from "@/@types/role";
import { toPermissionKey, toPermissionSet } from "@/features/permissions/utils/matrixUtils";

function getRolePermissions(availableRoles: Role[], selectedRoleIds: string[]): Permission[] {
  const selected = availableRoles.filter((r) => selectedRoleIds.includes(r.id));
  const seen = new Set<string>();
  const perms: Permission[] = [];

  for (const role of selected) {
    for (const p of role.permissions) {
      if (p.inverted) continue;
      const key = toPermissionKey(p);
      if (!seen.has(key)) {
        seen.add(key);
        perms.push({ action: p.action, subject: p.subject });
      }
    }
  }

  return perms;
}

export function computeEffectivePermissions(
  availableRoles: Role[],
  selectedRoleIds: string[],
  extraGrants: Permission[] = [],
  extraRevokes: Permission[] = []
): Permission[] {
  const revokeKeys = toPermissionSet(extraRevokes);
  const candidates = [...getRolePermissions(availableRoles, selectedRoleIds), ...extraGrants];

  const seen = new Set<string>();
  const effective: Permission[] = [];

  for (const p of candidates) {
    if (p.inverted) continue;
    const key = toPermissionKey(p);
    if (!revokeKeys.has(key) && !seen.has(key)) {
      seen.add(key);
      effective.push({ action: p.action, subject: p.subject });
    }
  }

  return effective;
}

export function deriveGrantsAndRevokes(
  availableRoles: Role[],
  selectedRoleIds: string[],
  targetEffectivePermissions: Permission[]
): { extraGrants: Permission[]; extraRevokes: Permission[] } {
  const rolePerms = getRolePermissions(availableRoles, selectedRoleIds);
  const roleKeys = toPermissionSet(rolePerms);
  const targetKeys = toPermissionSet(targetEffectivePermissions);

  const extraGrants = targetEffectivePermissions.filter(
    (p) => !p.inverted && !roleKeys.has(toPermissionKey(p))
  );

  const extraRevokes = rolePerms.filter((p) => !targetKeys.has(toPermissionKey(p)));

  return { extraGrants, extraRevokes };
}
