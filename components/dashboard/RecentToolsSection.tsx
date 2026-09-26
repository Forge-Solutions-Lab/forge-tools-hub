import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { type ToolItem } from "@/lib/schema";
import { ToolCard } from "../tools/ToolCard";

interface RecentToolsSectionProps {
  tools: ToolItem[];
}

export const RecentToolsSection: React.FC<RecentToolsSectionProps> = ({ tools }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--accent-color)]" />
          <h2 className="text-sm font-medium text-[var(--text-primary)] uppercase tracking-wider font-mono">
            Recently Added & Recommended
          </h2>
        </div>
        <Link
          href="/tools"
          className="text-xs font-mono text-[var(--accent-color)] hover:text-[var(--accent-hover)] flex items-center gap-1"
        >
          <span>Explore all {tools.length} tools</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.slice(0, 6).map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
};
