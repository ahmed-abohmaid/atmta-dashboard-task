"use client";

import { useQueryClient } from "@tanstack/react-query";
import { sileo } from "sileo";
import { CreateModuleInput, Module } from "@/@types/module";
import { MODULES_QUERY_KEYS } from "@/features/modules/consts/queryKeys";
import { createModule } from "@/features/modules/services/createModule";
import { useCustomMutation } from "@/hooks/useCustomMutation";

export function useCreateModule() {
  const queryClient = useQueryClient();

  const mutation = useCustomMutation<Module, CreateModuleInput>({
    mutationFn: (data: CreateModuleInput) => createModule(data),
    onSuccess: (newModule) => {
      queryClient.setQueryData<Module[]>(MODULES_QUERY_KEYS.list(), (old) =>
        old ? [...old, newModule] : [newModule],
      );

      sileo.success({
        title: "إضافة وحدة",
        description: `تمت إضافة الوحدة "${newModule.label.ar}" بنجاح إلى النظام.`,
      });
    },
  });

  return mutation;
}
