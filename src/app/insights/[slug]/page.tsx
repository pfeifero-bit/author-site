import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { mdxComponents } from '@/components/site/MdxComponents';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Insights | ${site.author.name}`,
    description:
      post.excerpt ?? `Field note by ${site.author.name} on AI and philanthropy.`,
    url: `${site.url}/insights/${post.slug}`,
    ogType: 'article',
    openGraphExtras: { publishedTime: post.date },
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post || post.draft) notFound();

  return (
    <article className="container-prose pb-24 pt-16 md:pb-32 md:pt-24">
      <Link
        href="/insights"
        className="text-xs font-semibold uppercase tracking-widest text-ink/70 transition hover:text-ink"
      >
        &larr; All insights
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
          {formatDate(post.date)} &middot; {post.readingMinutes} min read
        </p>
        <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-ink/70">
            {post.excerpt}
          </p>
        )}
      </header>

      <div className="mt-12 max-w-3xl">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
            },
          }}
        />
      </div>

      <footer className="mx-auto mt-16 max-w-3xl border-t border-ink/10 pt-10">
        <p className="text-sm text-ink/70">
          Written by <span className="font-semibold text-ink">{site.author.name}</span>, CEO of{' '}
          <a
            href={site.author.company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-ink"
          >
            Giving Compass
          </a>{' '}
          and author of{' '}
          <Link
            href="/the-book"
            className="underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-ink"
          >
            <span className="italic">Artificial Intelligence for Nonprofit Fundraising</span>
          </Link>
          .
        </p>
      </footer>
    </article>
  );
}
