"use client";

import React, { useState } from "react";
import {
  Download,
  Copy,
  Check,
  FileCode,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SkillDownloadCardProps {
  id: string;
  title: string;
  category: string;
  filename: string;
  downloadUrl: string;
  fileSize: string;
  description: string;
  highlights: string[];
  previewContent?: string;
}

export const SkillDownloadCard: React.FC<SkillDownloadCardProps> = ({
  id,
  title,
  category,
  filename,
  downloadUrl,
  fileSize,
  description,
  highlights,
  previewContent,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fetchedPreview, setFetchedPreview] = useState<string | null>(
    previewContent || null
  );

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    try {
      const response = await fetch(downloadUrl);
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
      console.error("Download failed, falling back to direct link", err);
      window.location.href = downloadUrl;
    } finally {
      setTimeout(() => setDownloading(false), 600);
    }
  };

  const handleCopy = async () => {
    try {
      let textToCopy = fetchedPreview;
      if (!textToCopy) {
        const res = await fetch(downloadUrl);
        textToCopy = await res.text();
        setFetchedPreview(textToCopy);
      }
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const togglePreview = async () => {
    if (!showPreview && !fetchedPreview) {
      try {
        const res = await fetch(downloadUrl);
        const text = await res.text();
        setFetchedPreview(text);
      } catch (err) {
        console.error("Failed to load preview", err);
      }
    }
    setShowPreview(!showPreview);
  };

  return (
    <div className="group my-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-all duration-200 overflow-hidden shadow-sm">
      {/* Header & Meta Bar */}
      <div className="p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-[var(--text-dim)] bg-[var(--bg-surface-subtle)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
              RULE #{id}
            </span>
            <span className="font-mono text-[11px] text-[var(--accent-text)] bg-[var(--accent-subtle)] px-2 py-0.5 rounded border border-[var(--accent-border)]">
              {category}
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              {fileSize}
            </span>
          </div>

          <h3 className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
            {title}
          </h3>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {description}
          </p>

          {/* Highlights checklist */}
          {highlights && highlights.length > 0 && (
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[var(--text-muted)]">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] mt-1.5 shrink-0" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white text-xs font-medium transition-all shadow-sm active:scale-95 disabled:opacity-75 cursor-pointer"
            title={`Download ${filename} directly`}
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>{downloading ? "Downloading..." : "Download .md"}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] text-[11px] font-mono transition-colors cursor-pointer"
              title="Copy markdown text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[var(--success-text)]" />
                  <span className="text-[var(--success-text)]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={togglePreview}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] text-[11px] font-mono transition-colors cursor-pointer"
              title="Quick preview"
            >
              <Eye className="w-3 h-3" />
              <span>{showPreview ? "Hide" : "Preview"}</span>
              {showPreview ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* File Path Footer */}
      <div className="px-5 py-2 bg-[var(--bg-surface-subtle)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)]">
        <div className="flex items-center gap-1.5">
          <FileCode className="w-3 h-3 text-[var(--accent-color)]" />
          <span>{filename}</span>
        </div>
        <span>Target: All Engineering Projects</span>
      </div>

      {/* Expandable Preview Drawer */}
      {showPreview && (
        <div className="border-t border-[var(--border-color)] bg-[var(--code-pre-bg)] p-4">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-subtle)] text-xs font-mono text-[var(--text-dim)]">
            <span>PREVIEW: {filename}</span>
            <button
              onClick={handleCopy}
              className="text-[var(--accent-text)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? "Copied" : "Copy All"}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-[var(--code-text)] overflow-x-auto max-h-72 leading-relaxed whitespace-pre-wrap">
            {fetchedPreview || "Loading file content..."}
          </pre>
        </div>
      )}
    </div>
  );
};
