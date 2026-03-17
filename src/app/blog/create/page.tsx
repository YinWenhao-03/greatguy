'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!title || !content) {
      setError("标题和内容不能为空")
      return
    }

    const user = localStorage.getItem('user')
    if (!user) {
      setError("请先登录")
      return
    }

    const parsedUser = JSON.parse(user)

    try {
      setLoading(true)
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          authorId: parsedUser.id
        })
      })

      if (response.ok) {
        setSuccess("文章发布成功！")
        setTitle("")
        setContent("")
        // 3秒后跳转到博客列表
        setTimeout(() => {
          window.location.href = '/blog'
        }, 3000)
      } else {
        const data = await response.json()
        setError(data.error || '发布失败，请稍后重试')
      }
    } catch (err) {
      setError('发布失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">返回博客</Link>
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold">写文章</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>创建新文章</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 text-green-600 rounded-md text-sm">
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">标题</label>
                <input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入文章标题" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">内容</label>
                <textarea 
                  id="content" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="请输入文章内容" 
                  rows={10} 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" type="button">
                  保存草稿
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? '发布中...' : '发布文章'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
