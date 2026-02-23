import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioContent, type WorkItem } from "@/content/portfolio"

function WorkCard({ item }: { item: WorkItem }) {
  const { card } = portfolioContent.work

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[16/10]">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="bg-white/10 text-white backdrop-blur"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-base">{item.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{card.tagline}</p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full justify-between">
          <Link href={`/work/${item.slug}`}>
            {card.ctaLabel} <ArrowUpRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function WorkSection() {
  const work = portfolioContent.work

  return (
    <section id="work" className="scroll-mt-24">
      <SectionHeader
        eyebrow={work.section.eyebrow}
        title={work.section.title}
        description={work.section.description}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {work.items.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  )
}
