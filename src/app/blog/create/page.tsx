import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreatePostPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <Button asChild variant="outline">
            <Link href="/blog">返回博客</Link>
          </Button>
          <h1 className="text-2xl font-bold">写文章</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>创建新文章</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">标题</label>
              <input 
                id="title" 
                placeholder="请输入文章标题" 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">内容</label>
              <textarea 
                id="content" 
                placeholder="请输入文章内容" 
                rows={10} 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">保存草稿</Button>
              <Button>发布文章</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
