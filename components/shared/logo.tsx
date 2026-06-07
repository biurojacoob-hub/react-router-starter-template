import { PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: "default" | "light";
}

export function Logo({ className, iconOnly = false, variant = "default" }: LogoProps) {
  const isLight = variant === "light";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-lg shadow-sky-500/25">
        <PiggyBank className="h-5 w-5 text-white" />
      </div>
      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={cn("text-sm font-bold", isLight ? "text-white" : "text-foreground")}>
            Family Finance
          </span>
          <span className={cn("text-xs font-semibold", isLight ? "text-sky-200" : "text-primary")}>
            Academy
          </span>
        </div>
      )}
    </div>
  );
}
