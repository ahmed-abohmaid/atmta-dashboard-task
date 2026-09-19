export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-xl font-bold tracking-tight">المستخدمون</h1>
          <p className="text-muted-foreground mt-1 text-xs">إدارة الحسابات وتحديد مستويات الوصول</p>
        </div>
      </div>
      <div className="border-border/80 bg-card rounded-xl border p-6 shadow-xs">
        <p className="text-muted-foreground text-xs">
          سيتم بناء إدارة المستخدمين في المرحلة القادمة (المرحلة 4).
        </p>
      </div>
    </div>
  );
}
