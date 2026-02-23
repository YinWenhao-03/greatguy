import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { portfolioContent } from "@/content/portfolio"

export function HeroSection() {
  const hero = portfolioContent.hero

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            {hero.badges[0]}
          </Badge>
          {hero.badges.slice(1).map((b) => (
            <Badge key={b} variant="outline">
              {b}
            </Badge>
          ))}
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {hero.title.name} <span className="text-muted-foreground">|</span>{" "}
            <span className="text-primary">{hero.title.highlight}</span>
          </h1>
          <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
            {hero.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild className="sm:w-auto">
            <Link href={hero.ctas.primary.href}>
              {hero.ctas.primary.label} <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={hero.ctas.secondary.href}>{hero.ctas.secondary.label}</Link>
          </Button>
        </div>

        <div className="grid gap-4 pt-4 sm:grid-cols-3">
          {hero.stats.map((s) => (
            <div key={s.title} className="rounded-lg border bg-card p-4">
              <p className="text-sm font-medium">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
