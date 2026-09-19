import { CircleAlertIcon } from "lucide-react";

interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs"
    >
      <CircleAlertIcon className="size-4 shrink-0" />
      <span className="leading-relaxed font-normal">{message}</span>
    </div>
  );
}
