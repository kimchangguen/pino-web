import Link from 'next/link'
import { CATEGORY_ORDER } from '@/lib/wordpress'

export default function BlogHero() {
  return (
    <div
      className="relative overflow-hidden grain"
      style={{ background: 'linear-gradient(160deg, #131210 0%, #1e1c18 50%, #0e0d0b 100%)' }}
    >
      {/* 라디얼 글로우 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(200,168,118,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* 왼쪽: 타이틀 */}
          <div>
            <p
              className="text-[#c8a876] text-xs tracking-[0.4em] uppercase mb-5"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Pino Studio — Blog
            </p>
            <h1
              className="text-white leading-tight mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.015em',
              }}
            >
              빛과 순간을 담은<br />
              <em>피노스튜디오</em>의 모든 것
            </h1>
            <p
              className="text-white/50 text-sm leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              촬영 후기, 비하인드 스토리, 촬영 가이드까지<br />
              스튜디오의 모든 이야기를 한 곳에서 만나보세요.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/#contact"
                className="inline-flex items-center px-6 py-2.5 bg-[#c8a876] text-[#111110] text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#e0c99a] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                촬영 문의하기
              </a>
              <a
                href="/#portfolio"
                className="inline-flex items-center px-6 py-2.5 border border-white/20 text-white/60 text-xs tracking-[0.25em] uppercase hover:border-[#c8a876]/50 hover:text-[#c8a876] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                포트폴리오 보기
              </a>
            </div>
          </div>

          {/* 오른쪽: 카테고리 소제목 리스트 */}
          <div className="hidden lg:block">
            <p
              className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              카테고리
            </p>
            <ul className="space-y-3">
              {CATEGORY_ORDER.map((cat, i) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog?cat=${cat.slug}`}
                    className="group flex items-center gap-3 text-white/50 hover:text-[#c8a876] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    <span className="text-[#c8a876]/40 text-[10px] tabular-nums w-4">
                      0{i + 1}
                    </span>
                    <span className="text-sm group-hover:translate-x-1 transition-transform duration-300 inline-block">
                      {cat.label}
                    </span>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 하단 페이드 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #fafaf6)' }}
      />
    </div>
  )
}
