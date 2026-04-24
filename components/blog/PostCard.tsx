import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { getFeaturedImage, formatDate } from '@/lib/wordpress'

interface PostCardProps {
  post: WPPost
  compact?: boolean
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  const image = getFeaturedImage(post)

  return (
    <Link href={`/blog/${post.id}`} className="group block">
      {/* 썸네일 */}
      <div className={`overflow-hidden ${compact ? 'aspect-[4/3]' : 'aspect-[4/3]'} bg-[#1c1c1a] mb-2.5`}>
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
              className={`text-[#c8a876]/30 ${compact ? 'text-2xl' : 'text-4xl'}`}
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {post.title.rendered.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* 날짜 */}
      <p
        className="text-[#c8a876] tracking-[0.25em] uppercase mb-1.5"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: compact ? '9px' : '10px',
        }}
      >
        {formatDate(post.date)}
      </p>

      {/* 제목 */}
      <h3
        className="text-[#1a1a18] leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#c8a876]"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: compact ? 'clamp(0.8125rem, 1.2vw, 0.9375rem)' : 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
          fontWeight: 400,
        }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
    </Link>
  )
}
