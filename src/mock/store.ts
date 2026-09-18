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
  resetToSeed: () => void;
}

const getSeedData = (): MockDatabaseState => ({
  modules: SEED_MODULES,
  roles: SEED_ROLES,
  users: SEED_USERS,
  categories: SEED_CATEGORIES,
  vendors: SEED_VENDORS,
});

export const useMockStore = create<MockDatabaseStore>()(
  persist(
    (set) => ({
      ...getSeedData(),
      resetToSeed: () => set(getSeedData()),
    }),
    {
      name: STORAGE_KEYS.DB,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
