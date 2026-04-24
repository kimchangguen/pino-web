import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { getFeaturedImage, formatDate } from '@/lib/wordpress'

interface PostCardProps {
  post: WPPost
}

export default function PostCard({ post }: PostCardProps) {
  const image = getFeaturedImage(post)

  return (
    <Link href={`/blog/${post.id}`} className="group block">
      {/* 썸네일 */}
      <div className="aspect-[4/3] overflow-hidden mb-4 bg-[#1c1c1a]">
        {image ? (
          <img
            src={image}
            alt={post.title.rendered}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1c1c1a 0%, #2e2b26 100%)' }}
          >
            <span
              className="text-[#c8a876]/30 text-4xl"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {post.title.rendered.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* 날짜 */}
      <p
        className="text-[#c8a876] text-[10px] tracking-[0.28em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {formatDate(post.date)}
      </p>

      {/* 제목 */}
      <h3
        className="text-[#1a1a18] leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#c8a876]"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
          fontWeight: 400,
        }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
    </Link>
  )
}
