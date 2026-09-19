import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="from-primary/5 via-background to-background pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />
      <main className="relative z-10 flex w-full justify-center">{children}</main>
    </div>
  );
}
