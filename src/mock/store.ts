import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Category } from "@/@types/category";
import { Module } from "@/@types/module";
import { Role } from "@/@types/role";
import { User } from "@/@types/user";
import { Vendor } from "@/@types/vendor";
import { STORAGE_KEYS } from "@/consts/storage";
import { SEED_CATEGORIES } from "@/mock/seed/categories";
import { SEED_MODULES } from "@/mock/seed/modules";
import { SEED_ROLES } from "@/mock/seed/roles";
import { SEED_USERS } from "@/mock/seed/users";
import { SEED_VENDORS } from "@/mock/seed/vendors";

export interface MockDatabaseState {
  modules: Module[];
  roles: Role[];
  users: User[];
  categories: Category[];
  vendors: Vendor[];
}

export interface MockDatabaseStore extends MockDatabaseState {
  setModules: (modules: Module[]) => void;
  setRoles: (roles: Role[]) => void;
  setUsers: (users: User[]) => void;
  setCategories: (categories: Category[]) => void;
  setVendors: (vendors: Vendor[]) => void;
  resetToSeed: () => void;
}

export function getInitialSeedData(): MockDatabaseState {
  return {
    modules: JSON.parse(JSON.stringify(SEED_MODULES)),
    roles: JSON.parse(JSON.stringify(SEED_ROLES)),
    users: JSON.parse(JSON.stringify(SEED_USERS)),
    categories: JSON.parse(JSON.stringify(SEED_CATEGORIES)),
    vendors: JSON.parse(JSON.stringify(SEED_VENDORS)),
  };
}

export const useMockStore = create<MockDatabaseStore>()(
  persist(
    (set) => ({
      ...getInitialSeedData(),
      setModules: (modules) => set({ modules }),
      setRoles: (roles) => set({ roles }),
      setUsers: (users) => set({ users }),
      setCategories: (categories) => set({ categories }),
      setVendors: (vendors) => set({ vendors }),
      resetToSeed: () => set(getInitialSeedData()),
    }),
    {
      name: STORAGE_KEYS.DB,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
