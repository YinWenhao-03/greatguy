import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const works = await prisma.work.findMany({
      include: {
        author: {
          select: {
            username: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(works)
  } catch (error) {
    console.error('获取作品列表失败:', error)
    return NextResponse.json({ error: '获取作品列表失败' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, subtitle, slug, imageUrl, tags, status, summary, files, galleryImages, authorId } = await request.json()

    if (!title || !subtitle || !slug || !imageUrl || !summary || !authorId) {
      return NextResponse.json({ error: '必要字段不能为空' }, { status: 400 })
    }

    const work = await prisma.work.create({
      data: {
        title,
        subtitle,
        slug,
        imageUrl,
        tags: tags || [],
        status: status || 'ready',
        summary,
        files: files || null,
        galleryImages: galleryImages || [],
        authorId
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    })

    return NextResponse.json(work, { status: 201 })
  } catch (error) {
    console.error('创建作品失败:', error)
    return NextResponse.json({ error: '创建作品失败' }, { status: 500 })
  }
}
