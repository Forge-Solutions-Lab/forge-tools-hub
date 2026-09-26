import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ToolFrontmatterSchema, type ToolItem, type ToolFrontmatter } from "./schema";

const TOOLS_PATH = path.join(process.cwd(), "content/tools");

export function getToolSlugs(): string[] {
  if (!fs.existsSync(TOOLS_PATH)) {
    return [];
  }
  return fs
    .readdirSync(TOOLS_PATH)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getToolBySlug(slug: string): ToolItem | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(TOOLS_PATH, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const parsedFrontmatter = ToolFrontmatterSchema.safeParse(data);
    if (!parsedFrontmatter.success) {
      console.error(`Invalid frontmatter in ${slug}.mdx:`, parsedFrontmatter.error.format());
      return null;
    }

    return {
      slug: realSlug,
      frontmatter: parsedFrontmatter.data,
      content,
    };
  } catch (error) {
    console.error(`Error reading tool ${slug}:`, error);
    return null;
  }
}

export function getAllTools(): ToolItem[] {
  const slugs = getToolSlugs();
  const tools = slugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is ToolItem => tool !== null);

  // Sort: Featured first, then by added_date descending
  return tools.sort((a, b) => {
    if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
    if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
    return new Date(b.frontmatter.added_date).getTime() - new Date(a.frontmatter.added_date).getTime();
  });
}

export function getAllCategories(): string[] {
  const tools = getAllTools();
  const categories = new Set(tools.map((t) => t.frontmatter.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const tools = getAllTools();
  const tags = new Set<string>();
  tools.forEach((t) => t.frontmatter.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAllWorksWith(): string[] {
  const tools = getAllTools();
  const worksWith = new Set<string>();
  tools.forEach((t) => t.frontmatter.works_with.forEach((w) => worksWith.add(w)));
  return Array.from(worksWith).sort();
}
