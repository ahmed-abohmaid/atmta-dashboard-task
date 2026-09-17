export interface ModuleAction {
  id: string;
  label: {
    ar: string;
    en: string;
  };
  isCustom?: boolean;
}

export interface Module {
  id: string;
  label: {
    ar: string;
    en: string;
  };
  description?: {
    ar: string;
    en: string;
  };
  actions: ModuleAction[];
}
