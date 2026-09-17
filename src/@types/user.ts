import { Permission } from "./permission";

export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  phone: string;
  status: UserStatus;
  roles: string[]; // Role IDs
  extraGrants?: Permission[];
  createdAt: string;
  updatedAt: string;
}
