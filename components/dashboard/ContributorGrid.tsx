import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, GitCommit, ArrowUpRight, Github, ShieldCheck } from "lucide-react";
import { type Contributor } from "@/lib/github";

interface ContributorGridProps {
  contributors: Contributor[];
  showLinkToAll?: boolean;
}

export const ContributorGrid: React.FC<ContributorGridProps> = ({
  contributors,
  showLinkToAll = true,
}) => {
  return (
    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[var(--accent-color)]" />
          <h3 className="text-sm font-medium text-[var(--text-primary)]">
            Forge Solutions Lab Core Team
          </h3>
        </div>
        {showLinkToAll && (
          <Link
            href="/contributors"
            className="text-xs font-mono text-[var(--accent-color)] hover:text-[var(--accent-hover)] flex items-center gap-1"
          >
            <span>View Full Roster</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {contributors.map((c) => (
          <div
            key={c.id}
            className="flex flex-col justify-between p-3.5 rounded-md bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] relative shrink-0">
                  <Image
                    src={c.avatar_url}
                    alt={c.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {c.ruCode && (
                  <span className="text-[10px] font-mono text-[var(--accent-text)] bg-[var(--accent-subtle)] px-1.5 py-0.5 rounded border border-[var(--border-color)]">
                    {c.ruCode}
                  </span>
                )}
              </div>

              <div className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors truncate">
                {c.name}
              </div>
              <div className="text-[11px] text-[var(--text-dim)] truncate mt-0.5">{c.role}</div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)]">
              {c.contributions > 0 ? (
                <span className="flex items-center gap-1 text-[var(--success-text)] font-medium">
                  <GitCommit className="w-3 h-3 text-[var(--success-indicator)]" />
                  {c.contributions} commits
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[var(--text-dim)]">
                  <ShieldCheck className="w-3 h-3 text-[var(--text-dim)]" />
                  Member
                </span>
              )}

              <a
                href={c.html_url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors p-1"
                title={`GitHub: @${c.login}`}
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
