import { HeroSection } from "@/components/portfolio/HeroSection"
import { AboutNowSection, CapabilitiesSection, ReadingSection, SelectedWorkSection } from "@/components/portfolio/HomeSections"

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <CapabilitiesSection />
      <AboutNowSection />
      <ReadingSection />
    </>
  )
}
