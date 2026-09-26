import React from "react";
import Link from "next/link";
import { BeforeAfter, Before, After } from "./BeforeAfterBlock";
import { QuickInstall } from "./QuickInstall";
import { TagBadge } from "./TagBadge";
import { ExternalLink } from "lucide-react";

export const MDXCustomComponents = {
  BeforeAfter,
  Before,
  After,
  QuickInstall,
  TagBadge,
  h2: ({ children, ...props }: any) => (
    <h2
      className="text-lg font-semibold text-[var(--text-primary)] tracking-tight mt-8 mb-3 pb-2 border-b border-[var(--border-color)] flex items-center gap-2"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3
      className="text-sm font-semibold text-[var(--text-primary)] tracking-tight mt-6 mb-2"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)] mb-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside space-y-1.5 text-sm text-[var(--text-secondary)] mb-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-sm text-[var(--text-secondary)] leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({ href = "", children, ...props }: any) => {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[var(--accent-color)] hover:text-[var(--accent-hover)] hover:underline font-mono text-xs"
          {...props}
        >
          <span>{children}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
    }
    return (
      <Link href={href} className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] hover:underline" {...props}>
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-2 border-[var(--accent-color)] pl-4 py-1 my-4 bg-[var(--accent-subtle)] text-[var(--text-muted)] italic text-sm"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code
      className="px-1.5 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre
      className="p-4 my-4 rounded-lg bg-[var(--code-pre-bg)] border border-[var(--border-color)] overflow-x-auto text-xs font-mono text-[var(--code-text)] leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-6 border border-[var(--border-color)] rounded-lg">
      <table className="w-full text-left text-xs font-mono text-[var(--text-secondary)]" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] border-b border-[var(--border-color)]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-4 py-2.5 font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-4 py-2.5 border-b border-[var(--border-subtle)]" {...props}>
      {children}
    </td>
  ),
};
