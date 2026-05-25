import Image from 'next/image';
import { site } from '@/lib/site';

type Size = 'sm' | 'md' | 'lg';

/**
 * Display widths per size variant. The image keeps the cover's natural
 * 2:3 aspect ratio, so height is implicit. These match the legacy
 * mockup sizes so layout doesn't shift in any consumer.
 */
const sizes: Record<Size, { container: string }> = {
  sm: { container: 'max-w-[14rem]' },
  md: { container: 'max-w-[20rem]' },
  lg: { container: 'max-w-[24rem]' },
};

/**
 * Cover image is shipped at /public/images/book-cover.jpg (831 × 1246
 * native). Next/Image will serve appropriately-sized variants per
 * viewport and per `size`.
 */
const COVER_SRC = '/images/book-cover.jpg';
const COVER_NATIVE_WIDTH = 831;
const COVER_NATIVE_HEIGHT = 1246;

export function BookCover({ size = 'md', className = '' }: { size?: Size; className?: string }) {
  const s = sizes[size];

  return (
    <div className={`relative mx-auto ${s.container} ${className}`}>
      <Image
        src={COVER_SRC}
        width={COVER_NATIVE_WIDTH}
        height={COVER_NATIVE_HEIGHT}
        alt={`${site.bookTitle}, by ${site.author.name}`}
        priority={size === 'md' || size === 'lg'}
        sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 90vw"
        className="aspect-[2/3] w-full overflow-hidden rounded-sm bg-ink shadow-[0_30px_80px_-25px_rgba(14,27,63,0.65)] ring-1 ring-ink/20"
      />
    </div>
  );
}
