import type { Metadata } from 'next'
import FacilitiesGallery from '@/components/facilities/FacilitiesGallery'

export const metadata: Metadata = {
  title: 'Facilities | PINO STUDIO',
  description:
    'Explore the interior spaces, shooting zones, and client-ready facilities at PINO STUDIO.',
}

const facilityDetails = [
  'Multiple shooting zones',
  'Professional lighting setup',
  'Private makeup and styling area',
  'Comfortable client lounge',
]

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-[#fafaf6] text-[#1a1a18]">
      <section className="px-6 pb-24 pt-32 lg:px-12 lg:pb-32 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-light uppercase tracking-[0.38em] text-[#c8a876]">
            Facilities
          </p>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.95] tracking-normal text-[#111110]">
                Inside Pino Studio
              </h1>
            </div>
            <p className="max-w-2xl text-base font-light leading-8 text-[#6b6b65] lg:justify-self-end">
              A refined photography space designed around soft light, quiet
              movement, and the comfort needed for a confident portrait session.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 border-y border-[#ded8cc] py-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#c8a876]">
                Facility Gallery
              </p>
              <h2 className="text-3xl font-normal leading-tight text-[#111110] md:text-5xl">
                Thirty quiet views of the studio.
              </h2>
            </div>
            <p className="max-w-lg text-sm font-light leading-7 text-[#6b6b65]">
              Natural light, portrait zones, styling corners, and client-ready
              details gathered in a magazine-style gallery.
            </p>
          </div>

          <FacilitiesGallery />
        </div>
      </section>

      <section className="bg-[#111110] px-6 py-24 text-white lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-light uppercase tracking-[0.34em] text-[#c8a876]">
              Studio Ready
            </p>
            <h2 className="max-w-xl text-4xl font-normal leading-tight md:text-5xl">
              Prepared for portraits, branding, and meaningful records.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {facilityDetails.map((detail) => (
              <div
                key={detail}
                className="border border-white/12 bg-white/[0.04] px-6 py-5 text-sm font-light uppercase tracking-[0.16em] text-white/72"
              >
                {detail}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
