export default function VendorsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            الموردون
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            قائمة المقاولين والموردين المعتمدين
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
        <p className="text-xs text-muted-foreground">
          سيتم بناء إدارة الموردين في المرحلة القادمة (المرحلة 7).
        </p>
      </div>
    </div>
  );
}
