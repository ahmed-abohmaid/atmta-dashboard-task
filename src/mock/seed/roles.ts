import { Role } from "@/@types/role";

export const SEED_ROLES: Role[] = [
  {
    id: "role_super_admin",
    name: "Super Admin",
    description: "Full access to all modules and system actions",
    isSystem: true,
    permissions: [
      { action: "manage", subject: "all" },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "role_manager",
    name: "Manager",
    description: "Manage vendors, categories and export data with read access to users and roles",
    isSystem: false,
    permissions: [
      { action: "read", subject: "users" },
      { action: "read", subject: "roles" },
      { action: "manage", subject: "categories" },
      { action: "manage", subject: "vendors" },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "role_employee",
    name: "Employee",
    description: "Operational access for vendors CRUD and category reading",
    isSystem: false,
    permissions: [
      { action: "read", subject: "categories" },
      { action: "read", subject: "vendors" },
      { action: "create", subject: "vendors" },
      { action: "update", subject: "vendors" },
      { action: "delete", subject: "vendors" },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "role_viewer",
    name: "Viewer",
    description: "Read-only access across users, categories, and vendors",
    isSystem: false,
    permissions: [
      { action: "read", subject: "users" },
      { action: "read", subject: "categories" },
      { action: "read", subject: "vendors" },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];
