import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('获取文章详情失败:', error)
    return NextResponse.json({ error: '获取文章详情失败' }, { status: 500 })
  }
}
