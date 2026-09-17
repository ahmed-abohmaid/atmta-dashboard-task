export const APP_QUERY_KEYS = {
  users: {
    all: ["users"] as const,
    list: (filters?: unknown) => ["users", "list", filters] as const,
    detail: (id: string) => ["users", id] as const,
  },
  roles: {
    all: ["roles"] as const,
    list: () => ["roles", "list"] as const,
    detail: (id: string) => ["roles", id] as const,
  },
  modules: {
    all: ["modules"] as const,
    list: () => ["modules", "list"] as const,
    detail: (id: string) => ["modules", id] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: () => ["categories", "list"] as const,
    detail: (id: string) => ["categories", id] as const,
    tree: () => ["categories", "tree"] as const,
  },
  vendors: {
    all: ["vendors"] as const,
    list: (filters?: unknown) => ["vendors", "list", filters] as const,
    detail: (id: string) => ["vendors", id] as const,
  },
} as const;
