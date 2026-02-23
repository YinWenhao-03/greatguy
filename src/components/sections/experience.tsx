import { Building2, CalendarDays, CheckCircle2 } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioContent } from "@/content/portfolio"

export function ExperienceSection() {
  const exp = portfolioContent.experience

  return (
    <section id="experience" className="scroll-mt-24">
      <SectionHeader
        eyebrow={exp.section.eyebrow}
        title={exp.section.title}
        description={exp.section.description}
      />

      <div className="mt-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl">{exp.card.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {exp.card.org}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {exp.card.period}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {exp.card.badges.map((b) => (
                  <Badge key={b} variant="secondary">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Accordion type="single" collapsible defaultValue="highlights">
              <AccordionItem value="highlights">
                <AccordionTrigger>{exp.accordion.achievementsTitle}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {exp.accordion.achievements.map((a) => (
                      <li key={a.title} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{a.title}</p>
                          <p className="text-sm text-muted-foreground">{a.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="methods">
                <AccordionTrigger>{exp.accordion.methodsTitle}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {exp.accordion.methods.map((m) => (
                      <div key={m.title} className="rounded-lg border bg-card p-4">
                        <p className="text-sm font-medium">{m.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
