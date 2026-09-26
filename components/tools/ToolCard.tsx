import React from "react";
import Link from "next/link";
import { ArrowUpRight, User, Sparkles } from "lucide-react";
import { type ToolItem } from "@/lib/schema";
import { TagBadge } from "./TagBadge";

interface ToolCardProps {
  tool: ToolItem;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { slug, frontmatter } = tool;

  return (
    <Link
      href={`/tools/${slug}`}
      className="group relative flex flex-col justify-between p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] hover:border-[var(--accent-color)] transition-all duration-200"
    >
      <div>
        {/* Header: Category + Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <TagBadge label={frontmatter.category} variant="category" />
          <div className="flex items-center gap-1.5">
            <TagBadge
              label={frontmatter.status}
              variant="status"
              statusType={frontmatter.status}
            />
            {frontmatter.featured && (
              <span className="flex items-center gap-1 text-[10px] font-mono text-[var(--warning-text)] bg-[var(--warning-bg)] border border-[var(--warning-border)] px-1.5 py-0.5 rounded">
                <Sparkles className="w-2.5 h-2.5 shrink-0" />
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors flex items-center justify-between">
          <span>{frontmatter.title}</span>
          <ArrowUpRight className="w-4 h-4 text-[var(--text-dim)] group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
          {frontmatter.description}
        </p>

        {/* Works with Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {frontmatter.works_with.slice(0, 3).map((ide) => (
            <TagBadge key={ide} label={ide} variant="ide" />
          ))}
          {frontmatter.works_with.length > 3 && (
            <span className="text-[10px] font-mono text-[var(--text-dim)] self-center">
              +{frontmatter.works_with.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer info: Contributor + Difficulty */}
      <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)]">
        <div className="flex items-center gap-1.5">
          <User className="w-3 h-3 text-[var(--text-dim)]" />
          <span>{frontmatter.added_by}</span>
        </div>
        <div className="flex items-center gap-2">
          <TagBadge
            label={frontmatter.install_difficulty}
            variant="difficulty"
            difficultyType={frontmatter.install_difficulty}
          />
        </div>
      </div>
    </Link>
  );
};
