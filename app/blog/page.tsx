import { Suspense } from 'react'
import {
  getCategories,
  getPostsByCategory,
  CATEGORY_ORDER,
} from '@/lib/wordpress'
import BlogHero from '@/components/blog/BlogHero'
import CategorySection from '@/components/blog/CategorySection'
import CategoryTabs from '@/components/blog/CategoryTabs'
import PostList from '@/components/blog/PostList'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | PINO STUDIO',
  description:
    '피노스튜디오의 촬영 이야기, 후기, 가이드 등 다양한 이야기를 담은 블로그입니다.',
}

interface BlogPageProps {
  searchParams: Promise<{ cat?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { cat } = await searchParams
  const categories = await getCategories()
  const activeCat = cat ? categories.find((c) => c.slug === cat) : undefined

  // ── 카테고리 필터 뷰 ──────────────────────────────────────────
  if (activeCat) {
    const posts = await getPostsByCategory(activeCat.id, 30)

    return (
      <main className="min-h-screen bg-[#fafaf6]">
        <div className="pt-36 pb-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p
              className="text-[#c8a876] text-xs tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Blog
            </p>
            <h1
              className="text-[#1a1a18] leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                fontWeight: 400,
              }}
            >
              {activeCat.name}
            </h1>
          </div>
        </div>

        <CategoryTabs categories={categories} activeSlug={activeCat.slug} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16 min-h-[50vh]">
          <p
            className="text-[#8c8c86] text-xs tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {activeCat.name} · {posts.length}개의 글
          </p>
          <Suspense>
            <PostList posts={posts} activeSlug={activeCat.slug} />
          </Suspense>
        </div>

        <Footer />
      </main>
    )
  }

  // ── 매거진 홈 뷰 ─────────────────────────────────────────────
  // 각 카테고리별 최신 4개 포스트를 병렬 fetch
  const postsPerCategory = await Promise.all(
    CATEGORY_ORDER.map((def) => {
      const cat = categories.find((c) => c.slug === def.slug)
      return cat ? getPostsByCategory(cat.id, 4) : Promise.resolve([])
    })
  )

  return (
    <main className="min-h-screen bg-[#fafaf6]">
      {/* 히어로 배너 */}
      <BlogHero />

      {/* 카테고리 섹션들 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-20">
        {CATEGORY_ORDER.map((def, i) => {
          const category = categories.find((c) => c.slug === def.slug)
          if (!category) return null
          return (
            <CategorySection
              key={def.slug}
              category={category}
              posts={postsPerCategory[i]}
              index={i}
            />
          )
        })}

        {/* 카테고리가 하나도 없을 때 */}
        {categories.length === 0 && (
          <div className="py-24 text-center">
            <p
              className="text-[#8c8c86] text-sm"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              카테고리를 불러올 수 없습니다. WordPress 연결을 확인해 주세요.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
