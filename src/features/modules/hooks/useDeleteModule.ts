"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { Module } from "@/@types/module";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { MODULES_QUERY_KEYS } from "@/features/modules/consts/queryKeys";
import { deleteModule } from "@/features/modules/services/deleteModule";

export function useDeleteModule() {
  const queryClient = useQueryClient();

  const mutation = useCustomMutation<void, string>({
    mutationFn: (id: string) => deleteModule(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Module[]>(MODULES_QUERY_KEYS.list(), (old) =>
        old ? old.filter((m) => m.id !== id) : []
      );

      sileo.success({
        title: "حذف الوحدة",
        description: "تم حذف الوحدة البرمجية بنجاح من النظام.",
      });
    },
  });

  return mutation;
}
