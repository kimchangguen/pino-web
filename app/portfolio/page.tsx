import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import PortfolioGallery from '@/components/portfolio/PortfolioGallery'
import { getPortfolioImages } from '@/lib/portfolio'

export const metadata: Metadata = {
  title: 'Portfolio | PINO STUDIO',
  description:
    '피노 스튜디오의 인물, 브랜드, 공간 기록 포트폴리오를 소개합니다.',
}

export default async function PortfolioPage() {
  const images = await getPortfolioImages()

  return (
    <main className="min-h-screen bg-[#faf7f0] text-[#111110]">
      <section className="px-5 pb-14 pt-32 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
            포트폴리오
          </p>
          <div className="grid gap-10 border-b border-[#1a1a18]/10 pb-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <h1 className="max-w-4xl text-[clamp(44px,7vw,96px)] font-medium leading-[0.96] text-[#111110]">
              선명한 인상을 남기는 따뜻한 기록
            </h1>
            <p className="max-w-xl text-[15px] leading-8 text-[#5d574f] lg:justify-self-end">
              인물의 태도, 브랜드의 분위기, 공간의 질감을 차분하게 정리한
              피노 스튜디오의 포트폴리오입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="px-1 pb-28 sm:px-2">
        <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-5 lg:px-8">
          <div className="flex flex-col gap-5 border-y border-[#1a1a18]/10 py-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
                이미지 아카이브
              </p>
              <h2 className="text-3xl font-medium leading-tight text-[#111110] md:text-5xl">
                세로형 인물 사진 중심의 포트폴리오 갤러리
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#5d574f]">
              총 {images.length}컷의 이미지를 따뜻한 베이지 톤 위에 여백을
              줄인 masonry 구성으로 담았습니다.
            </p>
          </div>
        </div>

        <PortfolioGallery images={images} />
      </section>

      <Footer />
    </main>
  )
}
