import { Suspense } from 'react'
import type { Metadata } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import CategorySection from '@/components/blog/CategorySection'
import CategoryTabs from '@/components/blog/CategoryTabs'
import Footer from '@/components/Footer'
import PostList from '@/components/blog/PostList'
import {
  CATEGORY_ORDER,
  getCategories,
  getPosts,
  getPostsByCategory,
} from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Blog | PINO STUDIO',
  description:
    '배우, 강사, 비즈니스 프로필부터 개인 화보까지 PINO STUDIO의 프로필 사진 포트폴리오와 촬영 이야기를 전합니다.',
}

interface BlogPageProps {
  searchParams: Promise<{ cat?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { cat } = await searchParams
  const categories = await getCategories()
  const activeCat = cat ? categories.find((c) => c.slug === cat) : undefined

  if (activeCat) {
    const posts = await getPostsByCategory(activeCat.id, 30)

    return (
      <main className="min-h-screen bg-white">
        <section className="blog-rings bg-white pt-28 md:pt-32">
          <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-12">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-blog-orange">
              PINO STUDIO JOURNAL
            </p>
            <h1
              className="text-[42px] font-medium leading-tight tracking-normal text-blog-navy sm:text-[56px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {activeCat.name}
            </h1>
            <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-blog-muted">
              프로필 사진의 분위기, 표정, 스타일을 큼직한 이미지로 살펴보세요.
            </p>
          </div>
        </section>

        <CategoryTabs categories={categories} activeSlug={activeCat.slug} />

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <Suspense>
            <PostList posts={posts} activeSlug={activeCat.slug} />
          </Suspense>
        </div>

        <Footer />
      </main>
    )
  }

  const [featuredPosts, postsPerCategory] = await Promise.all([
    getPosts(6),
    Promise.all(
      CATEGORY_ORDER.map((def) => {
        const found = categories.find((c) => c.slug === def.slug)
        return found ? getPostsByCategory(found.id, 7) : Promise.resolve([])
      })
    ),
  ])

  const sections = CATEGORY_ORDER.flatMap((def, i) => {
    const category = categories.find((c) => c.slug === def.slug)
    if (!category || postsPerCategory[i].length === 0) return []
    return [{ category, posts: postsPerCategory[i] }]
  })

  return (
    <main className="min-h-screen bg-white">
      <BlogHero posts={featuredPosts} />

      <div className="mx-auto max-w-7xl space-y-16 px-5 pb-24 pt-6 sm:px-8 md:pb-28 lg:px-12">
        {sections.length === 0 ? (
          <div className="border border-slate-200 bg-white py-20 text-center">
            <p className="text-sm font-medium text-blog-muted">
              카테고리를 불러오지 못했습니다. WordPress 연결을 확인해 주세요.
            </p>
          </div>
        ) : (
          sections.map(({ category, posts }, i) => (
            <CategorySection
              key={category.slug}
              category={category}
              posts={posts}
              index={i}
            />
          ))
        )}
      </div>

      <Footer />
    </main>
  )
}
