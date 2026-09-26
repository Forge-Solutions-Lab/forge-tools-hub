"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, Layers } from "lucide-react";
import { type ToolItem } from "@/lib/schema";
import { ToolCard } from "./ToolCard";
import { cn } from "@/lib/utils";

interface ToolsFilterViewProps {
  initialTools: ToolItem[];
  allCategories: string[];
  allTags: string[];
  allWorksWith: string[];
}

export const ToolsFilterView: React.FC<ToolsFilterViewProps> = ({
  initialTools,
  allCategories,
  allWorksWith,
}) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const searchParam = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedIde, setSelectedIde] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Sync state when URL search parameters change (e.g. from top bar search)
  useEffect(() => {
    if (searchParam !== undefined) {
      setSearch(searchParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParam, categoryParam]);

  const filteredTools = useMemo(() => {
    return initialTools.filter((tool) => {
      const fm = tool.frontmatter;

      // Category filter
      if (selectedCategory !== "All" && fm.category !== selectedCategory) {
        return false;
      }

      // IDE / Works with filter
      if (selectedIde !== "All" && !fm.works_with.includes(selectedIde)) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== "All" && fm.install_difficulty !== selectedDifficulty) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "All" && fm.status !== selectedStatus) {
        return false;
      }

      // Text search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = fm.title.toLowerCase().includes(q);
        const matchesDesc = fm.description.toLowerCase().includes(q);
        const matchesTags = fm.tags.some((t) => t.toLowerCase().includes(q));
        const matchesAuthor = fm.added_by.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesAuthor) {
          return false;
        }
      }

      return true;
    });
  }, [
    initialTools,
    search,
    selectedCategory,
    selectedIde,
    selectedDifficulty,
    selectedStatus,
  ]);

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedIde !== "All" ||
    selectedDifficulty !== "All" ||
    selectedStatus !== "All";

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedIde("All");
    setSelectedDifficulty("All");
    setSelectedStatus("All");
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls Header */}
      <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-dim)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description, keywords, or author..."
              className="w-full bg-[var(--bg-surface-subtle)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-dim)] pl-9 pr-8 py-2 rounded-md border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-color)] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--text-primary)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* IDE Selector */}
          <div className="flex items-center gap-2">
            <select
              value={selectedIde}
              onChange={(e) => setSelectedIde(e.target.value)}
              aria-label="Filter by Compatibility"
              className="bg-[var(--bg-surface-subtle)] text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded-md border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-color)]"
            >
              <option value="All">All Hosts / IDEs</option>
              {allWorksWith.map((ide) => (
                <option key={ide} value={ide}>
                  {ide}
                </option>
              ))}
            </select>

            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              aria-label="Filter by Difficulty"
              className="bg-[var(--bg-surface-subtle)] text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded-md border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-color)]"
            >
              <option value="All">All Difficulties</option>
              <option value="easy">Easy (1-click/plugin)</option>
              <option value="medium">Medium (Config JSON)</option>
              <option value="hard">Hard (CLI/Build)</option>
            </select>

            {/* Status Selector */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by Status"
              className="bg-[var(--bg-surface-subtle)] text-xs font-mono text-[var(--text-secondary)] px-3 py-2 rounded-md border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-color)]"
            >
              <option value="All">All Statuses</option>
              <option value="recommended">Recommended</option>
              <option value="experimental">Experimental</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
          <span className="text-[11px] font-mono text-[var(--text-dim)] mr-2">Category:</span>
          {["All", ...allCategories].map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-2.5 py-1 text-xs font-mono rounded-md border transition-colors",
                  isSelected
                    ? "bg-[var(--accent-subtle)] text-[var(--accent-text)] border-[var(--accent-color)]"
                    : "bg-[var(--bg-surface-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                )}
              >
                {category}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-xs font-mono text-[var(--error-text)] hover:opacity-80 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-dim)]">
        <span>
          Showing <strong className="text-[var(--text-primary)]">{filteredTools.length}</strong> of{" "}
          {initialTools.length} tools & skills
        </span>
      </div>

      {/* Grid of Tools */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-lg border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)]">
          <Layers className="w-8 h-8 text-[var(--text-dim)] mx-auto mb-3" />
          <h3 className="text-sm font-medium text-[var(--text-primary)]">No tools match your filters</h3>
          <p className="text-xs text-[var(--text-dim)] mt-1 max-w-sm mx-auto">
            Try adjusting your search query, category, or difficulty filters to find what you need.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-3 py-1.5 text-xs font-mono text-[var(--accent-color)] hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};
