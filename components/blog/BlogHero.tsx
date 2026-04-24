export default function BlogHero() {
  return (
    <div
      className="relative overflow-hidden grain"
      style={{ background: 'linear-gradient(160deg, #131210 0%, #1e1c18 50%, #0e0d0b 100%)' }}
    >
      {/* 라디얼 하이라이트 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(200,168,118,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-20 md:pb-28">
        <div className="max-w-2xl">
          <p
            className="text-[#c8a876] text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Pino Studio Blog
          </p>

          <h1
            className="text-white leading-tight mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 400,
              letterSpacing: '-0.015em',
            }}
          >
            빛과 순간을 담은<br />
            <em>피노스튜디오</em> 이야기
          </h1>

          <p
            className="text-white/50 text-sm md:text-base leading-relaxed mb-10"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            촬영 후기부터 작업 비하인드, 포트폴리오까지<br className="hidden sm:block" />
            스튜디오의 모든 이야기를 담은 공간입니다.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/#contact"
              className="inline-flex items-center px-7 py-3 bg-[#c8a876] text-[#111110] text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#e0c99a] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              촬영 문의하기
            </a>
            <a
              href="/#portfolio"
              className="inline-flex items-center px-7 py-3 border border-white/20 text-white/70 text-xs tracking-[0.25em] uppercase hover:border-[#c8a876]/60 hover:text-[#c8a876] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              작업 포트폴리오
            </a>
          </div>
        </div>
      </div>

      {/* 하단 그라디언트 페이드 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #fafaf6)' }} />
    </div>
  )
}
