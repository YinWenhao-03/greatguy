'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    // 从 API 获取文章详情
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/blog/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setPost(data)
          setLikes(data.likes)
        }
      } catch (error) {
        console.error('获取文章详情失败:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [slug])

  useEffect(() => {
    // 从 localStorage 加载点赞数据
    const loadLikeData = () => {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}')
      const postLikes = JSON.parse(localStorage.getItem('postLikes') || '{}')
      
      if (likedPosts[slug]) {
        setHasLiked(true)
      }
      
      if (postLikes[slug]) {
        setLikes(postLikes[slug])
      }
    }
    
    loadLikeData()
  }, [slug])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center py-20">
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>文章不存在</CardTitle>
          </CardHeader>
          <CardContent>
            <p>该文章不存在或已被删除。</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/blog">返回博客</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleLike = () => {
    if (!hasLiked) {
      const newLikes = likes + 1
      setLikes(newLikes)
      setHasLiked(true)
      
      // 保存到 localStorage
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}')
      const postLikes = JSON.parse(localStorage.getItem('postLikes') || '{}')
      
      likedPosts[slug] = true
      postLikes[slug] = newLikes
      
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
      localStorage.setItem('postLikes', JSON.stringify(postLikes))
    }
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/blog/${post.slug}`
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          url: shareUrl
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        alert('链接已复制到剪贴板！')
      }
    } catch (error) {
      console.error('分享失败:', error)
      // 备用方案：复制到剪贴板
      await navigator.clipboard.writeText(shareUrl)
      alert('链接已复制到剪贴板！')
    }
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">返回博客</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {post.author} · {post.date}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{post.content}</p>
            <div className="flex items-center gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleLike}
                disabled={hasLiked}
              >
                <span>👍</span>
                <span>{likes}</span>
                <span>{hasLiked ? '已点赞' : '点赞'}</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleShare}
              >
                <span>🔗</span>
                <span>转发</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
