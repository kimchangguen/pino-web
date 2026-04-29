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
  if (!post) return { title: '글을 찾을 수 없습니다 | PINO STUDIO' }
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
    <main className="min-h-screen bg-[#faf7f0] text-[#111110]">
      {image && (
        <div className="relative h-[55vh] w-full overflow-hidden md:h-[65vh]">
          <img
            src={image}
            alt={post.title.rendered}
            className="h-full w-full object-cover brightness-[0.94]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-black/10 to-transparent" />
        </div>
      )}

      <article
        className={`mx-auto max-w-3xl px-5 ${image ? 'relative z-10 -mt-24' : 'pt-36'}`}
      >
        <div className={`${image ? 'mb-8' : 'mb-10'}`}>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a6f48]">
            {formatDate(post.date)}
          </p>
          <h1
            className={`text-[clamp(30px,4vw,48px)] font-medium leading-tight ${
              image ? 'text-white' : 'text-[#111110]'
            }`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>

        <div className="mb-10 h-px w-12 bg-[#8a6f48]" />

        <div
          className="wp-content pb-20"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <div className="border-t border-[#1a1a18]/10 pb-20 pt-10">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] text-[#6f6a61] transition hover:text-[#111110]"
          >
            인사이트 목록으로
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
