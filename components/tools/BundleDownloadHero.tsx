"use client";

import React, { useState } from "react";
import { Download, Archive, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";

interface BundleDownloadHeroProps {
  primaryZipUrl: string;
  primaryZipName: string;
  primaryZipSize: string;
  fullZipUrl: string;
  fullZipName: string;
  fullZipSize: string;
}

export const BundleDownloadHero: React.FC<BundleDownloadHeroProps> = ({
  primaryZipUrl,
  primaryZipName,
  primaryZipSize,
  fullZipUrl,
  fullZipName,
  fullZipSize,
}) => {
  const [downloadingPrimary, setDownloadingPrimary] = useState(false);
  const [downloadingFull, setDownloadingFull] = useState(false);

  const triggerDownload = async (url: string, filename: string, isPrimary: boolean) => {
    if (isPrimary) setDownloadingPrimary(true);
    else setDownloadingFull(true);

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Direct download fallback", err);
      window.location.href = url;
    } finally {
      setTimeout(() => {
        if (isPrimary) setDownloadingPrimary(false);
        else setDownloadingFull(false);
      }, 700);
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-surface-subtle)] to-[var(--bg-surface)] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--accent-text)] text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Universal Production Standards</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Forge Universal Engineering Skills Bundle
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            ชุดมาตรฐานวิศวกรรมซอฟต์แวร์สากลที่ผ่านการกลั่นกรองจากโปรเจกต์จริง
            พร้อมโครงสร้าง Clean Architecture, Docker Rules, PRD, ADR และ Workflow สำหรับ AI Coding Agents
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-dim)]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success-text)]" />
              <span>7 Standard Modules</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span>Claude / Cursor / Antigravity / Windsurf</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            onClick={() =>
              triggerDownload(
                primaryZipUrl,
                primaryZipName,
                true
              )
            }
            disabled={downloadingPrimary}
            className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white text-xs sm:text-sm font-semibold transition-all shadow hover:shadow-md active:scale-98 disabled:opacity-75 cursor-pointer"
          >
            <Download className="w-4 h-4 shrink-0" />
            <div className="text-left leading-tight">
              <div>{downloadingPrimary ? "Preparing Download..." : "Download Universal Bundle (.zip)"}</div>
              <div className="text-[10px] font-normal text-white/80 font-mono">
                {primaryZipSize} • Curated Standards
              </div>
            </div>
          </button>

          <button
            onClick={() =>
              triggerDownload(
                fullZipUrl,
                fullZipName,
                false
              )
            }
            disabled={downloadingFull}
            className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] text-xs font-medium transition-all active:scale-98 disabled:opacity-75 cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5 shrink-0 text-[var(--text-dim)]" />
            <div className="text-left leading-tight">
              <div>{downloadingFull ? "Downloading..." : "Full Repository Archive (.zip)"}</div>
              <div className="text-[10px] text-[var(--text-dim)] font-mono">
                {fullZipSize} • Complete skills-agent directory
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
