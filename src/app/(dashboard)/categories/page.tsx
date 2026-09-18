export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            التصنيفات
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            شجرة التصنيفات الهندسية والمعمارية
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
        <p className="text-xs text-muted-foreground">
          سيتم بناء شجرة التصنيفات في المرحلة القادمة (المرحلة 6).
        </p>
      </div>
    </div>
  );
}
