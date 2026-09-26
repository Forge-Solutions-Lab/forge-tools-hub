import React from "react";
import Link from "next/link";
import { Wrench, Users, ArrowRight, Terminal, GitPullRequest, ShieldCheck } from "lucide-react";
import { getAllTools } from "@/lib/mdx";
import { getContributors } from "@/lib/github";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentToolsSection } from "@/components/dashboard/RecentToolsSection";
import { ContributorGrid } from "@/components/dashboard/ContributorGrid";

export default async function DashboardPage() {
  const tools = getAllTools();
  const contributors = await getContributors();

  const recommendedCount = tools.filter((t) => t.frontmatter.status === "recommended").length;
  const mcpCount = tools.filter((t) => t.frontmatter.category === "MCP Server").length;

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative pt-2 pb-6 border-b border-[var(--border-color)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--success-indicator)] animate-pulse" />
              <span>Forge Solutions Lab • AI Knowledge Registry</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Engineering Superpowers for AI-Assisted Teams
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              แหล่งรวมเครื่องมือ AI Skills, Prompts, MCP Servers และ Workflow ที่ผ่านการทดสอบจริง เพื่อช่วยให้ทีมประหยัดเวลาและทำงานได้อย่างแม่นยำ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-[var(--text-inverted)] rounded-md transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Explore All Tools</span>
            </Link>
            <Link
              href="/tools#how-to-contribute"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded-md border border-[var(--border-color)] transition-colors"
            >
              <GitPullRequest className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span>Add Your Tool</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Catalog"
          value={tools.length}
          description="Curated tools & skills"
          icon={Wrench}
          trend="+5 new this week"
        />
        <StatsCard
          label="Production Ready"
          value={recommendedCount}
          description="Vetted by Forge team"
          icon={ShieldCheck}
          trend="100% verified"
        />
        <StatsCard
          label="MCP Servers"
          value={mcpCount}
          description="Local proof & tools"
          icon={Terminal}
        />
        <StatsCard
          label="Contributors"
          value={contributors.length}
          description="Active team members"
          icon={Users}
          trend="Git-driven"
        />
      </section>

      {/* Recent Tools Grid */}
      <RecentToolsSection tools={tools} />

      {/* Top Contributors Section */}
      <ContributorGrid contributors={contributors} />

      {/* Contribution Workflow Banner */}
      <section className="p-6 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-[var(--accent-color)]" />
              <span>วิธีเพิ่มเครื่องมือใหม่เข้าสู่คลังของทีม (Git & MDX Workflow)</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-2xl">
              เพียงแค่ fork หรือ clone repo, copy ไฟล์จาก <code className="px-1 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">content/tools/_template.mdx</code>, กรอกรายละเอียด Before/After และส่ง Pull Request เข้ามา
            </p>
          </div>
          <Link
            href="/tools#how-to-contribute"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--accent-color)] hover:text-[var(--accent-hover)] bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] rounded-md transition-colors shrink-0"
          >
            <span>Read Contribution Guide</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </div>
  );
}
