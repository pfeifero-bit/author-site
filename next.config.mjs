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

  // Permanent (308) redirects for legacy URLs from the old Squarespace
  // and static-HTML versions of this site. Keeps SEO link equity flowing
  // to the new pages. Add new entries here whenever you discover an old
  // URL still being linked from somewhere.
  async redirects() {
    return [
      // Old author-page slugs
      { source: '/dale-nirvani-pfeifer', destination: '/about', permanent: true },
      { source: '/dale', destination: '/about', permanent: true },
      { source: '/author', destination: '/about', permanent: true },
      { source: '/bio', destination: '/about', permanent: true },

      // Old static-site .html paths
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/book.html', destination: '/the-book', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/resources.html', destination: '/the-book', permanent: true },

      // Variations on the book page
      { source: '/book', destination: '/the-book', permanent: true },
      { source: '/the-book.html', destination: '/the-book', permanent: true },
      { source: '/pre-order', destination: '/the-book', permanent: true },
      { source: '/preorder', destination: '/the-book', permanent: true },

      // Old resources hub: best landing target is the book page
      { source: '/resources', destination: '/the-book', permanent: true },

      // Insights variations
      { source: '/blog', destination: '/insights', permanent: true },
      { source: '/blog.html', destination: '/insights', permanent: true },
      { source: '/articles', destination: '/insights', permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
