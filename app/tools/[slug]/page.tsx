import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getToolBySlug,
  getToolSlugs,
  getAllTools,
} from "@/lib/mdx";
import { MDXCustomComponents } from "@/components/tools/MDXComponents";
import { TagBadge } from "@/components/tools/TagBadge";
import { ToolCard } from "@/components/tools/ToolCard";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Clock,
} from "lucide-react";

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | Forge Tools Hub",
    };
  }

  return {
    title: `${tool.frontmatter.title} | Forge Tools Hub`,
    description: tool.frontmatter.description,
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const { frontmatter, content } = tool;
  const allTools = getAllTools();
  const relatedTools = allTools
    .filter((t) => t.slug !== slug && t.frontmatter.category === frontmatter.category)
    .slice(0, 3);

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-dim)]">
        <Link
          href="/tools"
          className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>
        <div className="flex items-center gap-2">
          <span>tools / {slug}</span>
        </div>
      </div>

      {/* Hero Header Strip */}
      <div className="pb-8 border-b border-[var(--border-color)] space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <TagBadge label={frontmatter.category} variant="category" />
          <TagBadge
            label={frontmatter.status}
            variant="status"
            statusType={frontmatter.status}
          />
          <TagBadge
            label={frontmatter.install_difficulty}
            variant="difficulty"
            difficultyType={frontmatter.install_difficulty}
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          {frontmatter.title}
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-3xl">
          {frontmatter.description}
        </p>

        {/* Compatibility Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[var(--text-dim)] mr-1">Works With:</span>
          {frontmatter.works_with.map((ide) => (
            <TagBadge key={ide} label={ide} variant="ide" />
          ))}
        </div>

        {/* Metadata Strip & Actions */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--text-dim)] border-t border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span>Added by: <strong className="text-[var(--text-primary)]">{frontmatter.added_by}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(frontmatter.added_date)}</span>
            </div>
            {frontmatter.read_time && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{frontmatter.read_time}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {frontmatter.github_url && (
              <a
                href={frontmatter.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {frontmatter.source_url && (
              <a
                href={frontmatter.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--accent-text)] border border-[var(--border-color)] transition-colors"
              >
                <span>Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main MDX Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="prose max-w-none text-[var(--text-secondary)] leading-relaxed">
            <MDXRemote source={content} components={MDXCustomComponents} />
          </div>
        </div>

        {/* Right Info Column */}
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3 text-xs">
            <div className="font-mono font-medium text-[var(--text-primary)] pb-2 border-b border-[var(--border-subtle)]">
              Readiness & Quality
            </div>
            <div className="space-y-2 font-mono text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <span className="text-[var(--success-text)] uppercase">{frontmatter.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Setup:</span>
                <span className="text-[var(--text-primary)] uppercase">{frontmatter.install_difficulty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Security:</span>
                <span className="text-[var(--accent-text)]">Local / Sandboxed</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2 text-xs">
            <div className="font-mono font-medium text-[var(--text-primary)]">Tags</div>
            <div className="flex flex-wrap gap-1">
              {frontmatter.tags.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="pt-10 border-t border-[var(--border-color)] space-y-4">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] font-mono uppercase tracking-wider">
            Related in {frontmatter.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
