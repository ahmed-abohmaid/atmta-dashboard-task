import { Category } from "@/@types/category";

export const SEED_CATEGORIES: Category[] = [
  // Level 0 (Roots)
  {
    id: "cat_mep",
    name_ar: "الأعمال الكهروميكانيكية (MEP)",
    name_en: "Mechanical, Electrical & Plumbing (MEP)",
    parentId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_arch_design",
    name_ar: "التصميم المعماري والإنشائي",
    name_en: "Architectural & Structural Design",
    parentId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_building_materials",
    name_ar: "مواد البناء والتشطيبات المعمارية",
    name_en: "Building Materials & Architectural Finishing",
    parentId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },

  // Level 1
  {
    id: "cat_electrical",
    name_ar: "الأعمال الكهربائية وأنظمة الطاقة",
    name_en: "Electrical Works & Power Systems",
    parentId: "cat_mep",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_mechanical",
    name_ar: "الأعمال الميكانيكية والتكييف (HVAC)",
    name_en: "Mechanical & HVAC Works",
    parentId: "cat_mep",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_interior_fitout",
    name_ar: "التصميم الداخلي وأعمال الديكور (Fit-out)",
    name_en: "Interior Design & Fit-out",
    parentId: "cat_arch_design",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_facades",
    name_ar: "الواجهات الزجاجية والألمنيوم المعماري",
    name_en: "Glass Facades & Architectural Aluminum",
    parentId: "cat_building_materials",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },

  // Level 2 (Deep nested)
  {
    id: "cat_electrical_panels",
    name_ar: "لوحات التوزيع وتمديدات الجهد المنخفض",
    name_en: "Distribution Panels & Low Voltage",
    parentId: "cat_electrical",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_hvac_central",
    name_ar: "أنظمة التكييف والتهوية المركزية",
    name_en: "Central HVAC & Ventilation Systems",
    parentId: "cat_mechanical",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cat_fire_plumbing",
    name_ar: "شبكات مكافحة الحريق والصرف الصحي",
    name_en: "Firefighting & Plumbing Networks",
    parentId: "cat_mechanical",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];
