import Link from 'next/link'
import type { WPCategory } from '@/lib/wordpress'
import { CATEGORY_ORDER } from '@/lib/wordpress'

interface CategoryTabsProps {
  categories: WPCategory[]
  activeSlug: string | undefined
}

export default function CategoryTabs({ categories, activeSlug }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 border-y border-blog-border bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <nav
          className="flex gap-1 overflow-x-auto py-3"
          style={{ WebkitOverflowScrolling: 'touch' }}
          aria-label="카테고리 필터"
        >
          <TabItem href="/blog" label="전체" isActive={!activeSlug} />
          {CATEGORY_ORDER.map((def) => {
            const cat = categories.find((c) => c.slug === def.slug)
            return (
              <TabItem
                key={def.slug}
                href={`/blog?cat=${def.slug}`}
                label={cat?.name || def.label}
                isActive={activeSlug === def.slug}
                count={cat?.count}
              />
            )
          })}
        </nav>
      </div>
    </div>
  )
}

function TabItem({
  href,
  label,
  isActive,
  count,
}: {
  href: string
  label: string
  isActive: boolean
  count?: number
}) {
  return (
    <Link
      href={href}
      scroll={false}
      replace
      className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold transition ${
        isActive
          ? 'border-blog-blue bg-blog-blue text-white'
          : 'border-blog-border bg-white text-blog-muted hover:border-blog-blue hover:text-blog-blue'
      }`}
    >
      {label}
      {typeof count === 'number' && count > 0 && (
        <span className={isActive ? 'ml-1.5 text-white/75' : 'ml-1.5 text-blog-orange'}>
          {count}
        </span>
      )}
    </Link>
  )
}
