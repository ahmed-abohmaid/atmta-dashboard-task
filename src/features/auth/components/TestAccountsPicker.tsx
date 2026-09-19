import { SEED_USERS } from "@/mock/seed/users";
import { SEED_ROLES } from "@/mock/seed/roles";
import { TruncatedText } from "@/components/ui/truncatedText";
import { Badge } from "@/components/ui/badge";

interface TestAccountsPickerProps {
  onSelectAccount: (email: string, password: string) => void;
  disabled?: boolean;
}

export function TestAccountsPicker({
  onSelectAccount,
  disabled = false,
}: TestAccountsPickerProps) {
  const roleMap = new Map(SEED_ROLES.map((r) => [r.id, r.name]));

  return (
    <div className="flex flex-col gap-3.5 pt-5 border-t border-border/60">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-xs font-medium text-foreground">
          حسابات تجريبية للاختبار السريع
        </span>
        <span className="text-[11px] font-normal text-muted-foreground">
          اضغط على أي حساب لتعبئة البيانات تلقائياً
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
              className="group flex flex-col items-start gap-1.5 rounded-xl border border-border/50 bg-secondary/25 p-3 text-start transition-colors duration-150 hover:bg-secondary/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden"
            >
              <div className="flex items-center justify-between w-full gap-1">
                <TruncatedText
                  text={user.name}
                  className="text-xs font-medium text-foreground group-hover:text-primary transition-colors flex-1"
                  side="top"
                />
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 h-4 shrink-0 font-normal border-primary/30 text-primary bg-primary/5"
                >
                  {roleLabel}
                </Badge>
              </div>
              <TruncatedText
                text={user.email}
                className="text-[11px] font-mono text-muted-foreground w-full"
                side="bottom"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
