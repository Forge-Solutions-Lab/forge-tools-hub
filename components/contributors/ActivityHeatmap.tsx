"use client";

import React, { useMemo, useState } from "react";
import { GitCommit, Calendar, Info } from "lucide-react";
import { type OrgCommitDetail } from "@/lib/github";
import { cn } from "@/lib/utils";

interface ActivityHeatmapProps {
  commits: OrgCommitDetail[];
}

interface DayActivity {
  date: Date;
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: number; // 0=Sun, 1=Mon, ..., 6=Sat
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  commits: OrgCommitDetail[];
  isFuture: boolean;
}

interface WeekColumn {
  days: DayActivity[];
}

function getLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const date = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ commits }) => {
  const [hoveredDay, setHoveredDay] = useState<DayActivity | null>(null);

  // Group commits by local calendar date (YYYY-MM-DD)
  const commitMap = useMemo(() => {
    const map = new Map<string, OrgCommitDetail[]>();
    commits.forEach((c) => {
      if (c.date) {
        const d = new Date(c.date);
        const key = getLocalDateString(d);
        const list = map.get(key) || [];
        list.push(c);
        map.set(key, list);
      }
    });
    return map;
  }, [commits]);

  // Generate 16 weeks of data strictly aligned to calendar weeks (Row 0=Sun, Row 1=Mon, ..., Row 6=Sat)
  const { weeks, monthHeaders, totalCommitCount } = useMemo(() => {
    const weeksList: WeekColumn[] = [];
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 is Sun, 5 is Fri, 6 is Sat

    // Start on Sunday 15 weeks before the current week (Total 16 full calendar weeks)
    const startSunday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - currentDayOfWeek - 15 * 7
    );
    startSunday.setHours(0, 0, 0, 0);

    const monthHeadersList: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < 16; w++) {
      const weekDays: DayActivity[] = [];

      for (let d = 0; d < 7; d++) {
        const curDate = new Date(
          startSunday.getFullYear(),
          startSunday.getMonth(),
          startSunday.getDate() + w * 7 + d
        );
        const dayStr = getLocalDateString(curDate);
        const dayCommits = commitMap.get(dayStr) || [];
        const count = dayCommits.length;

        // Check if date is in the future
        const isFuture =
          curDate.getTime() >
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();

        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (!isFuture) {
          if (count >= 5) level = 4;
          else if (count >= 3) level = 3;
          else if (count >= 2) level = 2;
          else if (count >= 1) level = 1;
        }

        weekDays.push({
          date: curDate,
          dateStr: dayStr,
          dayOfWeek: d, // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
          count: isFuture ? 0 : count,
          level: isFuture ? 0 : level,
          commits: isFuture ? [] : dayCommits,
          isFuture,
        });
      }

      // Check month header for this week column
      const firstDayInWeek = weekDays[0];
      if (firstDayInWeek) {
        const monthNum = firstDayInWeek.date.getMonth();
        if (monthNum !== lastMonth) {
          const monthLabel = new Intl.DateTimeFormat("th-TH", { month: "short" }).format(
            firstDayInWeek.date
          );
          monthHeadersList.push({ label: monthLabel, colIndex: w });
          lastMonth = monthNum;
        }
      }

      weeksList.push({ days: weekDays });
    }

    return {
      weeks: weeksList,
      monthHeaders: monthHeadersList,
      totalCommitCount: commits.length,
    };
  }, [commitMap, commits]);

  const formatDateThai = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat("th-TH", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-[var(--accent-color)]" />
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Forge Org Commit Activity (Last 16 Weeks)
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[var(--accent-subtle)] text-[var(--accent-text)] border border-[var(--border-color)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
            {totalCommitCount} Commits in 112 days
          </span>
        </div>
      </div>

      {/* Main Full-Width Heatmap with Y-Axis Day Labels and X-Axis Month Labels */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[650px] w-full space-y-2">
          {/* Month Labels (X-Axis evenly spread across 16 columns) */}
          <div className="flex items-center w-full pl-8">
            <div
              className="w-full text-[11px] font-mono text-[var(--text-muted)]"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(16, minmax(0, 1fr))",
                gap: "8px",
              }}
            >
              {weeks.map((_, colIndex) => {
                const header = monthHeaders.find((h) => h.colIndex === colIndex);
                return (
                  <div key={colIndex} className="text-center select-none overflow-visible">
                    {header ? header.label : ""}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid Container with Left Day Labels & Full-Width 16 Columns */}
          <div className="flex items-center w-full">
            {/* Day of Week Labels (Left Y-Axis: Exactly mapped row-by-row 0=อา., 1=จ., 2=อ., 3=พ., 4=พฤ., 5=ศ., 6=ส.) */}
            <div className="flex flex-col justify-between h-[154px] pr-3 text-[11px] font-mono text-[var(--text-dim)] shrink-0 select-none py-0.5">
              <span className="leading-none">อา.</span>
              <span className="leading-none">จ.</span>
              <span className="leading-none">อ.</span>
              <span className="leading-none">พ.</span>
              <span className="leading-none">พฤ.</span>
              <span className="leading-none">ศ.</span>
              <span className="leading-none">ส.</span>
            </div>

            {/* 16 Week Columns spread across full width */}
            <div
              className="w-full h-[154px]"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(16, minmax(0, 1fr))",
                gap: "8px",
              }}
            >
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col justify-between h-full items-center">
                  {week.days.map((day, dIdx) => {
                    let bgStyle = {
                      backgroundColor: "var(--heatmap-0-bg)",
                      borderColor: "var(--heatmap-0-border)",
                    };
                    if (day.level === 1) {
                      bgStyle = {
                        backgroundColor: "var(--heatmap-1-bg)",
                        borderColor: "var(--heatmap-1-border)",
                      };
                    } else if (day.level === 2) {
                      bgStyle = {
                        backgroundColor: "var(--heatmap-2-bg)",
                        borderColor: "var(--heatmap-2-border)",
                      };
                    } else if (day.level === 3) {
                      bgStyle = {
                        backgroundColor: "var(--heatmap-3-bg)",
                        borderColor: "var(--heatmap-3-border)",
                      };
                    } else if (day.level === 4) {
                      bgStyle = {
                        backgroundColor: "var(--heatmap-4-bg)",
                        borderColor: "var(--heatmap-4-border)",
                      };
                    }

                    return (
                      <div
                        key={day.dateStr}
                        style={bgStyle}
                        onMouseEnter={() => !day.isFuture && setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={cn(
                          "w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[2px] border transition-all cursor-pointer",
                          day.isFuture
                            ? "opacity-20 cursor-not-allowed"
                            : day.count > 0
                            ? "hover:scale-125 hover:z-10 hover:shadow-md ring-0 hover:ring-2 hover:ring-[var(--accent-color)]"
                            : "hover:opacity-75"
                        )}
                        title={
                          day.isFuture
                            ? `${formatDateThai(day.dateStr)} (วันในอนาคต)`
                            : `${formatDateThai(day.dateStr)}: ${day.count} ${day.count === 1 ? "commit" : "commits"}`
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Details: Active Hover Tooltip & Legend */}
      <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        {/* Dynamic Hover Inspector Banner */}
        <div className="flex items-center gap-2 text-[var(--text-muted)] min-h-[22px]">
          {hoveredDay ? (
            <div className="flex items-center gap-2 text-[var(--text-primary)] animate-in fade-in duration-150">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span className="font-semibold text-[var(--accent-text)]">
                {formatDateThai(hoveredDay.dateStr)}:
              </span>
              <span>
                {hoveredDay.count > 0 ? (
                  <span className="font-semibold text-[var(--success-text)]">
                    {hoveredDay.count} {hoveredDay.count === 1 ? "Commit" : "Commits"}
                  </span>
                ) : (
                  <span className="text-[var(--text-dim)]">0 commits</span>
                )}
              </span>
              {hoveredDay.commits.length > 0 && (
                <span className="text-[11px] text-[var(--text-dim)] hidden md:inline">
                  (ใน {Array.from(new Set(hoveredDay.commits.map((c) => c.repo))).join(", ")})
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-dim)]">
              <Info className="w-3.5 h-3.5" />
              <span>ชี้เมาส์ที่แต่ละช่องสี่เหลี่ยมเพื่อดูจำนวน Commit และวันที่</span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--text-dim)] self-end sm:self-auto">
          <span>น้อย</span>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-[2px] border"
              style={{
                backgroundColor: "var(--heatmap-0-bg)",
                borderColor: "var(--heatmap-0-border)",
              }}
              title="0 commits"
            />
            <div
              className="w-3 h-3 rounded-[2px] border"
              style={{
                backgroundColor: "var(--heatmap-1-bg)",
                borderColor: "var(--heatmap-1-border)",
              }}
              title="1 commit"
            />
            <div
              className="w-3 h-3 rounded-[2px] border"
              style={{
                backgroundColor: "var(--heatmap-2-bg)",
                borderColor: "var(--heatmap-2-border)",
              }}
              title="2 commits"
            />
            <div
              className="w-3 h-3 rounded-[2px] border"
              style={{
                backgroundColor: "var(--heatmap-3-bg)",
                borderColor: "var(--heatmap-3-border)",
              }}
              title="3-4 commits"
            />
            <div
              className="w-3 h-3 rounded-[2px] border"
              style={{
                backgroundColor: "var(--heatmap-4-bg)",
                borderColor: "var(--heatmap-4-border)",
              }}
              title="5+ commits"
            />
          </div>
          <span>มาก</span>
        </div>
      </div>
    </div>
  );
};
