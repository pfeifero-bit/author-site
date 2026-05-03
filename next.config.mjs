import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Permanent 301 redirects for legacy URLs from the old Squarespace and
  // static-HTML versions of this site. We use explicit statusCode: 301
  // (rather than `permanent: true`, which Next emits as 308) because some
  // older crawlers and link checkers still treat 301 differently. Google
  // honors both for link equity, but matching what is already indexed
  // avoids any ambiguity. Add new entries here whenever you discover an
  // old URL still being linked from somewhere.
  async redirects() {
    return [
      // Old author-page slugs (most important: /dale-nirvani-pfeifer is indexed)
      { source: '/dale-nirvani-pfeifer', destination: '/about', statusCode: 301 },
      { source: '/dale', destination: '/about', statusCode: 301 },
      { source: '/author', destination: '/about', statusCode: 301 },
      { source: '/bio', destination: '/about', statusCode: 301 },

      // Old static-site .html paths
      { source: '/index.html', destination: '/', statusCode: 301 },
      { source: '/about.html', destination: '/about', statusCode: 301 },
      { source: '/book.html', destination: '/the-book', statusCode: 301 },
      { source: '/contact.html', destination: '/contact', statusCode: 301 },
      { source: '/resources.html', destination: '/the-book', statusCode: 301 },

      // Variations on the book page
      { source: '/book', destination: '/the-book', statusCode: 301 },
      { source: '/the-book.html', destination: '/the-book', statusCode: 301 },
      { source: '/pre-order', destination: '/the-book', statusCode: 301 },
      { source: '/preorder', destination: '/the-book', statusCode: 301 },

      // Old resources hub: best landing target is the book page
      { source: '/resources', destination: '/the-book', statusCode: 301 },

      // Insights variations
      { source: '/blog', destination: '/insights', statusCode: 301 },
      { source: '/blog.html', destination: '/insights', statusCode: 301 },
      { source: '/articles', destination: '/insights', statusCode: 301 },
    ];
  },
};

export default withMDX(nextConfig);
