import { CircleAlertIcon } from "lucide-react";

interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-center gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-xs text-destructive"
    >
      <CircleAlertIcon className="size-4 shrink-0" />
      <span className="font-normal leading-relaxed">{message}</span>
    </div>
  );
}
