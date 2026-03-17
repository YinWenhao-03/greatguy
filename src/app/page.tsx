import { EducationAwardsSection } from "@/components/sections/education-awards"
import { ExperienceSection } from "@/components/sections/experience"
import { HeroSection } from "@/components/sections/hero"
import { TechStackSection } from "@/components/sections/tech-stack"
import { WorkSection } from "@/components/sections/work"
import { Separator } from "@/components/ui/separator"
import { portfolioContent } from "@/content/portfolio"

export default function HomePage() {
  return (
    <div className="container">
      <div className="py-10 sm:py-14">
        <HeroSection />
        <Separator className="my-10 sm:my-12" />
        <ExperienceSection />
        <Separator className="my-10 sm:my-12" />
        <TechStackSection />
        <Separator className="my-10 sm:my-12" />
        <WorkSection />
        <Separator className="my-10 sm:my-12" />
        <EducationAwardsSection />
      </div>
      <footer className="pb-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} 殷文皓 · {portfolioContent.footer.left}
          </p>
          <p className="text-xs">{portfolioContent.footer.right}</p>
        </div>
      </footer>
    </div>
  )
}
