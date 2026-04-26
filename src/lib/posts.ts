import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  cover?: string;
  draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostMeta & {
  content: string;
};

function ensureDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

export function getPostSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  ensureDir();
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const altPath = path.join(POSTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(altPath) ? altPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    slug,
    title: fm.title,
    date: fm.date,
    excerpt: fm.excerpt,
    cover: fm.cover,
    draft: fm.draft ?? false,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

export function getAllPosts({ includeDrafts = false }: { includeDrafts?: boolean } = {}): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(({ content: _content, ...meta }) => meta);
}
