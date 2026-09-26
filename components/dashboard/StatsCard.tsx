import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  description,
  icon: Icon,
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        "p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-center justify-between text-[var(--text-dim)]">
        <span className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)]">{label}</span>
        <Icon className="w-4 h-4 text-[var(--accent-color)]" />
      </div>
      <div className="my-3">
        <div className="text-2xl font-bold tracking-tight text-[var(--text-primary)] font-mono">{value}</div>
        <p className="text-xs text-[var(--text-dim)] mt-1">{description}</p>
      </div>
      {trend && (
        <div className="text-[11px] font-mono text-[var(--success-text)] flex items-center gap-1">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};
