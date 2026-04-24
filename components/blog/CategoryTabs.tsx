import Link from 'next/link'
import type { WPCategory } from '@/lib/wordpress'
import { CATEGORY_ORDER } from '@/lib/wordpress'

interface CategoryTabsProps {
  categories: WPCategory[]
  activeSlug: string | undefined
}

export default function CategoryTabs({ categories, activeSlug }: CategoryTabsProps) {
  return (
    <div className="border-b border-[#e5e2da] bg-[#fafaf6] sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* 가로 스크롤 컨테이너 */}
        <nav
          className="flex gap-0 overflow-x-auto scrollbar-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
          aria-label="카테고리 필터"
        >
          {/* 전체 탭 */}
          <TabItem
            href="/blog"
            label="전체"
            isActive={!activeSlug}
          />

          {/* 카테고리별 탭 – CATEGORY_ORDER 순서 유지 */}
          {CATEGORY_ORDER.map((def) => {
            const cat = categories.find((c) => c.slug === def.slug)
            return (
              <TabItem
                key={def.slug}
                href={`/blog?cat=${def.slug}`}
                label={def.label}
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
      className={`
        relative shrink-0 flex items-center gap-1.5
        py-4 px-4 text-sm transition-colors duration-200
        whitespace-nowrap
        ${isActive
          ? 'text-[#1a1a18] font-medium'
          : 'text-[#8c8c86] hover:text-[#1a1a18]'
        }
      `}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {label}
      {typeof count === 'number' && count > 0 && (
        <span
          className={`text-[10px] tabular-nums ${isActive ? 'text-[#c8a876]' : 'text-[#c0bdb5]'}`}
        >
          {count}
        </span>
      )}
      {/* 활성 탭 언더라인 */}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c8a876]" />
      )}
    </Link>
  )
}
