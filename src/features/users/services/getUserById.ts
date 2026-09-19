import { delay } from "@/utils/delay";
import { getSessionCookie } from "@/features/auth/utils/sessionCookie";
import { ResolvedModulePermission, UserDetailData } from "@/features/users/@types/user";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";
import { getCategoryBreadcrumb } from "@/features/vendors/services/getVendors";
import { useMockStore } from "@/mock/store";

export async function getUserById(id: string): Promise<UserDetailData | null> {
  await delay(150);

  const { users, roles, modules, vendors, categories } = useMockStore.getState();

  const user = users.find((u) => u.id === id);
  if (!user) {
    return null;
  }

  const userRoles = roles.filter((r) => user.roles?.includes(r.id));

  // Resolved module permissions
  const resolvedPermissions: ResolvedModulePermission[] = [];

  for (const mod of modules) {
    const roleActions = new Set<string>();
    for (const r of userRoles) {
      for (const p of r.permissions) {
        if (p.subject === mod.id || p.subject === "all") {
          if (p.action === "manage") {
            mod.actions.forEach((a) => roleActions.add(a.id));
          } else {
            roleActions.add(p.action);
          }
        }
      }
    }

    const extraGrantActions = new Set<string>();
    for (const g of user.extraGrants || []) {
      if (g.subject === mod.id || g.subject === "all") {
        if (g.action === "manage") {
          mod.actions.forEach((a) => extraGrantActions.add(a.id));
        } else {
          extraGrantActions.add(g.action);
        }
      }
    }

    const extraRevokeActions = new Set<string>();
    for (const r of user.extraRevokes || []) {
      if (r.subject === mod.id || r.subject === "all") {
        if (r.action === "manage") {
          mod.actions.forEach((a) => extraRevokeActions.add(a.id));
        } else {
          extraRevokeActions.add(r.action);
        }
      }
    }

    const actionsList: ResolvedModulePermission["actions"] = [];

    for (const declared of mod.actions) {
      if (extraRevokeActions.has(declared.id)) {
        continue;
      }

      const inRole = roleActions.has(declared.id);
      const inGrant = extraGrantActions.has(declared.id);

      if (inRole && inGrant) {
        actionsList.push({ action: declared.id, label: declared.label.ar, source: "both" });
      } else if (inGrant) {
        actionsList.push({ action: declared.id, label: declared.label.ar, source: "extra_grant" });
      } else if (inRole) {
        actionsList.push({ action: declared.id, label: declared.label.ar, source: "role" });
      }
    }

    if (actionsList.length > 0) {
      resolvedPermissions.push({
        moduleKey: mod.id,
        moduleLabel: mod.label.ar,
        actions: actionsList,
      });
    }
  }

  // Vendors created by this user
  const createdVendorsRaw = vendors.filter((v) => v.createdBy === user.id && !v.deletedAt);
  const createdVendors: VendorWithRelations[] = createdVendorsRaw.map((v) => {
    const cat = categories.find((c) => c.id === v.categoryId);
    return {
      ...structuredClone(v),
      categoryName_ar: cat?.name_ar || "",
      categoryName_en: cat?.name_en || "",
      categoryBreadcrumb: getCategoryBreadcrumb(categories, v.categoryId),
      creator: {
        id: user.id,
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
      updater: null,
    };
  });

  const activeSuperAdmins = users.filter(
    (u) => u.status === "active" && (u.roles || []).includes("role_super_admin")
  );
  const isLastSuperAdmin =
    user.status === "active" &&
    (user.roles || []).includes("role_super_admin") &&
    activeSuperAdmins.length <= 1;

  const session = getSessionCookie();
  const isSelf = session?.userId === user.id;

  return {
    user: structuredClone(user),
    roles: structuredClone(userRoles),
    resolvedPermissions,
    createdVendors,
    isLastSuperAdmin,
    isSelf,
  };
}
