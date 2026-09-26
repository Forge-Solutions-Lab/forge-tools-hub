import React from "react";
import Link from "next/link";
import {
  GitCommit,
  Trophy,
  Sparkles,
  ArrowRight,
  Building2,
} from "lucide-react";
import { getContributors } from "@/lib/github";
import { ContributorsRoster } from "@/components/contributors/ContributorsRoster";
import { ActivityHeatmap } from "@/components/contributors/ActivityHeatmap";

export const metadata = {
  title: "Team Contributors & Activity | Forge Tools Hub",
  description: "GitHub contributions, tool authors, and activity metrics for Forge Solutions Lab.",
};

export default async function ContributorsPage() {
  const contributors = await getContributors();
  
  // Aggregate all real commits from all members
  const allCommits = contributors.flatMap((c) => c.recentCommits || []);
  const totalContributions = contributors.reduce((acc, c) => acc + c.contributions, 0);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
          <Building2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
          <span>Forge Solutions Lab • Engineering Talent Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Team Roster &amp; Contribution Activity
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl">
          บุคลากรหลักและวิศวกรผู้พัฒนา AI Tools, MCP Servers และ Workflow อัตโนมัติสำหรับองค์กร
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]">
          <div className="text-xs font-mono text-[var(--text-dim)] uppercase">Team Members</div>
          <div className="text-2xl font-bold font-mono text-[var(--text-primary)] mt-1">{contributors.length} Engineers</div>
          <div className="text-[11px] text-[var(--success-text)] font-mono mt-1">Full Cluster TR-01</div>
        </div>
        <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]">
          <div className="text-xs font-mono text-[var(--text-dim)] uppercase">Total Contributions</div>
          <div className="text-2xl font-bold font-mono text-[var(--text-primary)] mt-1">{totalContributions}</div>
          <div className="text-[11px] text-[var(--accent-text)] font-mono mt-1">Commits in Forge-Solutions-Lab</div>
        </div>
        <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]">
          <div className="text-xs font-mono text-[var(--text-dim)] uppercase">Organization Sync</div>
          <div className="text-2xl font-bold font-mono text-[var(--success-indicator)] mt-1">Verified</div>
          <div className="text-[11px] text-[var(--text-dim)] font-mono mt-1">Forge-Solutions-Lab.github.io</div>
        </div>
      </div>

      {/* Interactive Team Roster */}
      <ContributorsRoster contributors={contributors} />

      {/* Contribution Activity Heatmap with full Axis Labels */}
      <ActivityHeatmap commits={allCommits} />

      {/* Call to action */}
      <div className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-center space-y-3">
        <Sparkles className="w-6 h-6 text-[var(--accent-color)] mx-auto" />
        <h3 className="text-base font-semibold text-[var(--text-primary)]">
          Want to add a new AI Tool to the Hub?
        </h3>
        <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
          เพิ่มเครื่องมือ AI ที่คุณใช้เป็นประจำ ไม่ว่าจะเป็น Prompt เทพๆ หรือ MCP server ที่ช่วยให้งานเสร็จไวขึ้น
        </p>
        <Link
          href="/tools#how-to-contribute"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-[var(--text-inverted)] rounded-md transition-colors"
        >
          <span>Submit Your Tool (MDX)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
