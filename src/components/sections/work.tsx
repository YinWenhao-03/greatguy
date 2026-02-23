'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/sections/section-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioContent, type WorkItem } from "@/content/portfolio"

type DatabaseWorkItem = {
  id: string
  title: string
  subtitle: string
  slug: string
  imageUrl: string
  tags: string[]
  status: string
  summary: string
  createdAt: string
}

function WorkCard({ item, isStatic = false }: { item: WorkItem | DatabaseWorkItem, isStatic?: boolean }) {
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
            {item.tags.map((t, index) => (
              <Badge
                key={index}
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
        <p className="text-sm text-muted-foreground">{isStatic ? card.tagline : (item as DatabaseWorkItem).summary || card.tagline}</p>
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
  const [dbWorks, setDbWorks] = useState<DatabaseWorkItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/works')
        if (response.ok) {
          const data = await response.json()
          setDbWorks(data)
        }
      } catch (error) {
        console.error('获取作品列表失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  const displayWorks = dbWorks.length > 0 ? dbWorks : work.items
  const isUsingStatic = dbWorks.length === 0

  return (
    <section id="work" className="scroll-mt-24">
      <SectionHeader
        eyebrow={work.section.eyebrow}
        title={work.section.title}
        description={work.section.description}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-10">
            <p className="text-muted-foreground">加载中...</p>
          </div>
        ) : (
          displayWorks.map((item, index) => (
            <WorkCard key={isUsingStatic ? (item as WorkItem).slug : (item as DatabaseWorkItem).id} item={item} isStatic={isUsingStatic} />
          ))
        )}
      </div>
    </section>
  )
}
