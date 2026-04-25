import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Featured } from "@/components/sections/Featured"
import { Hero } from "@/components/sections/Hero"
import { Portfolio } from "@/components/portfolio/Portfolio"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <About />
      <Featured />
      <Contact />
    </>
  )
}
