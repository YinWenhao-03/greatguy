import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioContent } from "@/content/portfolio"

export default function WorkDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const detail = portfolioContent.work.items.find((i) => i.slug === slug)
  const ui = portfolioContent.workDetail

  if (!detail) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>{ui.notFoundTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{ui.notFoundDescription}</p>
            <Button asChild variant="outline">
              <Link href="/">{ui.backHomeLabel}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{detail.title}</h1>
          <div className="flex flex-wrap gap-2">
            {detail.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
            {detail.status === "coming" ? (
              <Badge variant="outline">{ui.comingBadge}</Badge>
            ) : null}
          </div>
        </div>
        <Button asChild variant="outline">
          <Link href="/#work">{ui.backLabel}</Link>
        </Button>
      </div>

      {/* 主图片展示 */}
      <div className="mb-8">
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden border cursor-pointer group">
          <Image
            src={detail.imageUrl}
            alt={detail.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <p className="text-sm">点击查看大图</p>
            </div>
          </div>
        </div>
      </div>

      {/* 图片画廊 */}
      {detail.galleryImages && detail.galleryImages.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">图片画廊</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {detail.galleryImages.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border cursor-pointer group">
                <Image
                  src={image}
                  alt={`${detail.title} - 图片 ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-2 text-white">
                    <p className="text-xs">查看图片</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 文件上传下载 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">相关文件</h3>
          <Button variant="outline" size="sm">
            上传文件
          </Button>
        </div>
        {detail.files && detail.files.length > 0 ? (
          <div className="space-y-3">
            {detail.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">{file.type.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.type}</p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a href={file.url} download={file.name}>下载</a>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 border rounded-lg text-center text-muted-foreground">
            <p>暂无文件</p>
          </div>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{ui.overviewTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{detail.summary}</p>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-medium">{ui.nextTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{ui.nextDescription}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
