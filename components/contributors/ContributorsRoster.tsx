"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Github,
  GitCommit,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Trophy,
  ArrowDownWideNarrow,
  SlidersHorizontal,
} from "lucide-react";
import { type Contributor } from "@/lib/github";
import { CommitHistoryModal } from "./CommitHistoryModal";
import { cn } from "@/lib/utils";

interface ContributorsRosterProps {
  contributors: Contributor[];
}

type SortMode = "commits-desc" | "ru-order";

export const ContributorsRoster: React.FC<ContributorsRosterProps> = ({
  contributors,
}) => {
  const [academicMode, setAcademicMode] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("commits-desc");
  const [inspectingMember, setInspectingMember] = useState<Contributor | null>(null);

  // Sort contributors (Default: Most commits to least)
  const sortedContributors = useMemo(() => {
    const list = [...contributors];
    if (sortMode === "commits-desc") {
      return list.sort((a, b) => {
        if (b.contributions !== a.contributions) {
          return b.contributions - a.contributions;
        }
        return a.ruCode.localeCompare(b.ruCode);
      });
    } else {
      return list.sort((a, b) => a.ruCode.localeCompare(b.ruCode));
    }
  }, [contributors, sortMode]);

  // Compute Rank mapping based on commit count
  const rankMap = useMemo(() => {
    const sortedByCommits = [...contributors].sort((a, b) => {
      if (b.contributions !== a.contributions) {
        return b.contributions - a.contributions;
      }
      return a.ruCode.localeCompare(b.ruCode);
    });
    const map = new Map<number, number>();
    sortedByCommits.forEach((c, index) => {
      map.set(c.id, index + 1);
    });
    return map;
  }, [contributors]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/30">
          <Trophy className="w-3 h-3 text-amber-500" />
          <span>#1 Top Contributor</span>
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 border border-slate-500/30">
          <span>#2 Rank</span>
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
          <span>#3 Rank</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--bg-surface-subtle)] text-[var(--text-dim)] border border-[var(--border-color)]">
        <span>#{rank} Rank</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase font-mono tracking-wider flex items-center gap-2">
            <span>Engineering Leadership &amp; Contributions</span>
            <span className="text-[10px] text-[var(--accent-text)] bg-[var(--accent-subtle)] px-2 py-0.5 rounded border border-[var(--border-color)]">
              Forge Solutions Lab
            </span>
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            จัดอันดับตามจำนวน Commit จริงภายในองค์กร Forge Solutions Lab (มาก ➔ น้อย)
          </p>
        </div>

        {/* Action Controls (Sort Switcher + Academic View Toggle) */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Sort Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-subtle)] text-xs font-mono">
            <button
              onClick={() => setSortMode("commits-desc")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer",
                sortMode === "commits-desc"
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-sm border border-[var(--border-color)]"
                  : "text-[var(--text-dim)] hover:text-[var(--text-muted)]"
              )}
              title="เรียงตามจำนวน Commit (มากไปน้อย)"
            >
              <ArrowDownWideNarrow className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span>Ranked by Commits</span>
            </button>
            <button
              onClick={() => setSortMode("ru-order")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer",
                sortMode === "ru-order"
                  ? "bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-sm border border-[var(--border-color)]"
                  : "text-[var(--text-dim)] hover:text-[var(--text-muted)]"
              )}
              title="เรียงตามรหัส RU"
            >
              <SlidersHorizontal className="w-3 h-3 text-[var(--text-dim)]" />
              <span>RU Order</span>
            </button>
          </div>

          {/* Academic View Mode Toggle Button */}
          <button
            onClick={() => setAcademicMode(!academicMode)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono text-xs transition-all border shrink-0 cursor-pointer",
              academicMode
                ? "bg-[var(--accent-subtle)] text-[var(--accent-text)] border-[var(--accent-color)] font-semibold shadow-sm"
                : "bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
            )}
            title="สลับโหมดเพื่อแสดงรหัสนักศึกษา (Student IDs)"
          >
            <GraduationCap
              className={cn(
                "w-3.5 h-3.5",
                academicMode
                  ? "text-[var(--accent-color)]"
                  : "text-[var(--text-dim)]"
              )}
            />
            <span>{academicMode ? "Academic View: ON" : "Academic View (Student IDs)"}</span>
            <span
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                academicMode
                  ? "bg-[var(--accent-color)] animate-pulse"
                  : "bg-[var(--text-dim)]"
              )}
            />
          </button>
        </div>
      </div>

      {/* Roster Cards Sorted by Rank */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedContributors.map((c) => {
          const rank = rankMap.get(c.id) || 1;

          return (
            <div
              key={c.id}
              className={cn(
                "flex flex-col justify-between p-4 sm:p-5 rounded-xl border bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-all group relative",
                rank === 1
                  ? "border-[var(--accent-color)]/50 shadow-sm"
                  : "border-[var(--border-color)]"
              )}
            >
              <div>
                {/* Header: Identity on Left, Commits Badge & GitHub Button on Right */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] relative shrink-0">
                      <Image
                        src={c.avatar_url}
                        alt={c.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {getRankBadge(rank)}

                        <span className="font-mono text-xs font-bold text-[var(--accent-text)] bg-[var(--accent-subtle)] px-1.5 py-0.5 rounded border border-[var(--border-color)]">
                          {c.ruCode}
                        </span>

                        <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors">
                          {c.name}
                        </h3>
                      </div>

                      <div className="text-xs text-[var(--text-muted)] font-medium mt-1">
                        {c.role}
                      </div>
                      <p className="text-[11px] font-mono text-[var(--text-dim)] mt-0.5">
                        {c.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Right Top Header: Interactive Commits in Org Badge + GitHub Profile */}
                  <div className="flex items-center gap-2 shrink-0">
                    {c.contributions > 0 ? (
                      <button
                        onClick={() => setInspectingMember(c)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)] shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-transform cursor-pointer"
                        title="คลิกเพื่อดูประวัติ Commit ทั้งหมดในองค์กร"
                      >
                        <GitCommit className="w-3.5 h-3.5 text-[var(--success-indicator)] animate-pulse" />
                        <span>{c.contributions} Commits</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono bg-[var(--bg-surface-subtle)] text-[var(--text-dim)] border border-[var(--border-color)]">
                        <ShieldCheck className="w-3 h-3 text-[var(--text-dim)]" />
                        <span>Core Member</span>
                      </span>
                    )}

                    <a
                      href={c.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-md bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] hover:border-[var(--border-hover)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      title={`GitHub: @${c.login}`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Academic Student ID Banner (Only when toggled) */}
                {academicMode && c.studentId && (
                  <div className="mt-3 p-2 rounded bg-[var(--warning-bg)] border border-[var(--warning-border)] text-xs font-mono text-[var(--warning-text)] flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>
                      Student ID: <strong>{c.studentId}</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Clean Footer Link & Details Action */}
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-dim)]">
                {c.contributions > 0 ? (
                  <button
                    onClick={() => setInspectingMember(c)}
                    className="flex items-center gap-1 text-[var(--accent-text)] hover:underline cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                    <span>View Org Commits &amp; Diff</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-[var(--text-dim)]">
                    Leadership Governance
                  </span>
                )}

                <span className="text-[11px] text-[var(--text-dim)]">
                  Sync 1h interval
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for detailed commit inspection */}
      <CommitHistoryModal
        contributor={inspectingMember}
        onClose={() => setInspectingMember(null)}
      />
    </div>
  );
};
