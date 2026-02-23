import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return Response.json({ 
        error: '用户名或密码错误',
        error_en: 'Username or password is incorrect'
      }, { status: 401 })
    }

    if (user.password !== password) {
      return Response.json({ 
        error: '用户名或密码错误',
        error_en: 'Username or password is incorrect'
      }, { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user
    return Response.json({ 
      user: userWithoutPassword,
      message: '登录成功',
      message_en: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ 
      error: '登录失败，请稍后重试',
      error_en: 'Login failed, please try again later'
    }, { status: 500 })
  }
}
