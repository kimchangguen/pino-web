'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

const aspectRatios = [
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[5/4]',
  'aspect-[4/3]',
  'aspect-[2/3]',
  'aspect-[1/1]',
]

const facilities = Array.from({ length: 30 }, (_, index) => {
  const number = index + 1
  return {
    id: number,
    src: `/images/facilities/facility%20(${number}).jpg`,
    alt: `PINO STUDIO 시설 이미지 ${number}`,
  }
})

export default function FacilitiesGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex === null ? null : facilities[activeIndex]

  const columns = useMemo(() => {
    return [
      facilities.filter((_, index) => index % 3 === 0),
      facilities.filter((_, index) => index % 3 === 1),
      facilities.filter((_, index) => index % 3 === 2),
    ]
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + facilities.length) % facilities.length
        )
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % facilities.length
        )
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex])

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4 lg:space-y-5">
            {column.map((image, imageIndex) => {
              const originalIndex = facilities.findIndex((item) => item.id === image.id)
              const ratio = aspectRatios[(image.id + columnIndex + imageIndex) % aspectRatios.length]

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveIndex(originalIndex)}
                  className="group block w-full overflow-hidden bg-[#eee6da] text-left shadow-[0_18px_42px_rgba(90,70,42,0.12)]"
                  aria-label={`${image.alt} 크게 보기`}
                >
                  <span className={`relative block ${ratio}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 92vw"
                      className="object-cover brightness-[0.98] transition duration-700 group-hover:scale-[1.035] group-hover:brightness-105"
                    />
                    <span className="absolute inset-0 bg-[#111110]/0 transition duration-500 group-hover:bg-[#111110]/8" />
                    <span className="absolute bottom-3 left-3 bg-[#fffaf3]/92 px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-[#111110] opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
                      크게 보기
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="시설 사진 크게 보기"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border border-white/20 bg-white/10 text-lg font-semibold text-white transition hover:bg-white hover:text-black"
          >
            X
          </button>

          <button
            type="button"
            aria-label="이전 이미지"
            onClick={(event) => {
              event.stopPropagation()
              setActiveIndex((current) =>
                current === null
                  ? current
                  : (current - 1 + facilities.length) % facilities.length
              )
            }}
            className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/20 bg-white/10 text-xl font-semibold text-white transition hover:bg-white hover:text-black"
          >
            &lt;
          </button>

          <div
            className="relative h-full max-h-[86vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="94vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            aria-label="다음 이미지"
            onClick={(event) => {
              event.stopPropagation()
              setActiveIndex((current) =>
                current === null ? current : (current + 1) % facilities.length
              )
            }}
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/20 bg-white/10 text-xl font-semibold text-white transition hover:bg-white hover:text-black"
          >
            &gt;
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            {activeImage.id} / {facilities.length}
          </p>
        </div>
      )}
    </>
  )
}
