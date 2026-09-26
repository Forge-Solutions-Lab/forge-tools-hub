import { z } from "zod";

export const ToolFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum([
    "AI Skills / Prompt",
    "MCP Server",
    "IDE Extension",
    "Workflow / Automation",
  ]),
  tags: z.array(z.string()),
  works_with: z.array(z.string()),
  install_difficulty: z.enum(["easy", "medium", "hard"]),
  source_url: z.string().url().optional(),
  github_url: z.string().url().optional(),
  added_by: z.string(),
  added_date: z.string(),
  status: z.enum(["recommended", "experimental", "archived"]).default("recommended"),
  featured: z.boolean().optional().default(false),
  read_time: z.string().optional().default("3 min read"),
});

export type ToolFrontmatter = z.infer<typeof ToolFrontmatterSchema>;

export interface ToolItem {
  slug: string;
  frontmatter: ToolFrontmatter;
  content: string;
}
