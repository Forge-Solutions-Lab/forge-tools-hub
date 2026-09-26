import React from "react";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  label: string;
  variant?: "default" | "category" | "status" | "difficulty" | "ide";
  statusType?: "recommended" | "experimental" | "archived";
  difficultyType?: "easy" | "medium" | "hard";
  className?: string;
  onClick?: () => void;
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  label,
  variant = "default",
  statusType,
  difficultyType,
  className,
  onClick,
}) => {
  let styleClasses = "bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--border-hover)]";

  if (variant === "category") {
    styleClasses = "bg-[var(--category-bg)] text-[var(--category-text)] border-[var(--category-border)]";
  } else if (variant === "status") {
    if (statusType === "recommended") {
      styleClasses = "bg-[var(--success-bg)] text-[var(--success-text)] border-[var(--success-border)]";
    } else if (statusType === "experimental") {
      styleClasses = "bg-[var(--warning-bg)] text-[var(--warning-text)] border-[var(--warning-border)]";
    } else {
      styleClasses = "bg-[var(--bg-surface-subtle)] text-[var(--text-dim)] border-[var(--border-color)]";
    }
  } else if (variant === "difficulty") {
    if (difficultyType === "easy") {
      styleClasses = "bg-[var(--success-bg)] text-[var(--success-text)] border-[var(--success-border)]";
    } else if (difficultyType === "medium") {
      styleClasses = "bg-[var(--warning-bg)] text-[var(--warning-text)] border-[var(--warning-border)]";
    } else {
      styleClasses = "bg-[var(--error-bg)] text-[var(--error-text)] border-[var(--error-border)]";
    }
  } else if (variant === "ide") {
    styleClasses = "bg-[var(--ide-bg)] text-[var(--ide-text)] border-[var(--ide-border)]";
  }

  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-mono rounded border transition-colors",
        onClick && "cursor-pointer hover:opacity-80",
        styleClasses,
        className
      )}
    >
      {variant === "status" && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5 inline-block shrink-0",
            statusType === "recommended" && "bg-[var(--success-indicator)]",
            statusType === "experimental" && "bg-[var(--warning-indicator)]",
            statusType === "archived" && "bg-[var(--text-dim)]"
          )}
        />
      )}
      {label}
    </span>
  );
};
