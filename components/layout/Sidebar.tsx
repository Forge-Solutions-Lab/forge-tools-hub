"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Users,
  PlusCircle,
  Github,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Tools & Skills Catalog",
    href: "/tools",
    icon: Wrench,
  },
  {
    name: "Contributors",
    href: "/contributors",
    icon: Users,
  },
];

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col justify-between shrink-0 h-screen sticky top-0",
        className
      )}
    >
      <div>
        {/* Logo / Brand Header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-color)]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)] flex items-center gap-1.5">
                Forge Hub
                <span className="text-[10px] font-mono text-[var(--success-text)] bg-[var(--success-bg)] px-1 py-0.2 rounded border border-[var(--success-border)]">
                  v1.0
                </span>
              </span>
              <p className="text-[11px] font-mono text-[var(--text-dim)]">Forge Solutions Lab</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Navigation Group */}
        <div className="px-3 py-4 space-y-6">
          <div>
            <div className="px-3 mb-2 text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider">
              Navigation
            </div>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href) && !item.href.includes("?"));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors",
                      isActive
                        ? "bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] border border-[var(--border-color)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)]"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        isActive ? "text-[var(--accent-color)]" : "text-[var(--text-dim)]"
                      )}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions / Contribute */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider">
              Team Workflow
            </div>
            <div className="space-y-1">
              <Link
                href="/tools#how-to-contribute"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-[var(--success-indicator)] shrink-0" />
                <span>Add New Tool (MDX)</span>
              </Link>
              <a
                href="https://github.com/Forge-Solutions-Lab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-subtle)] transition-colors"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>GitHub Org</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-subtle)]">
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)]">
          <span>Theme Engine Active</span>
          <span className="w-2 h-2 rounded-full bg-[var(--success-indicator)]" title="System Operational" />
        </div>
        <p className="mt-1 text-[10px] text-[var(--text-dim)] leading-tight">
          Curated AI stack & workflow memory for engineers.
        </p>
      </div>
    </aside>
  );
};
