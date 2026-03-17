'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EditWorkPage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    imageUrl: '',
    tags: '',
    status: 'ready',
    summary: '',
    galleryImages: ''
  })

  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.role !== 'admin') {
        router.push('/blog/login')
      } else {
        setUser(parsedUser)
        fetchWork()
      }
    } else {
      router.push('/blog/login')
    }
  }, [router, params.id])

  const fetchWork = async () => {
    try {
      const response = await fetch(`/api/works/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          title: data.title,
          subtitle: data.subtitle,
          slug: data.slug,
          imageUrl: data.imageUrl,
          tags: data.tags.join(', '),
          status: data.status,
          summary: data.summary,
          galleryImages: data.galleryImages.join(', ')
        })
        setImagePreview(data.imageUrl)
      } else {
        setError('获取作品信息失败')
      }
    } catch (err) {
      setError('获取作品信息失败')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, imageUrl: data.url }))
        setImagePreview(data.url)
      } else {
        setError('图片上传失败')
      }
    } catch (err) {
      setError('图片上传失败')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.title || !formData.subtitle || !formData.slug || !formData.imageUrl || !formData.summary) {
      setError('请填写所有必填字段')
      return
    }

    setSubmitting(true)

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      const galleryArray = formData.galleryImages.split(',').map(url => url.trim()).filter(url => url)

      const response = await fetch(`/api/works/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          galleryImages: galleryArray
        })
      })

      if (response.ok) {
        setSuccess('作品更新成功！')
        setTimeout(() => {
          router.push('/admin/works')
        }, 2000)
      } else {
        const data = await response.json()
        setError(data.error || '更新失败')
      }
    } catch (err) {
      setError('更新失败')
    } finally {
      setSubmitting(false)
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
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="outline" size="sm" className="mb-6">
          <Link href="/admin/works">返回作品管理</Link>
        </Button>

        <h1 className="text-2xl font-bold mb-6">编辑作品</h1>

        <Card>
          <CardContent className="pt-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 text-green-600 rounded-md text-sm mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">标题 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="请输入标题"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">副标题 *</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="请输入副标题"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">URL标识 (slug) *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="例如: my-first-work"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">封面图片 *</label>
                <div className="flex gap-3 items-start">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-sm"
                  />
                </div>
                {uploadingImage && <p className="text-sm text-muted-foreground">上传中...</p>}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="预览"
                    className="mt-2 max-w-full h-40 object-cover rounded"
                  />
                )}
                {formData.imageUrl && (
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
                    placeholder="或者输入图片URL"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">标签 (用逗号分隔)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="例如: 设计, 开发, 产品"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">状态</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="ready">已完成</option>
                  <option value="coming">即将推出</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">简介 *</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="请输入作品简介"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">画廊图片URL (用逗号分隔)</label>
                <textarea
                  value={formData.galleryImages}
                  onChange={(e) => setFormData(prev => ({ ...prev, galleryImages: e.target.value }))}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="输入图片URL，用逗号分隔"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => router.push('/admin/works')}>
                  取消
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? '更新中...' : '更新作品'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
