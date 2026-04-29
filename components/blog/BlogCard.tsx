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
    <article className="group overflow-hidden border border-[#1a1a18]/10 bg-[#fffaf3] transition duration-300 hover:-translate-y-1 hover:border-[#111110]/22">
      <Link href={`/blog/${post.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#eee6da]">
          {image ? (
            <img
              src={image}
              alt={stripHtml(post.title.rendered)}
              loading={priority ? 'eager' : 'lazy'}
              className="h-full w-full object-cover brightness-[0.96] transition duration-700 group-hover:scale-105 group-hover:brightness-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#eee6da]">
              <span className="text-4xl font-medium text-[#8f887d]">PINO</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          {categoryName && (
            <span className="absolute left-4 top-4 bg-[#fffaf3]/90 px-3 py-1 text-[11px] font-bold text-[#111110] shadow-sm">
              {categoryName}
            </span>
          )}
        </div>

        <div className="p-5">
          <p className="mb-2 text-[11px] font-medium text-[#8a6f48]">
            {formatDate(post.date)}
          </p>
          <h2
            className="line-clamp-2 text-[20px] font-medium leading-snug text-[#111110] transition group-hover:text-[#8a6f48]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          {excerpt && (
            <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-[#5d574f]">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
