'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/content/blog"

export default function BlogPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState(blogPosts)

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
    // 从 localStorage 加载点赞数据并更新帖子列表
    const loadLikeData = () => {
      const postLikes = JSON.parse(localStorage.getItem('postLikes') || '{}')
      
      const updatedPosts = blogPosts.map(post => ({
        ...post,
        likes: postLikes[post.slug] || post.likes
      }))
      
      setPosts(updatedPosts)
    }
    
    loadLikeData()
    
    // 监听 localStorage 变化（当其他标签页点赞时）
    const handleStorageChange = () => {
      loadLikeData()
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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">个人博客</h1>
        <div className="flex gap-3 items-center">
          {!isLoggedIn ? (
            <>
              <Button asChild variant="outline">
                <Link href="/blog/register">注册</Link>
              </Button>
              <Button asChild>
                <Link href="/blog/login">登录</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">
                欢迎，{user?.username}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                退出登录
              </Button>
              {isAdmin && (
                <Button asChild>
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

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {post.author} · {post.date}
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
    </div>
  )
}
