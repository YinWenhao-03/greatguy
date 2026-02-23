import { SectionHeader } from "@/components/sections/section-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioContent } from "@/content/portfolio"

export function TechStackSection() {
  const stack = portfolioContent.stack

  return (
    <section id="stack" className="scroll-mt-24">
      <SectionHeader
        eyebrow={stack.section.eyebrow}
        title={stack.section.title}
        description={stack.section.description}
      />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stack.groups.map((g) => (
          <Card key={g.title} className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{g.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{g.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
