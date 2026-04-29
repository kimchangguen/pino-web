import Link from 'next/link'
import type { Metadata } from 'next'
import BlogHero from '@/components/blog/BlogHero'
import CategorySection from '@/components/blog/CategorySection'
import Footer from '@/components/Footer'
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
  title: 'Insights | PINO STUDIO',
  description:
    '촬영 준비와 스튜디오 소식, 포트폴리오 기록을 차분하게 정리한 피노 스튜디오 인사이트입니다.',
}

export default async function BlogPage() {
  const categories = await getCategories()

  const [featuredPosts, latestPosts, categoryGroups] = await Promise.all([
    getPosts(5),
    getPosts(12),
    Promise.all(
      categories.map(async (category) => ({
        category,
        posts: await getPostsByCategory(category.id, 6),
      }))
    ),
  ])

  return (
    <main className="min-h-screen bg-[#faf7f0] text-[#111110]">
      <section className="px-5 pb-16 pt-32 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
            인사이트
          </p>
          <div className="grid gap-10 border-b border-[#1a1a18]/10 pb-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <h1 className="max-w-4xl text-[clamp(44px,7vw,96px)] font-medium leading-[0.96] text-[#111110]">
              촬영을 더 깊이 이해하는 기록.
            </h1>
            <p className="max-w-xl text-[15px] leading-8 text-[#5d574f] lg:justify-self-end">
              촬영 전 준비, 현장 분위기, 포트폴리오의 맥락을 정리해 더 나은 선택을 돕습니다.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 pb-24 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)] lg:gap-10">
        <div className="min-w-0 space-y-10">
          <BlogHero posts={featuredPosts} />

          <div className="grid grid-cols-1 gap-5 border border-[#1a1a18]/10 bg-[#fffaf3] p-5 sm:p-7 xl:grid-cols-2">
            {categoryGroups.map(({ category, posts }, index) => (
              <CategorySection
                key={category.id}
                category={category}
                posts={posts}
                index={index}
              />
            ))}
          </div>
        </div>

        <BlogSidebar posts={latestPosts} />
      </div>

      <Footer />
    </main>
  )
}

function BlogSidebar({ posts }: { posts: WPPost[] }) {
  const bannerPost = posts[0]
  const bannerImage = bannerPost ? getFeaturedImage(bannerPost) : null

  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <section className="overflow-hidden border border-[#1a1a18]/10 bg-[#fffaf3] text-[#111110]">
        <div className="relative h-56 overflow-hidden">
          {bannerImage ? (
            <img
              src={bannerImage}
              alt={stripHtml(bannerPost.title.rendered)}
              className="h-full w-full object-cover brightness-[0.92]"
            />
          ) : (
            <div className="h-full w-full bg-[#eee6da]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/12 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/76">
              촬영 상담
            </p>
            <h3 className="text-2xl font-medium leading-tight text-white">
              나에게 맞는 촬영 방향을 함께 정리해보세요.
            </h3>
          </div>
        </div>
        <div className="p-5">
          <Link
            href="/#contact"
            className="inline-flex w-full items-center justify-center bg-[#111110] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a2824]"
          >
            촬영 문의하기
          </Link>
        </div>
      </section>

      <section className="border border-[#1a1a18]/10 bg-[#fffaf3] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-[#111110]">최근 글</h3>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#8a6f48]">
            최신
          </span>
        </div>
        <div className="space-y-4">
          {posts.slice(0, 5).map((post) => {
            const image = getFeaturedImage(post)
            return (
              <Link key={post.id} href={`/blog/${post.id}`} className="group flex gap-3">
                <div className="h-16 w-20 shrink-0 overflow-hidden bg-[#eee6da]">
                  {image ? (
                    <img
                      src={image}
                      alt={stripHtml(post.title.rendered)}
                      className="h-full w-full object-cover brightness-[0.96] transition duration-500 group-hover:scale-105 group-hover:brightness-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#eee6da]" />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className="line-clamp-2 text-sm font-medium leading-snug text-[#111110] transition group-hover:text-[#8a6f48]"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="mt-1 text-[11px] text-[#8f887d]">{formatDate(post.date)}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border border-[#1a1a18]/10 bg-[#fffaf3] p-5">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#8a6f48]">
          인스타그램
        </p>
        <h3 className="text-2xl font-medium leading-tight text-[#111110]">
          촬영 현장의 분위기를 더 가까이 확인하세요.
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#5d574f]">
          최신 프로필 사진과 스튜디오의 조용한 순간들을 인스타그램에서 만나보실 수 있습니다.
        </p>
        <a
          href="https://www.instagram.com/pinostudio_official"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center border border-[#111110]/18 px-5 py-3 text-sm font-medium text-[#111110] transition hover:bg-[#111110] hover:text-white"
        >
          Instagram 보기
        </a>
      </section>
    </aside>
  )
}
