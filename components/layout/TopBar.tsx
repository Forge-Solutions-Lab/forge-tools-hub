"use client";

import React, { useState } from "react";
import { Search, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export const TopBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-14 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <Search className="w-3.5 h-3.5 text-[var(--text-dim)] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tools, MCP servers, skills (e.g. typescript, godkiller, cursor)..."
          className="w-full bg-[var(--bg-surface-subtle)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-dim)] pl-9 pr-12 py-1.5 rounded-md border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-color)] transition-colors"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-[var(--text-dim)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-color)]">
          <span>↵</span>
        </div>
      </form>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
          <span>Forge Org</span>
        </div>
        
        <ThemeToggle />

        <a
          href="https://github.com/Forge-Solutions-Lab/forge-tools-hub"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] text-xs font-mono border border-[var(--border-color)] transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden md:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
};
