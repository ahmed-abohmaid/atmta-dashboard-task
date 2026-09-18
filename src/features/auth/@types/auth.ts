import { Permission } from "@/@types/permission";
import { Role } from "@/@types/role";
import { User } from "@/@types/user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SessionPayload {
  userId: string;
  token: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  roles: Role[];
  permissions: Permission[];
  session: SessionPayload;
}
