import React, { Suspense } from "react";
import { getAllTools, getAllCategories, getAllTags, getAllWorksWith } from "@/lib/mdx";
import { ToolsFilterView } from "@/components/tools/ToolsFilterView";
import { QuickInstall } from "@/components/tools/QuickInstall";
import { GitBranch, FileCode2, Send, Sparkles } from "lucide-react";

export const metadata = {
  title: "AI Tools & Skills Directory | Forge Tools Hub",
  description: "Browse, filter and discover AI skills, MCP servers, and prompt workflows.",
};

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const tags = getAllTags();
  const worksWith = getAllWorksWith();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          AI Tools & Skills Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl">
          ค้นหาและคัดกรองเครื่องมือตาม IDE, Category, ระดับความยากในการติดตั้ง หรือค้นหาตามคีย์เวิร์ด
        </p>
      </div>

      {/* Filterable Tools List */}
      <Suspense fallback={<div className="text-xs font-mono text-[var(--text-dim)]">Loading tools...</div>}>
        <ToolsFilterView
          initialTools={tools}
          allCategories={categories}
          allTags={tags}
          allWorksWith={worksWith}
        />
      </Suspense>

      {/* Contribution Guide Section */}
      <section id="how-to-contribute" className="pt-10 border-t border-[var(--border-color)] space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-color)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Guide</span>
          </div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            วิธีเพิ่มเครื่องมือใหม่ (How to Add a Tool)
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            ทุกคนในทีมสามารถเพิ่มเครื่องมือที่ค้นพบหรือสร้างขึ้นเองได้ง่ายๆ ผ่าน Git Workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
              <GitBranch className="w-4 h-4 text-[var(--accent-color)]" />
              <span className="font-semibold">Step 1: Clone & Branch</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Clone repository และสร้าง feature branch สำหรับเครื่องมือใหม่ของคุณ
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
              <FileCode2 className="w-4 h-4 text-[var(--success-indicator)]" />
              <span className="font-semibold">Step 2: Copy Template</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              คัดลอกไฟล์จาก <code className="px-1 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">content/tools/_template.mdx</code> ไปเป็น <code className="px-1 py-0.5 rounded bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">content/tools/your-tool.mdx</code> แล้วเขียนสรุป ก่อน/หลังใช้
            </p>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
              <Send className="w-4 h-4 text-[var(--warning-indicator)]" />
              <span className="font-semibold">Step 3: Commit & Push</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Commit MDX ไฟล์ของคุณแล้วเปิด Pull Request เพื่อให้ระบบ Deploy ขึ้นเว็บโดยอัตโนมัติ
            </p>
          </div>
        </div>

        <QuickInstall
          title="Terminal Quick Steps"
          type="cli"
          command={`# 1. Clone repository
git clone https://github.com/Forge-Solutions-Lab/forge-tools-hub.git
cd forge-tools-hub

# 2. Copy template
cp content/tools/_template.mdx content/tools/my-new-tool.mdx

# 3. Edit & Commit
git add content/tools/my-new-tool.mdx
git commit -m "add: my-new-tool"
git push origin main`}
        />
      </section>
    </div>
  );
}
