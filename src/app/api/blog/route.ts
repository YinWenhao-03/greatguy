import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
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

    return NextResponse.json(posts)
  } catch (error) {
    console.error('获取博客列表失败:', error)
    return NextResponse.json({ error: '获取博客列表失败' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, authorId } = await request.json()

    if (!title || !content || !authorId) {
      return NextResponse.json({ error: '标题、内容和作者ID不能为空' }, { status: 400 })
    }

    // 生成 slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        slug
      },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('创建博客失败:', error)
    return NextResponse.json({ error: '创建博客失败' }, { status: 500 })
  }
}
