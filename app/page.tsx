import { getPosts } from '@/lib/wordpress'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const posts = await getPosts(6)

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PortfolioSection posts={posts} />
      <ContactSection />
      <Footer />
    </main>
  )
}
