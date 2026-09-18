import Link from "next/link";
import { FileQuestionIcon, HomeIcon } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 animate-in fade-in-50 duration-200">
      <div className="relative flex w-full max-w-md flex-col items-center rounded-2xl border border-border/60 bg-card/50 p-8 text-center backdrop-blur-xs sm:p-10 shadow-xs">
        <div className="relative mb-5 flex size-16 items-center justify-center rounded-2xl border border-border/80 bg-secondary/30">
          <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground border border-border/50">
            <FileQuestionIcon className="size-5.5 stroke-[1.8]" />
          </div>
        </div>

        <h2 className="mb-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          عفواً، الصفحة غير موجودة
        </h2>

        <p className="mb-6 text-xs leading-relaxed text-muted-foreground max-w-sm text-balance">
          لم نتمكن من العثور على الصفحة التي تبحث عنها. قد يكون تم نقلها أو
          حذفها أو أن الرابط غير صحيح.
        </p>

        <Link
          href="/"
          className="inline-flex h-8.5 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <HomeIcon className="size-3.5" />
          <span>العودة للرئيسية</span>
        </Link>
      </div>
    </div>
  );
}
