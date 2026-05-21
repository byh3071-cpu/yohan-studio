import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Faq } from "@/components/sections/Faq"
import { Hero } from "@/components/sections/Hero"
import { Philosophy } from "@/components/sections/Philosophy"
import { ProblemSection } from "@/components/sections/ProblemSection"
import { ScanIntro } from "@/components/sections/ScanIntro"
import { ServicesPreview } from "@/components/sections/ServicesPreview"
import { ShowroomPreview } from "@/components/sections/ShowroomPreview"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ProblemSection />
      <ShowroomPreview />
      <ScanIntro />
      <ServicesPreview />
      <About />
      <Faq />
      <Contact />
    </>
  )
}
