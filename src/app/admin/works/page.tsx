'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type WorkItem = {
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

export default function WorksAdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [works, setWorks] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.role !== 'admin') {
        router.push('/blog/login')
      } else {
        setUser(parsedUser)
        fetchWorks()
      }
    } else {
      router.push('/blog/login')
    }
  }, [router])

  const fetchWorks = async () => {
    try {
      const response = await fetch('/api/works')
      if (response.ok) {
        const data = await response.json()
        setWorks(data)
      } else {
        setError('获取作品列表失败')
      }
    } catch (err) {
      setError('获取作品列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个作品吗？')) {
      return
    }

    try {
      const response = await fetch(`/api/works/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setWorks(works.filter(work => work.id !== id))
      } else {
        alert('删除失败')
      }
    } catch (err) {
      alert('删除失败')
    }
  }

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center py-20">
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Button asChild variant="outline" size="sm" className="mb-4">
              <Link href="/admin">返回管理后台</Link>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold">作品管理</h1>
          </div>
          <Button asChild size="sm">
            <Link href="/admin/works/create">添加作品</Link>
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm mb-6">
            {error}
          </div>
        )}

        {works.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-muted-foreground">暂无作品</p>
          </div>
        ) : (
          <div className="space-y-4">
            {works.map((work) => (
              <Card key={work.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>{work.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {work.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {work.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/works/${work.id}/edit`}>编辑</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(work.id)}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
