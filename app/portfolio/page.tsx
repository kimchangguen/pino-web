import { readdir } from 'fs/promises'
import path from 'path'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import PortfolioGallery, {
  type PortfolioImage,
} from '@/components/portfolio/PortfolioGallery'

export const metadata: Metadata = {
  title: 'Portfolio | PINO STUDIO',
  description: '피노 스튜디오의 인물, 브랜드, 공간 기록 포트폴리오를 소개합니다.',
}

async function getPortfolioImages(): Promise<PortfolioImage[]> {
  const portfolioDir = path.join(process.cwd(), 'public', 'images', 'portfolio')

  try {
    const files = await readdir(portfolioDir)

    return files
      .map((file) => {
        const match = /^portfolio \((\d+)\)\.jpg$/i.exec(file)
        if (!match) return null

        const id = Number(match[1])
        if (id < 1 || id > 100) return null

        return {
          id,
          src: `/images/portfolio/${encodeURIComponent(file)}`,
          alt: `PINO STUDIO 포트폴리오 ${id}`,
        }
      })
      .filter((image): image is PortfolioImage => image !== null)
      .sort((a, b) => a.id - b.id)
  } catch {
    return []
  }
}

export default async function PortfolioPage() {
  const images = await getPortfolioImages()

  return (
    <main className="min-h-screen bg-[#faf7f0] text-[#111110]">
      <section className="px-5 pb-16 pt-32 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
            포트폴리오
          </p>
          <div className="grid gap-10 border-b border-[#1a1a18]/10 pb-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <h1 className="max-w-4xl text-[clamp(44px,7vw,96px)] font-medium leading-[0.96] text-[#111110]">
              선명한 인상을 남긴 기록들.
            </h1>
            <p className="max-w-xl text-[15px] leading-8 text-[#5d574f] lg:justify-self-end">
              인물의 태도, 브랜드의 분위기, 공간의 질감을 차분하게 정리한 피노 스튜디오의
              포트폴리오입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-5 border-y border-[#1a1a18]/10 py-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
                이미지 아카이브
              </p>
              <h2 className="text-3xl font-medium leading-tight text-[#111110] md:text-5xl">
                천천히 둘러보는 포트폴리오 갤러리
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#5d574f]">
              총 {images.length}장의 이미지를 최적화된 방식으로 불러오며, 클릭하면 전체 화면으로
              자세히 확인할 수 있습니다.
            </p>
          </div>

          <PortfolioGallery images={images} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
