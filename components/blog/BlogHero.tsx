import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { getFeaturedImage, stripHtml } from '@/lib/wordpress'

interface BlogHeroProps {
  posts: WPPost[]
}

export default function BlogHero({ posts }: BlogHeroProps) {
  const featuredPosts = posts.slice(0, 3)
  const primaryPost = featuredPosts[0]

  return (
    <section className="blog-rings bg-white pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-16">
          <div className="max-w-[620px]">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.32em] text-blog-orange">
              PINO STUDIO JOURNAL
            </p>
            <h1
              className="text-[42px] font-medium leading-[1.05] tracking-normal text-blog-navy sm:text-[58px] lg:text-[64px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              시선을 머물게 하는 첫인상,
              <br />
              <span className="italic">PINO STUDIO</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-blog-muted">
              배우, 강사, 비즈니스 프로필부터 개인 화보까지. 당신의 가치를 증명하는
              단 한 장의 사진을 만듭니다.
            </p>
          </div>

          <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
            {primaryPost ? (
              <HeroImage post={primaryPost} className="col-span-5 row-span-2 sm:col-span-3" priority />
            ) : (
              <div className="col-span-5 row-span-2 aspect-[4/5] bg-slate-950 sm:col-span-3" />
            )}
            {featuredPosts.slice(1, 3).map((post) => (
              <HeroImage
                key={post.id}
                post={post}
                className="col-span-5 aspect-[4/3] sm:col-span-2"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroImage({
  post,
  className,
  priority = false,
}: {
  post: WPPost
  className: string
  priority?: boolean
}) {
  const image = getFeaturedImage(post)

  return (
    <Link
      href={`/blog/${post.id}`}
      className={`group relative block overflow-hidden bg-slate-950 ${className}`}
    >
      {image ? (
        <img
          src={image}
          alt={stripHtml(post.title.rendered)}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full min-h-[220px] w-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />
      ) : (
        <div className="flex h-full min-h-[220px] w-full items-center justify-center bg-slate-950 text-white">
          <span
            className="text-4xl italic text-white/45"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            PINO
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/58 via-slate-950/4 to-transparent opacity-80 transition group-hover:opacity-95" />
      <div className="absolute bottom-0 left-0 p-4 sm:p-5">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.24em] text-white/70">
          Portfolio
        </p>
        <h2
          className="line-clamp-2 text-[18px] font-medium leading-tight text-white sm:text-[22px]"
          style={{ fontFamily: 'var(--font-display)' }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </Link>
  )
}
