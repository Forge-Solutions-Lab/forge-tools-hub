"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickInstallProps {
  command?: string;
  config?: string;
  title?: string;
  type?: "cli" | "json" | "env";
  className?: string;
}

export const QuickInstall: React.FC<QuickInstallProps> = ({
  command,
  config,
  title = "Quick Install & Config",
  type = "cli",
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const textToCopy = command || config || "";

  const handleCopy = async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className={cn("my-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--code-header-bg)] border-b border-[var(--border-color)]">
        <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)]">
          {type === "cli" ? <Terminal className="w-3.5 h-3.5 text-[var(--accent-color)]" /> : <Code2 className="w-3.5 h-3.5 text-[var(--success-indicator)]" />}
          <span className="font-medium text-[var(--code-text)]">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] rounded border border-[var(--border-color)] transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[var(--success-indicator)]" />
              <span className="text-[var(--success-text)]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 bg-[var(--code-pre-bg)] overflow-x-auto">
        <pre className="text-xs font-mono text-[var(--code-text)] leading-relaxed whitespace-pre font-normal">
          <code>{textToCopy}</code>
        </pre>
      </div>
    </div>
  );
};
