import { CreateModuleInput, Module, ModuleAction } from "@/@types/module";
import { useMockStore } from "@/mock/store";
import { delay } from "@/utils/delay";

export function generateModuleSlug(labelEn: string): string {
  return labelEn
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createModule(input: CreateModuleInput): Promise<Module> {
  await delay(300);

  const slug = generateModuleSlug(input.label.en);
  if (!slug) {
    throw new Error("فشل توليد معرف صالح للوحدة من الاسم الإنجليزي.");
  }

  const existingModules = useMockStore.getState().modules;
  const isDuplicate = existingModules.some(
    (m) => m.id.toLowerCase() === slug
  );

  if (isDuplicate) {
    throw new Error(`الوحدة بالمعرف "${slug}" موجودة بالفعل.`);
  }

  const actions: ModuleAction[] = [
    { id: "read", label: { ar: "عرض", en: "View" } },
    { id: "create", label: { ar: "إضافة", en: "Create" } },
    { id: "update", label: { ar: "تعديل", en: "Edit" } },
    { id: "delete", label: { ar: "حذف", en: "Delete" } },
    {
      id: input.customAction.id.trim().toLowerCase(),
      label: {
        ar: input.customAction.label.ar.trim(),
        en: input.customAction.label.en?.trim() || input.customAction.id.trim(),
      },
      isCustom: true,
    },
  ];

  const newModule: Module = {
    id: slug,
    label: {
      ar: input.label.ar.trim(),
      en: input.label.en.trim(),
    },
    icon: input.icon.trim(),
    path: `/modules/${slug}`,
    description: input.description
      ? {
          ar: input.description.ar.trim(),
          en: input.description.en.trim(),
        }
      : undefined,
    actions,
  };

  useMockStore.setState((state) => ({
    modules: [...state.modules, newModule],
  }));

  return newModule;
}
