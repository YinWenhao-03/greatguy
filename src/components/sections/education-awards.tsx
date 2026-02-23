import { GraduationCap, Trophy } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioContent } from "@/content/portfolio"

export function EducationAwardsSection() {
  const ea = portfolioContent.educationAwards

  return (
    <section id="education" className="scroll-mt-24">
      <SectionHeader
        eyebrow={ea.section.eyebrow}
        title={ea.section.title}
        description={ea.section.description}
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4 text-primary" />
              {ea.educationTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ea.education.map((ed) => (
              <div key={ed.school} className="rounded-lg border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium">{ed.school}</p>
                  <Badge variant="secondary">{ed.badge}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{ed.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="h-4 w-4 text-primary" />
              {ea.awardsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ea.awards.map((a) => (
              <div key={a.title} className="rounded-lg border bg-card p-4">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
