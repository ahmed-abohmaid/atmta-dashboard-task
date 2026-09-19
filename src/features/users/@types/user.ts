import { Permission } from "@/@types/permission";
import { Role } from "@/@types/role";
import { User, UserStatus } from "@/@types/user";
import { VendorWithRelations } from "@/features/vendors/@types/vendor";

export interface UserFilters {
  search?: string;
  role?: string;
  status?: UserStatus | "all";
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  photo?: string;
  status: UserStatus;
  roles: string[];
  extraGrants?: Permission[];
  extraRevokes?: Permission[];
}

export interface UpdateUserInput {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  photo?: string;
  status: UserStatus;
  roles: string[];
  extraGrants?: Permission[];
  extraRevokes?: Permission[];
}

export interface UserWithRelations extends User {
  roleObjects: Role[];
  createdVendorsCount: number;
}

export interface ResolvedModulePermission {
  moduleKey: string;
  moduleLabel: string;
  actions: {
    action: string;
    label: string;
    source: "role" | "extra_grant" | "both";
  }[];
}

export interface UserDetailData {
  user: User;
  roles: Role[];
  resolvedPermissions: ResolvedModulePermission[];
  createdVendors: VendorWithRelations[];
  isLastSuperAdmin: boolean;
  isSelf: boolean;
}
