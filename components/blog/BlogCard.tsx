import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { formatDate, getFeaturedImage, stripHtml } from '@/lib/wordpress'

interface BlogCardProps {
  post: WPPost
  priority?: boolean
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const image = getFeaturedImage(post)
  const excerpt = stripHtml(post.excerpt.rendered)
  const categoryName = post.categories?.[0]?.name

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.12)]">
      <Link href={`/blog/${post.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          {image ? (
            <img
              src={image}
              alt={stripHtml(post.title.rendered)}
              loading={priority ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 to-slate-700">
              <span
                className="text-4xl italic text-white/45"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                PINO
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/0 to-transparent opacity-0 transition group-hover:opacity-100" />
          {categoryName && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-900 shadow-sm backdrop-blur">
              {categoryName}
            </span>
          )}
        </div>

        <div className="p-5">
          <p className="mb-2 text-[11px] font-semibold text-[#b89662]">
            {formatDate(post.date)}
          </p>
          <h2
            className="line-clamp-2 text-[20px] font-semibold leading-snug text-slate-950 transition group-hover:text-[#b89662]"
            style={{ fontFamily: 'var(--font-display)' }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          {excerpt && (
            <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-slate-500">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
