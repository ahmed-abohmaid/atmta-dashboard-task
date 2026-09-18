"use client";

import { Module } from "@/@types/module";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { MODULES_QUERY_KEYS } from "@/features/modules/consts/queryKeys";
import { getModules } from "@/features/modules/services/getModules";

export function useModules() {
  const queryResult = useCustomQuery<Module[]>({
    queryKey: MODULES_QUERY_KEYS.list(),
    queryFn: () => getModules(),
    staleTime: Infinity,
  });

  return {
    ...queryResult,
    modules: queryResult.data ?? [],
  };
}
