import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost, getFeaturedImage, formatDate } from '@/lib/wordpress'
import Footer from '@/components/Footer'

interface BlogPostPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) return { title: 'Not Found | PINO STUDIO' }
  return {
    title: `${post.title.rendered} | PINO STUDIO`,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  const image = getFeaturedImage(post)

  return (
    <main className="min-h-screen" style={{ background: '#fafaf6' }}>
      {/* Hero image */}
      {image && (
        <div className="w-full h-[55vh] md:h-[65vh] overflow-hidden relative">
          <img
            src={image}
            alt={post.title.rendered}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111110]/60 to-transparent" />
        </div>
      )}

      {/* Article */}
      <article
        className={`max-w-3xl mx-auto px-6 lg:px-0 ${image ? '-mt-24 relative z-10' : 'pt-36'}`}
      >
        {/* Meta */}
        <div
          className={`${image ? 'mb-8' : 'mb-10'}`}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <p className="text-[#c8a876] text-[10px] tracking-[0.35em] uppercase mb-4">
            {formatDate(post.date)}
          </p>
          <h1
            className={`leading-tight ${image ? 'text-white' : 'text-[#1a1a18]'}`}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
              fontWeight: 400,
            }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-[#c8a876] mb-10" />

        {/* Content */}
        <div
          className="wp-content pb-20"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Back link */}
        <div className="border-t border-[#e5e2da] pt-10 pb-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8c8c86] hover:text-[#c8a876] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            ← 블로그 목록으로
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
