import Link from 'next/link'
import type { WPCategory } from '@/lib/wordpress'
import { CATEGORY_ORDER } from '@/lib/wordpress'

interface CategoryTabsProps {
  categories: WPCategory[]
  activeSlug: string | undefined
}

export default function CategoryTabs({ categories, activeSlug }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 border-y border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="flex gap-2 overflow-x-auto py-4"
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
      className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
        isActive
          ? 'border-slate-950 bg-slate-950 text-white shadow-sm'
          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-950 hover:text-slate-950'
      }`}
    >
      {label}
    </Link>
  )
}
