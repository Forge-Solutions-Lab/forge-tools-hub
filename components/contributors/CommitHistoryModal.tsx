"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  GitCommit,
  ArrowUpRight,
  Copy,
  Check,
  FolderGit2,
  Calendar,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { type Contributor, type OrgCommitDetail } from "@/lib/github";
import { cn } from "@/lib/utils";

interface CommitHistoryModalProps {
  contributor: Contributor | null;
  onClose: () => void;
}

export const CommitHistoryModal: React.FC<CommitHistoryModalProps> = ({
  contributor,
  onClose,
}) => {
  const [selectedRepo, setSelectedRepo] = useState<string>("ALL");
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (contributor) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contributor, onClose]);

  // Reset filter when contributor changes
  useEffect(() => {
    setSelectedRepo("ALL");
    setCopiedSha(null);
  }, [contributor]);

  const commits = contributor?.recentCommits || [];

  // Group & count repos
  const repoStats = useMemo(() => {
    const counts: Record<string, number> = {};
    commits.forEach((c) => {
      counts[c.repo] = (counts[c.repo] || 0) + 1;
    });
    return counts;
  }, [commits]);

  const uniqueRepos = Object.keys(repoStats);

  // Filter commits
  const filteredCommits = useMemo(() => {
    if (selectedRepo === "ALL") return commits;
    return commits.filter((c) => c.repo === selectedRepo);
  }, [commits, selectedRepo]);

  const handleCopySha = (sha: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => {
      setCopiedSha(null);
    }, 2000);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  if (!contributor) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-color)] bg-[var(--bg-surface-elevated)] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] relative shrink-0">
              <Image
                src={contributor.avatar_url}
                alt={contributor.name}
                width={48}
                height={48}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[var(--accent-text)] bg-[var(--accent-subtle)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                  {contributor.ruCode}
                </span>
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  {contributor.name}
                </h2>
                <span className="text-xs font-mono text-[var(--text-dim)]">
                  (@{contributor.login})
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {contributor.role} •{" "}
                <span className="font-mono text-[var(--text-dim)]">
                  {contributor.specialty}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] transition-colors border border-transparent hover:border-[var(--border-color)]"
            title="ปิดหน้าต่าง (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header Stats & Repository Filter Pills */}
        <div className="px-4 sm:px-5 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-[var(--success-indicator)]" />
            <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
              {contributor.contributions}{" "}
              {contributor.contributions === 1 ? "Commit" : "Commits"} in{" "}
              <a
                href="https://github.com/Forge-Solutions-Lab"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent-text)] hover:underline inline-flex items-center gap-0.5"
              >
                Forge-Solutions-Lab
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </span>
          </div>

          {/* Repo Filter Pills */}
          {uniqueRepos.length > 1 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSelectedRepo("ALL")}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-mono transition-all border",
                  selectedRepo === "ALL"
                    ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)] font-semibold shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--border-hover)]"
                )}
              >
                All ({commits.length})
              </button>
              {uniqueRepos.map((repo) => (
                <button
                  key={repo}
                  onClick={() => setSelectedRepo(repo)}
                  className={cn(
                    "px-2.5 py-1 rounded text-[11px] font-mono transition-all border",
                    selectedRepo === repo
                      ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)] font-semibold shadow-sm"
                      : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--border-hover)]"
                  )}
                >
                  {repo} ({repoStats[repo]})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Commit Timeline Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {filteredCommits.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-lg border border-dashed border-[var(--border-color)] bg-[var(--bg-surface-subtle)]">
              <ShieldAlert className="w-8 h-8 text-[var(--text-dim)] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                ยังไม่มีข้อมูล Commit ใน Repository สาธารณะ
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
                สมาชิกท่านนี้มีบทบาทด้านการบริหารหรือกำลังอยู่ระหว่างการพัฒนาโปรเจกต์ใหม่ในองค์กร
              </p>
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--border-color)]">
              {filteredCommits.map((commit, idx) => (
                <div key={commit.sha || idx} className="relative group">
                  {/* Timeline Dot Node */}
                  <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent-color)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
                  </div>

                  {/* Commit Card */}
                  <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] hover:border-[var(--border-hover)] transition-all space-y-2.5">
                    {/* Repo & Date Header */}
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                      <div className="flex items-center gap-1.5">
                        <FolderGit2 className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                        <span className="font-mono font-semibold text-[var(--accent-text)] bg-[var(--accent-subtle)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                          {commit.repo}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-dim)]">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(commit.date)}</span>
                      </div>
                    </div>

                    {/* Commit Message */}
                    <p className="text-xs font-mono font-medium text-[var(--text-primary)] leading-relaxed break-words bg-[var(--bg-surface)] p-2.5 rounded border border-[var(--border-subtle)]">
                      {commit.message}
                    </p>

                    {/* Commit Actions (SHA Copy & GitHub Diff link) */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={(e) => handleCopySha(commit.sha, e)}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)] hover:text-[var(--text-primary)] transition-colors"
                        title="คัดลอก Full Commit SHA"
                      >
                        {copiedSha === commit.sha ? (
                          <>
                            <Check className="w-3 h-3 text-[var(--success-indicator)]" />
                            <span className="text-[var(--success-text)] font-semibold">
                              Copied SHA!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-[var(--text-dim)]" />
                            <span>{commit.shortSha}</span>
                          </>
                        )}
                      </button>

                      <a
                        href={commit.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono text-[var(--accent-text)] hover:text-[var(--accent-color)] hover:bg-[var(--accent-subtle)] transition-colors"
                      >
                        <span>Inspect Diff</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-surface-elevated)] flex items-center justify-between text-xs font-mono text-[var(--text-dim)]">
          <span>Realtime Commit Stream via GitHub API</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
