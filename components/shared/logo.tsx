import { PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-lg shadow-sky-500/25">
        <PiggyBank className="h-5 w-5 text-white" />
      </div>
      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold text-foreground">Family Finance</span>
          <span className="text-xs font-semibold text-primary">Academy</span>
        </div>
      )}
    </div>
  );
}
