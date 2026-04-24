import { getPosts } from '@/lib/wordpress'
import BlogGrid from '@/components/blog/BlogGrid'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog | PINO STUDIO',
  description: '피노스튜디오의 촬영 이야기와 작업 기록을 담은 블로그입니다.',
}

export default async function BlogPage() {
  const posts = await getPosts(30)

  return (
    <main className="min-h-screen" style={{ background: '#fafaf6' }}>
      {/* Page header */}
      <div
        className="pt-36 pb-16 border-b border-[#e5e2da]"
        style={{ background: '#fafaf6' }}
      >
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
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400,
            }}
          >
            이야기 & 작업 기록
          </h1>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <BlogGrid posts={posts} />
      </div>

      <Footer />
    </main>
  )
}
