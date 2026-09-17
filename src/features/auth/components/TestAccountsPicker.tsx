import { SEED_USERS } from "@/mock/seed/users";
import { TruncatedText } from "@/components/ui/truncatedText";

interface TestAccountsPickerProps {
  onSelectAccount: (email: string, password: string) => void;
  disabled?: boolean;
}

export function TestAccountsPicker({
  onSelectAccount,
  disabled = false,
}: TestAccountsPickerProps) {
  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-border/60">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-xs font-medium text-foreground">
          حسابات تجريبية للاختبار السريع
        </span>
        <span className="text-[11px] font-normal text-muted-foreground">
          اضغط على أي حساب لتعبئة البيانات تلقائياً
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SEED_USERS.map((user) => (
          <button
            key={user.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectAccount(user.email, user.password)}
            className="flex flex-col items-start gap-1 rounded-lg border border-border/50 bg-secondary/30 p-2.5 text-start transition-colors hover:bg-secondary/70 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden"
          >
            <TruncatedText
              text={user.name}
              className="text-xs font-medium text-foreground w-full"
              side="top"
            />
            <TruncatedText
              text={user.email}
              className="text-[11px] font-mono text-muted-foreground w-full"
              side="bottom"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
