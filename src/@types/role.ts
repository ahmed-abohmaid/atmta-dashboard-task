import { Permission } from "./permission";

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isSystem?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleWithUserCount extends Role {
  userCount: number;
}

export interface CreateRoleInput {
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface UpdateRoleInput extends CreateRoleInput {
  id: string;
}
