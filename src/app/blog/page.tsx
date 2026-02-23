'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setIsLoggedIn(true)
      setIsAdmin(parsedUser.role === 'admin')
    }
  }, [])

  useEffect(() => {
    // 从 API 获取博客列表
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/blog')
        if (response.ok) {
          const data = await response.json()
          // 加载点赞数据
          const postLikes = JSON.parse(localStorage.getItem('postLikes') || '{}')
          const updatedPosts = data.map((post: any) => ({
            ...post,
            likes: postLikes[post.slug] || post.likes
          }))
          setPosts(updatedPosts)
        }
      } catch (error) {
        console.error('获取博客列表失败:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
    
    // 监听 localStorage 变化（当其他标签页点赞时）
    const handleStorageChange = () => {
      // 不依赖 posts 状态，重新获取最新数据
      fetchPosts()
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setIsAdmin(false)
    setUser(null)
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">个人博客</h1>
        <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-end">
          {!isLoggedIn ? (
            <>
              <Button asChild variant="outline" size="sm" className="whitespace-nowrap">
                <Link href="/blog/register">注册</Link>
              </Button>
              <Button asChild size="sm" className="whitespace-nowrap">
                <Link href="/blog/login">登录</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                欢迎，{user?.username}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="whitespace-nowrap">
                退出登录
              </Button>
              {isAdmin && (
                <Button asChild size="sm" className="whitespace-nowrap">
                  <Link href="/blog/create">写文章</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {!isLoggedIn && (
        <Card className="mb-8">
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-medium mb-4">请先登录</h2>
            <p className="text-muted-foreground mb-6">登录后可以查看完整的博客内容和功能</p>
            <Button asChild>
              <Link href="/blog/login">立即登录</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">加载中...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">暂无博客文章</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {post.author?.username || post.author} · {new Date(post.date).toLocaleDateString('zh-CN')}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{post.content}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button asChild variant="outline">
                  <Link href={`/blog/${post.slug}`}>阅读更多</Link>
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm">👍 {post.likes}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
