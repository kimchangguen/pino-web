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

  // ── 카테고리 필터 뷰 (/blog?cat=slug) ───────────────────────
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

  // ── 매거진 홈 뷰 (/blog) ────────────────────────────────────
  // 6개 카테고리 × 최신 9개 포스트 병렬 fetch
  const postsPerCategory = await Promise.all(
    CATEGORY_ORDER.map((def) => {
      const found = categories.find((c) => c.slug === def.slug)
      return found ? getPostsByCategory(found.id, 9) : Promise.resolve([])
    })
  )

  // 카테고리 + 포스트 쌍 구성 (포스트가 1개 이상인 것만)
  const sections = CATEGORY_ORDER.flatMap((def, i) => {
    const category = categories.find((c) => c.slug === def.slug)
    if (!category || postsPerCategory[i].length === 0) return []
    return [{ category, posts: postsPerCategory[i] }]
  })

  return (
    <main className="min-h-screen bg-[#fafaf6]">
      {/* ── 히어로 배너 ── */}
      <BlogHero />

      {/* ── 카테고리 섹션 (2컬럼 페어 레이아웃) ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-24">
        {sections.length === 0 ? (
          <div className="py-24 text-center">
            <p
              className="text-[#8c8c86] text-sm"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              카테고리를 불러올 수 없습니다. WordPress 연결을 확인해 주세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-14">
            {sections.map(({ category, posts }, i) => (
              <CategorySection
                key={category.slug}
                category={category}
                posts={posts}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
