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
    '광고 운영 노하우, 콘텐츠 제작 팁, 브랜드 성장 인사이트를 전하는 애드그릿 블로그입니다.',
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
      <main className="min-h-screen bg-blog-wash">
        <section className="blog-rings bg-white pt-28 md:pt-32">
          <div className="mx-auto max-w-[1080px] px-5 pb-9 sm:px-8">
            <p className="mb-2 text-[11px] font-extrabold text-blog-orange">
              ADGRIT BLOG
            </p>
            <h1 className="text-[34px] font-black leading-tight tracking-normal text-blog-navy sm:text-[42px]">
              {activeCat.name}
            </h1>
            <p className="mt-3 text-[13px] leading-6 text-blog-muted">
              선택한 카테고리의 최신 글을 한눈에 살펴보세요.
            </p>
          </div>
        </section>

        <CategoryTabs categories={categories} activeSlug={activeCat.slug} />

        <div className="mx-auto max-w-[1080px] px-5 py-10 sm:px-8 md:py-12">
          <div className="mb-5 flex items-center gap-2 border-b-2 border-blog-blue pb-2">
            <span className="h-2 w-2 bg-blog-orange" />
            <p className="text-[13px] font-extrabold text-blog-navy">
              {activeCat.name} · {posts.length}개의 글
            </p>
          </div>
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
    <main className="min-h-screen bg-blog-wash">
      <BlogHero posts={featuredPosts} />

      <div className="mx-auto max-w-[1080px] px-5 pb-20 pt-9 sm:px-8 md:pb-24">
        {sections.length === 0 ? (
          <div className="rounded-[5px] border border-blog-border bg-white py-20 text-center">
            <p className="text-sm font-semibold text-blog-muted">
              카테고리를 불러오지 못했습니다. WordPress 연결을 확인해 주세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-9 gap-y-11 lg:grid-cols-2">
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
