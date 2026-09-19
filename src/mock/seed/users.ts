import { User } from "@/@types/user";

export const SEED_USERS: User[] = [
  {
    id: "user_super_admin",
    name: "خالد المحمدي (سوبر أدمن)",
    email: "admin@atmta.test",
    password: "admin123",
    phone: "+966501234567",
    photo:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&auto=format&fit=crop&q=80",
    status: "active",
    roles: ["role_super_admin"],
    extraGrants: [],
    createdAt: "2026-01-01T08:00:00.000Z",
    updatedAt: "2026-01-01T08:00:00.000Z",
  },
  {
    id: "user_manager",
    name: "أحمد الفهد (مدير النظام)",
    email: "manager@atmta.test",
    password: "manager123",
    phone: "+966505554433",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    status: "active",
    roles: ["role_manager"],
    extraGrants: [],
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt: "2026-01-01T10:00:00.000Z",
  },
  {
    id: "user_vendor_admin",
    name: "سارة القحطاني (مسؤولة الموردين)",
    email: "vendors@atmta.test",
    password: "vendor123",
    phone: "+966559876543",
    photo:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=150&auto=format&fit=crop&q=80",
    status: "active",
    roles: ["role_employee"],
    extraGrants: [{ action: "export", subject: "vendors" }],
    createdAt: "2026-01-02T09:30:00.000Z",
    updatedAt: "2026-01-02T09:30:00.000Z",
  },
  {
    id: "user_read_only",
    name: "عمر الدوسري (مستعرض فقط)",
    email: "viewer@atmta.test",
    password: "viewer123",
    phone: "+966543210987",
    photo:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=150&auto=format&fit=crop&q=80",
    status: "active",
    roles: ["role_viewer"],
    extraGrants: [],
    createdAt: "2026-01-03T11:15:00.000Z",
    updatedAt: "2026-01-03T11:15:00.000Z",
  },
  {
    id: "user_no_vendors",
    name: "ريم الحربي (بدون موديول الموردين)",
    email: "novendor@atmta.test",
    password: "novendor123",
    phone: "+966561122334",
    photo:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=80",
    status: "active",
    roles: [],
    extraGrants: [
      { action: "read", subject: "categories" },
      { action: "create", subject: "categories" },
      { action: "update", subject: "categories" },
      { action: "delete", subject: "categories" },
    ],
    createdAt: "2026-01-04T14:00:00.000Z",
    updatedAt: "2026-01-04T14:00:00.000Z",
  },
];
