import type { Metadata } from 'next'
import FacilitiesGallery from '@/components/facilities/FacilitiesGallery'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Facilities | PINO STUDIO',
  description: '피노 스튜디오의 촬영 공간과 준비 공간을 소개합니다.',
}

const facilityDetails = [
  '자연광과 인공광을 함께 다루는 촬영 존',
  '프로필과 브랜드 이미지를 위한 조명 구성',
  '메이크업과 스타일링을 준비할 수 있는 독립 공간',
  '상담과 셀렉을 위한 차분한 대기 공간',
]

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-[#faf7f0] text-[#111110]">
      <section className="px-5 pb-20 pt-32 lg:px-12 lg:pb-28 lg:pt-40">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
            시설
          </p>
          <div className="grid gap-10 border-b border-[#1a1a18]/10 pb-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <h1 className="max-w-3xl text-[clamp(44px,7vw,96px)] font-medium leading-[0.96] text-[#111110]">
              촬영 전부터 편안해지는 공간.
            </h1>
            <p className="max-w-xl text-[15px] leading-8 text-[#5d574f] lg:justify-self-end">
              부드러운 빛과 정적이 흐르는 내부, 촬영을 준비하는 모든 과정이 안정적으로
              이어지도록 설계한 피노 스튜디오의 공간입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-5 border-y border-[#1a1a18]/10 py-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
                공간 갤러리
              </p>
              <h2 className="text-3xl font-medium leading-tight text-[#111110] md:text-5xl">
                스튜디오의 빛과 구조를 담은 장면들
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#5d574f]">
              촬영 존, 스타일링 코너, 대기 공간과 세부 오브제를 한눈에 볼 수 있도록
              담았습니다.
            </p>
          </div>

          <FacilitiesGallery />
        </div>
      </section>

      <section className="border-y border-[#1a1a18]/10 bg-[#f4efe6] px-5 py-24 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
              촬영을 위한 준비
            </p>
            <h2 className="max-w-xl text-4xl font-medium leading-tight text-[#111110] md:text-5xl">
              작은 불편함도 줄여 촬영에만 집중할 수 있도록.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {facilityDetails.map((detail) => (
              <div
                key={detail}
                className="border border-[#1a1a18]/10 bg-[#fffaf3] px-6 py-5 text-sm leading-7 text-[#4b4740]"
              >
                {detail}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
