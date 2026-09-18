"use client";

import { Module } from "@/@types/module";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { MODULES_QUERY_KEYS } from "@/features/modules/consts/queryKeys";
import { getModuleById } from "@/features/modules/services/getModuleById";

export function useModule(id: string) {
  const queryResult = useCustomQuery<Module | null>({
    queryKey: MODULES_QUERY_KEYS.detail(id),
    queryFn: () => getModuleById(id),
    enabled: !!id,
  });

  return {
    ...queryResult,
    module: queryResult.data ?? null,
  };
}
