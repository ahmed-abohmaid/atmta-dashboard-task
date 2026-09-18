export const PERMISSIONS_QUERY_KEYS = {
  all: ["permissions"] as const,
  roles: ["permissions", "roles"] as const,
  userAbility: (userId?: string) => ["permissions", "ability", userId] as const,
};
