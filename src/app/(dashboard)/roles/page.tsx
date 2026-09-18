export default function RolesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            الأدوار والصلاحيات
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            إدارة الأدوار ومجموعات الصلاحيات
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
        <p className="text-xs text-muted-foreground">
          سيتم بناء إدارة الأدوار في المرحلة القادمة (المرحلة 5).
        </p>
      </div>
    </div>
  );
}
