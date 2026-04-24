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
      <main className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-white pb-10 pt-24 sm:pt-32">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%]" aria-hidden="true">
            <svg
              viewBox="0 0 600 440"
              className="absolute right-0 top-0 h-full w-full opacity-[0.05]"
              preserveAspectRatio="xMaxYMid slice"
            >
              <ellipse cx="490" cy="210" rx="360" ry="290" fill="#020617" />
              <ellipse cx="410" cy="70" rx="200" ry="155" fill="#b89662" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-blog-orange">
              PINO STUDIO BLOG
            </p>
            <h1
              className="text-3xl font-medium leading-[1.15] tracking-normal text-slate-950 sm:text-4xl lg:text-[3.25rem]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {activeCat.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-slate-500 sm:text-[1.0625rem]">
              프로필 촬영의 무드, 스타일, 결과물을 카테고리별로 확인하세요.
            </p>
          </div>
        </section>

        <CategoryTabs categories={categories} activeSlug={activeCat.slug} />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Suspense>
            <PostList posts={posts} activeSlug={activeCat.slug} />
          </Suspense>
        </div>

        <Footer />
      </main>
    )
  }

  const [featuredPosts, postsPerCategory] = await Promise.all([
    getPosts(5),
    Promise.all(
      CATEGORY_ORDER.map((def) => {
        const found = categories.find((c) => c.slug === def.slug)
        return found ? getPostsByCategory(found.id, 6) : Promise.resolve([])
      })
    ),
  ])

  const sections = CATEGORY_ORDER.flatMap((def, i) => {
    const category = categories.find((c) => c.slug === def.slug)
    if (!category || postsPerCategory[i].length === 0) return []
    return [{ category, posts: postsPerCategory[i] }]
  })

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <BlogHero posts={featuredPosts} />
      <CategoryTabs categories={categories} activeSlug={undefined} />

      <div id="categories" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        {sections.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
            <p className="text-sm font-medium text-slate-500">
              카테고리를 불러오지 못했습니다. WordPress 연결을 확인해 주세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-14 gap-y-14 md:grid-cols-2">
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
