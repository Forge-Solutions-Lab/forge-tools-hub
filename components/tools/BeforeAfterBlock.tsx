"use client";

import React, { ReactNode } from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  children?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  className?: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ children, before, after, className }) => {
  return (
    <div className={cn("my-6 grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {before && <Before>{before}</Before>}
      {after && <After>{after}</After>}
      {children}
    </div>
  );
};

export const Before: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative p-4 rounded-lg bg-[var(--before-bg)] border border-[var(--before-border)] text-[var(--before-text)] text-sm leading-relaxed",
        className
      )}
    >
      <div className="flex items-center space-x-2 mb-2.5 pb-2 border-b border-[var(--before-header-border)]">
        <XCircle className="w-4 h-4 text-[var(--error-text)] shrink-0" />
        <span className="text-xs font-mono font-medium tracking-wider uppercase text-[var(--before-badge-text)]">
          Before (Pain Points)
        </span>
      </div>
      <div className="prose-sm text-[var(--before-text)] space-y-2">{children}</div>
    </div>
  );
};

export const After: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative p-4 rounded-lg bg-[var(--after-bg)] border border-[var(--after-border)] text-[var(--after-text)] text-sm leading-relaxed",
        className
      )}
    >
      <div className="flex items-center space-x-2 mb-2.5 pb-2 border-b border-[var(--after-header-border)]">
        <CheckCircle2 className="w-4 h-4 text-[var(--success-indicator)] shrink-0" />
        <span className="text-xs font-mono font-medium tracking-wider uppercase text-[var(--after-badge-text)]">
          After (Superpowers with Tool)
        </span>
      </div>
      <div className="prose-sm text-[var(--after-text)] space-y-2">{children}</div>
    </div>
  );
};
