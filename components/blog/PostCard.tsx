import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { formatDate, getFeaturedImage, stripHtml } from '@/lib/wordpress'

interface PostCardProps {
  post: WPPost
}

export default function PostCard({ post }: PostCardProps) {
  const image = getFeaturedImage(post)

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block overflow-hidden rounded-[5px] border border-blog-border bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-blog-blue/35 hover:shadow-[0_8px_20px_rgba(15,23,42,0.11)]"
    >
      <div className="aspect-[1.32/1] overflow-hidden bg-blog-wash">
        {image ? (
          <img
            src={image}
            alt={stripHtml(post.title.rendered)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#102764,#1f6fd2)] px-3 text-center">
            <span className="text-[12px] font-black leading-tight text-white">
              ADGRIT
              <br />
              BLOG
            </span>
          </div>
        )}
      </div>
      <div className="px-2.5 pb-3 pt-2.5">
        <p className="mb-1 text-[9px] font-bold leading-none text-blog-orange">
          {formatDate(post.date)}
        </p>
        <h3
          className="line-clamp-2 min-h-[34px] text-[12px] font-bold leading-[1.42] tracking-normal text-blog-ink transition group-hover:text-blog-blue"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </Link>
  )
}
