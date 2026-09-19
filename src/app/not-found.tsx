import Link from "next/link";
import { FileQuestionIcon, HomeIcon } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="animate-in fade-in-50 flex min-h-screen items-center justify-center p-6 duration-200">
      <div className="border-border/60 bg-card/50 relative flex w-full max-w-md flex-col items-center rounded-2xl border p-8 text-center shadow-xs backdrop-blur-xs sm:p-10">
        <div className="border-border/80 bg-secondary/30 relative mb-5 flex size-16 items-center justify-center rounded-2xl border">
          <div className="bg-secondary text-muted-foreground border-border/50 flex size-11 items-center justify-center rounded-xl border">
            <FileQuestionIcon className="size-5.5 stroke-[1.8]" />
          </div>
        </div>

        <h2 className="text-foreground mb-2 text-lg font-semibold tracking-tight sm:text-xl">
          عفواً، الصفحة غير موجودة
        </h2>

        <p className="text-muted-foreground mb-6 max-w-sm text-xs leading-relaxed text-balance">
          لم نتمكن من العثور على الصفحة التي تبحث عنها. قد يكون تم نقلها أو حذفها أو أن الرابط غير
          صحيح.
        </p>

        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8.5 items-center justify-center gap-2 rounded-lg px-4 text-xs font-medium transition-colors"
        >
          <HomeIcon className="size-3.5" />
          <span>العودة للرئيسية</span>
        </Link>
      </div>
    </div>
  );
}
