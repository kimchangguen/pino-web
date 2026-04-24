import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import BlogCard from '@/components/blog/BlogCard'
import BlogHero from '@/components/blog/BlogHero'
import CategoryTabs from '@/components/blog/CategoryTabs'
import Footer from '@/components/Footer'
import PostList from '@/components/blog/PostList'
import {
  formatDate,
  getCategories,
  getFeaturedImage,
  getPosts,
  getPostsByCategory,
  stripHtml,
  type WPPost,
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
  const activeCat = cat ? categories.find((category) => category.slug === cat) : undefined

  const [featuredPosts, latestPosts, activePosts] = await Promise.all([
    getPosts(5),
    getPosts(12),
    activeCat ? getPostsByCategory(activeCat.id, 18) : Promise.resolve(null),
  ])

  const visiblePosts = activePosts || latestPosts

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="relative overflow-hidden bg-white pb-10 pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%]" aria-hidden="true">
          <svg
            viewBox="0 0 600 440"
            className="absolute right-0 top-0 h-full w-full opacity-[0.055]"
            preserveAspectRatio="xMaxYMid slice"
          >
            <ellipse cx="490" cy="210" rx="360" ry="290" fill="#020617" />
            <ellipse cx="410" cy="70" rx="200" ry="155" fill="#b89662" />
            <ellipse cx="550" cy="370" rx="170" ry="130" fill="#020617" />
          </svg>
          <svg
            viewBox="0 0 600 440"
            className="absolute right-0 top-0 h-full w-full opacity-[0.055]"
            preserveAspectRatio="xMaxYMid slice"
          >
            {[210, 254, 298, 342, 386, 430].map((y) => (
              <path
                key={y}
                d={`M -60 ${y} Q 150 ${y - 75} 310 ${y} T 660 ${y}`}
                stroke="#020617"
                strokeWidth="1.5"
                fill="none"
              />
            ))}
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#b89662]">
            PINO STUDIO BLOG
          </p>
          <h1
            className="text-3xl font-medium leading-[1.15] tracking-normal text-slate-950 sm:text-4xl lg:text-[3.25rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            시선을 머물게 하는 첫인상,
            <br />
            <span className="italic">PINO STUDIO</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-slate-500 sm:text-[1.0625rem]">
            배우, 강사, 비즈니스 프로필부터 개인 화보까지. 당신의 가치를 증명하는
            단 한 장의 사진을 만듭니다.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)] lg:gap-10 lg:px-8">
        <div className="min-w-0 space-y-8">
          <BlogHero posts={featuredPosts} />

          <CategoryTabs categories={categories} activeSlug={activeCat?.slug} />

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-7">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b89662]">
                  {activeCat ? 'Selected Category' : 'Latest Portfolio'}
                </p>
                <h2
                  className="text-2xl font-medium leading-tight text-slate-950 sm:text-3xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {activeCat ? activeCat.name : '최근 촬영 이야기'}
                </h2>
              </div>
              {activeCat && (
                <Link
                  href="/blog"
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 transition hover:border-slate-950 hover:text-slate-950"
                >
                  전체 보기
                </Link>
              )}
            </div>

            <Suspense>
              {activeCat ? (
                <PostList posts={visiblePosts} activeSlug={activeCat.slug} />
              ) : visiblePosts.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {visiblePosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} priority={index < 2} />
                  ))}
                </div>
              )}
            </Suspense>
          </section>
        </div>

        <BlogSidebar posts={latestPosts} />
      </div>

      <Footer />
    </main>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 py-20 text-center">
      <p className="text-sm font-medium text-slate-500">
        게시글을 불러오지 못했습니다. WPGraphQL 연결을 확인해 주세요.
      </p>
    </div>
  )
}

function BlogSidebar({ posts }: { posts: WPPost[] }) {
  const bannerPost = posts[0]
  const bannerImage = bannerPost ? getFeaturedImage(bannerPost) : null

  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
        <div className="relative h-56 overflow-hidden">
          {bannerImage ? (
            <img
              src={bannerImage}
              alt={stripHtml(bannerPost.title.rendered)}
              className="h-full w-full object-cover opacity-80"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-950 to-slate-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#e8d3ad]">
              Profile Studio
            </p>
            <h3
              className="text-2xl font-medium leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              당신의 첫인상을 설계하는 사진
            </h3>
          </div>
        </div>
        <div className="p-5">
          <Link
            href="/#contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e8d3ad]"
          >
            촬영 문의하기
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-950">최근 글</h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b89662]">
            New
          </span>
        </div>
        <div className="space-y-4">
          {posts.slice(0, 5).map((post) => {
            const image = getFeaturedImage(post)
            return (
              <Link key={post.id} href={`/blog/${post.id}`} className="group flex gap-3">
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {image ? (
                    <img
                      src={image}
                      alt={stripHtml(post.title.rendered)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-900" />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className="line-clamp-2 text-sm font-semibold leading-snug text-slate-800 transition group-hover:text-[#b89662]"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="mt-1 text-[11px] text-slate-400">{formatDate(post.date)}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b89662]">
          Instagram
        </p>
        <h3
          className="text-2xl font-medium leading-tight text-slate-950"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          촬영 현장의 분위기를 더 가까이
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          최신 프로필 사진, 현장 비하인드, 스타일링 레퍼런스를 인스타그램에서 확인하세요.
        </p>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-slate-950 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-950 hover:text-white"
        >
          Instagram 보기
        </a>
      </section>
    </aside>
  )
}
