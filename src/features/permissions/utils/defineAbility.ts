import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { AppAbility } from "@/@types/permission";
import { Role } from "@/@types/role";
import { User } from "@/@types/user";

export function defineAbilityForUser(user: User | null, roles: Role[]): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (!user || user.status === "inactive") {
    return build();
  }

  const userRoles = roles.filter((role) => user.roles.includes(role.id));
  for (const role of userRoles) {
    for (const perm of role.permissions) {
      if (perm.inverted) {
        cannot(perm.action, perm.subject);
      } else {
        can(perm.action, perm.subject);
      }
    }
  }

  if (user.extraGrants && user.extraGrants.length > 0) {
    for (const grant of user.extraGrants) {
      if (grant.inverted) {
        cannot(grant.action, grant.subject);
      } else {
        can(grant.action, grant.subject);
      }
    }
  }

  if (user.extraRevokes && user.extraRevokes.length > 0) {
    for (const revoke of user.extraRevokes) {
      cannot(revoke.action, revoke.subject);
    }
  }

  return build();
}
