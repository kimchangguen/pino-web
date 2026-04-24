import Link from 'next/link'
import type { WPCategory } from '@/lib/wordpress'
import { CATEGORY_ORDER } from '@/lib/wordpress'

interface CategoryTabsProps {
  categories: WPCategory[]
  activeSlug: string | undefined
}

export default function CategoryTabs({ categories, activeSlug }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 border-y border-slate-200 bg-white/92 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <nav
          className="flex gap-6 overflow-x-auto py-4"
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
}: {
  href: string
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      scroll={false}
      replace
      className={`shrink-0 text-[12px] font-medium uppercase tracking-[0.22em] transition ${
        isActive ? 'text-blog-navy' : 'text-slate-400 hover:text-blog-orange'
      }`}
    >
      {label}
    </Link>
  )
}
