"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { Module, UpdateModuleInput } from "@/@types/module";
import { useCustomMutation } from "@/hooks/useCustomMutation";
import { MODULES_QUERY_KEYS } from "@/features/modules/consts/queryKeys";
import { updateModule } from "@/features/modules/services/updateModule";

export function useUpdateModule() {
  const queryClient = useQueryClient();

  const mutation = useCustomMutation<Module, UpdateModuleInput>({
    mutationFn: (data: UpdateModuleInput) => updateModule(data),
    onSuccess: (updatedModule) => {
      queryClient.setQueryData<Module[]>(MODULES_QUERY_KEYS.list(), (old) =>
        old ? old.map((m) => (m.id === updatedModule.id ? updatedModule : m)) : [updatedModule]
      );

      sileo.success({
        title: "تعديل الوحدة",
        description: `تم تحديث بيانات الوحدة "${updatedModule.label.ar}" بنجاح.`,
      });
    },
  });

  return mutation;
}
