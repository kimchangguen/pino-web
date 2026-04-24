import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { getFeaturedImage, stripHtml } from '@/lib/wordpress'

interface PostCardProps {
  post: WPPost
}

export default function PostCard({ post }: PostCardProps) {
  const image = getFeaturedImage(post)

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={stripHtml(post.title.rendered)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 to-slate-700 text-white">
            <span
              className="text-3xl italic text-white/45"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              PINO
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3
          className="line-clamp-2 min-h-[38px] text-[13px] font-semibold leading-[1.45] text-slate-900 transition group-hover:text-blog-orange"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </Link>
  )
}
