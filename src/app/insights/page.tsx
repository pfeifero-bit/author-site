import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { TedxTalk } from '@/components/sections/TedxTalk';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Insights | Dale Nirvani Pfeifer',
  description:
    'Field notes on AI and philanthropy. Essays, talks, and selected writing on the future of fundraising.',
  url: `${site.url}/insights`,
});

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="container-prose pt-16 md:pt-24">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/75">
            Insights
          </p>
          <h1 className="mt-5 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-[4rem]">
            <span className="block">Field notes on AI</span>
            <span className="block font-medium text-accent-600">and philanthropy.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink/75">
            Short essays on the practice of fundraising as automation scales, plus the
            TEDxAuckland talk that started it all. Subscribers receive new posts in their
            inbox the morning they go up.
          </p>
        </header>
      </section>

      <TedxTalk />

      <section className="container-prose pb-24 md:pb-32">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
          Essays
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.25rem]">
          Recent posts.
        </h2>

        <div className="mt-10">
          {posts.length === 0 ? (
            <div className="rounded-md border border-dashed border-ink/15 bg-cream-50 p-10 text-center">
              <p className="text-base text-ink/75">
                The first post is in the queue. Subscribe below to be the first to see it.
              </p>
            </div>
          ) : (
            <ul className="grid gap-px overflow-hidden rounded-md bg-ink/10">
              {posts.map((post) => (
                <li key={post.slug} className="bg-cream">
                  <Link
                    href={`/insights/${post.slug}`}
                    className="group grid gap-6 p-6 transition hover:bg-ink/[0.02] md:grid-cols-[10rem_1fr_auto] md:items-baseline md:p-8"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink/65">
                      {formatDate(post.date)}
                    </p>
                    <div>
                      <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-ink md:text-[1.65rem]">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink/70">{post.excerpt}</p>
                      )}
                    </div>
                    <p className="text-xs text-ink/70 transition group-hover:text-accent-600 md:whitespace-nowrap">
                      {post.readingMinutes} min read
                      <span aria-hidden className="ml-2">&rarr;</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
