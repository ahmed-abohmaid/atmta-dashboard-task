import { Module } from "@/@types/module";

export const SEED_MODULES: Module[] = [
  {
    id: "users",
    label: {
      ar: "المستخدمين",
      en: "Users",
    },
    icon: "users",
    description: {
      ar: "إدارة مستخدمي النظام والصلاحيات",
      en: "Manage system users and access permissions",
    },
    actions: [
      { id: "read", label: { ar: "عرض", en: "View" } },
      { id: "create", label: { ar: "إضافة", en: "Create" } },
      { id: "update", label: { ar: "تعديل", en: "Edit" } },
      { id: "delete", label: { ar: "حذف", en: "Delete" } },
      { id: "invite", label: { ar: "دعوة مستخدم", en: "Invite User" }, isCustom: true },
    ],
  },
  {
    id: "categories",
    label: {
      ar: "التصنيفات",
      en: "Categories",
    },
    icon: "folder-tree",
    description: {
      ar: "إدارة شجرة التصنيفات الهندسية والمعمارية",
      en: "Manage architectural & MEP categories",
    },
    actions: [
      { id: "read", label: { ar: "عرض", en: "View" } },
      { id: "create", label: { ar: "إضافة", en: "Create" } },
      { id: "update", label: { ar: "تعديل", en: "Edit" } },
      { id: "delete", label: { ar: "حذف", en: "Delete" } },
      { id: "reorder", label: { ar: "إعادة ترتيب", en: "Reorder Tree" }, isCustom: true },
    ],
  },
  {
    id: "vendors",
    label: {
      ar: "الموردين",
      en: "Vendors",
    },
    icon: "building-2",
    description: {
      ar: "إدارة المقاولين وموردي الأعمال الكهروميكانيكية والمعمارية",
      en: "Manage architectural & MEP contractors and suppliers",
    },
    actions: [
      { id: "read", label: { ar: "عرض", en: "View" } },
      { id: "create", label: { ar: "إضافة", en: "Create" } },
      { id: "update", label: { ar: "تعديل", en: "Edit" } },
      { id: "delete", label: { ar: "حذف", en: "Delete" } },
      { id: "export", label: { ar: "تصدير CSV", en: "Export CSV" }, isCustom: true },
    ],
  },
];
