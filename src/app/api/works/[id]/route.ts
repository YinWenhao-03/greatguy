import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const work = await prisma.work.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    })

    if (!work) {
      return NextResponse.json({ error: '作品不存在' }, { status: 404 })
    }

    return NextResponse.json(work)
  } catch (error) {
    console.error('获取作品详情失败:', error)
    return NextResponse.json({ error: '获取作品详情失败' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { title, subtitle, slug, imageUrl, tags, status, summary, files, galleryImages } = await request.json()

    const work = await prisma.work.update({
      where: { id },
      data: {
        title: title || undefined,
        subtitle: subtitle || undefined,
        slug: slug || undefined,
        imageUrl: imageUrl || undefined,
        tags: tags || undefined,
        status: status || undefined,
        summary: summary || undefined,
        files: files !== undefined ? files : undefined,
        galleryImages: galleryImages !== undefined ? galleryImages : undefined
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    })

    return NextResponse.json(work)
  } catch (error) {
    console.error('更新作品失败:', error)
    return NextResponse.json({ error: '更新作品失败' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await prisma.work.delete({
      where: { id }
    })

    return NextResponse.json({ message: '作品删除成功' })
  } catch (error) {
    console.error('删除作品失败:', error)
    return NextResponse.json({ error: '删除作品失败' }, { status: 500 })
  }
}
