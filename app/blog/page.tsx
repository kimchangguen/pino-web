import { Suspense } from 'react'
import { getCategories, getPostsByCategory } from '@/lib/wordpress'
import CategoryTabs from '@/components/blog/CategoryTabs'
import PostList from '@/components/blog/PostList'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | PINO STUDIO',
  description: '피노스튜디오의 촬영 이야기, 후기, 가이드 등 다양한 이야기를 담은 블로그입니다.',
}

interface BlogPageProps {
  searchParams: Promise<{ cat?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { cat } = await searchParams

  // 카테고리 목록 먼저 fetch → 슬러그로 ID 조회
  const categories = await getCategories()
  const activeCat = cat ? categories.find((c) => c.slug === cat) : undefined

  // 포스트는 카테고리 ID 확인 후 fetch (병렬 불가 – ID 의존)
  const posts = await getPostsByCategory(activeCat?.id, 30)

  return (
    <main className="min-h-screen bg-[#fafaf6]">
      {/* ── 페이지 헤더 ── */}
      <div className="pt-36 pb-10 bg-[#fafaf6]">
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
            이야기 & 작업 기록
          </h1>
        </div>
      </div>

      {/* ── 카테고리 탭 (sticky) ── */}
      <CategoryTabs categories={categories} activeSlug={activeCat?.slug} />

      {/* ── 포스트 리스트 ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16 min-h-[50vh]">
        {activeCat && (
          <p
            className="text-[#8c8c86] text-xs tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {activeCat.name} · {posts.length}개의 글
          </p>
        )}

        <Suspense
          fallback={
            <div
              className="py-20 text-center text-[#8c8c86] text-sm"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              글을 불러오는 중...
            </div>
          }
        >
          <PostList posts={posts} activeSlug={activeCat?.slug} />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}
