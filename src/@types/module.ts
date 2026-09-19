export interface ModuleAction {
  id: string;
  label: {
    ar: string;
    en?: string;
  };
  isCustom?: boolean;
}

export interface Module {
  id: string;
  label: {
    ar: string;
    en: string;
  };
  icon?: string;
  path?: string;
  description?: {
    ar: string;
    en: string;
  };
  actions: ModuleAction[];
}

export interface CreateModuleInput {
  label: {
    ar: string;
    en: string;
  };
  icon: string;
  description?: {
    ar: string;
    en: string;
  };
  customAction: {
    id: string;
    label: {
      ar: string;
      en?: string;
    };
  };
}

export type ModulePayload = CreateModuleInput;

export interface UpdateModuleInput extends CreateModuleInput {
  id: string;
}

