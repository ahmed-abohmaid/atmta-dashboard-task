import { Badge } from "@/components/ui/badge";
import { TruncatedText } from "@/components/ui/truncatedText";
import { SEED_ROLES } from "@/mock/seed/roles";
import { SEED_USERS } from "@/mock/seed/users";

interface TestAccountsPickerProps {
  onSelectAccount: (email: string, password: string) => void;
  disabled?: boolean;
}

export function TestAccountsPicker({ onSelectAccount, disabled = false }: TestAccountsPickerProps) {
  const roleMap = new Map(SEED_ROLES.map((r) => [r.id, r.name]));

  return (
    <div className="border-border/60 flex flex-col gap-3.5 border-t pt-5">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-foreground text-xs font-medium">حسابات تجريبية للاختبار السريع</span>
        <span className="text-muted-foreground text-[11px] font-normal">
          اضغط على أي حساب لتعبئة البيانات تلقائياً
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SEED_USERS.map((user) => {
          const roleLabel =
            user.roles.length > 0
              ? roleMap.get(user.roles[0]) || user.roles[0]
              : "مخصص (بدون موردين)";

          return (
            <button
              key={user.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectAccount(user.email, user.password)}
              className="group border-border/50 bg-secondary/25 hover:bg-secondary/60 focus-visible:ring-ring flex cursor-pointer flex-col items-start gap-1.5 overflow-hidden rounded-xl border p-3 text-start transition-colors duration-150 focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            >
              <div className="flex w-full items-center justify-between gap-1">
                <TruncatedText
                  text={user.name}
                  className="text-foreground group-hover:text-primary flex-1 text-xs font-medium transition-colors"
                  side="top"
                />
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary bg-primary/5 h-4 shrink-0 px-1.5 py-0 text-[10px] font-normal"
                >
                  {roleLabel}
                </Badge>
              </div>
              <TruncatedText
                text={user.email}
                className="text-muted-foreground w-full font-mono text-[11px]"
                side="bottom"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
