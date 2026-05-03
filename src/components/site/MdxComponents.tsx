import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="mt-12 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mt-12 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight md:text-[2rem]" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-10 text-2xl font-bold leading-snug tracking-tight" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-6 text-lg leading-relaxed text-ink/80" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="underline decoration-accent-on-cream decoration-1 underline-offset-4 hover:text-ink"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-6 space-y-2 pl-6 text-lg leading-relaxed text-ink/80 [&>li]:list-disc [&>li]:pl-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-6 space-y-2 pl-6 text-lg leading-relaxed text-ink/80 [&>li]:list-decimal [&>li]:pl-2" {...props}>
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-8 border-l-4 border-accent-on-cream pl-6 text-xl font-light leading-relaxed text-ink/85"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code className="rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.92em] text-ink" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mt-6 overflow-x-auto rounded-md bg-ink p-5 font-mono text-sm leading-relaxed text-cream"
      {...props}
    >
      {children}
    </pre>
  ),
  hr: (props) => <hr className="my-12 border-ink/15" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-ink" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};
