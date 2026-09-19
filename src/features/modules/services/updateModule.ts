import { Module, ModuleAction, UpdateModuleInput } from "@/@types/module";
import { delay } from "@/utils/delay";
import { useMockStore } from "@/mock/store";

export async function updateModule(input: UpdateModuleInput): Promise<Module> {
  await delay(250);

  const modules = useMockStore.getState().modules;
  const targetIndex = modules.findIndex((m) => m.id === input.id);

  if (targetIndex === -1) {
    throw new Error(`الوحدة "${input.id}" غير موجودة.`);
  }

  const existingModule = modules[targetIndex];
  const standardActions = existingModule.actions.filter((a) => !a.isCustom);

  const actions: ModuleAction[] = [
    ...standardActions,
    {
      id: input.customAction.id.trim().toLowerCase(),
      label: {
        ar: input.customAction.label.ar.trim(),
        en: input.customAction.label.en?.trim() || input.customAction.id.trim(),
      },
      isCustom: true,
    },
  ];

  const updatedModule: Module = {
    ...existingModule,
    label: {
      ar: input.label.ar.trim(),
      en: input.label.en.trim(),
    },
    icon: input.icon.trim(),
    description: input.description
      ? {
          ar: input.description.ar.trim(),
          en: input.description.en.trim(),
        }
      : existingModule.description,
    actions,
  };

  const nextModules = [...modules];
  nextModules[targetIndex] = updatedModule;
  useMockStore.setState({ modules: nextModules });

  return updatedModule;
}
