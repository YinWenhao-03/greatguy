'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.role !== 'admin') {
        router.push('/blog/login')
      } else {
        setUser(parsedUser)
      }
    } else {
      router.push('/blog/login')
    }
    setLoading(false)
  }, [router])

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
            <h1 className="text-2xl sm:text-3xl font-bold">管理后台</h1>
            <p className="text-muted-foreground mt-2">欢迎，{user.username}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/">返回首页</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/works">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📚</span>
                  作品管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">添加、编辑、删除作品</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/blog">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📝</span>
                  博客管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">管理博客文章</p>
              </CardContent>
            </Card>
          </Link>

          <div className="opacity-50 cursor-not-allowed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>💼</span>
                  经历管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">编辑工作经历（即将上线）</p>
              </CardContent>
            </Card>
          </div>

          <div className="opacity-50 cursor-not-allowed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🛠️</span>
                  技能栈管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">编辑技能栈（即将上线）</p>
              </CardContent>
            </Card>
          </div>

          <div className="opacity-50 cursor-not-allowed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🎓</span>
                  教育与奖项管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">编辑教育经历和奖项（即将上线）</p>
              </CardContent>
            </Card>
          </div>

          <div className="opacity-50 cursor-not-allowed">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📊</span>
                  首页统计管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">编辑首页统计信息（即将上线）</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">📌 说明</h3>
          <p className="text-sm text-muted-foreground">
            目前已完成作品管理和博客管理功能。其他管理功能正在开发中。
            您可以先使用作品管理功能添加新作品，添加后会自动在首页显示。
          </p>
        </div>
      </div>
    </div>
  )
}
