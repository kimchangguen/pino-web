import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { getFeaturedImage, stripHtml } from '@/lib/wordpress'

interface PostCardProps {
  post: WPPost
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const image = getFeaturedImage(post)

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group relative block h-full overflow-hidden bg-slate-950"
    >
      <div className={featured ? 'aspect-[4/5] h-full' : 'aspect-[4/5]'}>
        {image ? (
          <img
            src={image}
            alt={stripHtml(post.title.rendered)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-950">
            <span
              className="text-3xl italic text-white/35"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              PINO
            </span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/0 to-transparent opacity-80 transition duration-300 group-hover:opacity-95" />
      <div className="absolute bottom-0 left-0 right-0 translate-y-1 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3
          className="line-clamp-2 text-[18px] font-medium leading-tight text-white"
          style={{ fontFamily: 'var(--font-display)' }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </Link>
  )
}
