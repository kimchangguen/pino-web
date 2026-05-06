import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'
import {
  getPortfolioImages,
  getPortfolioPreviewImages,
} from '@/lib/portfolio'

export default async function HomePage() {
  const portfolioImages = await getPortfolioImages()

  return (
    <main className="bg-[#faf7f0] text-[#111110]">
      <HeroSection />
      <AboutSection />
      <PortfolioSection images={getPortfolioPreviewImages(portfolioImages)} />
      <ContactSection />
      <Footer />
    </main>
  )
}
