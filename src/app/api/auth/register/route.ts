import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return Response.json({ 
        error: '用户名和密码不能为空',
        error_en: 'Username and password cannot be empty'
      }, { status: 400 })
    }

    if (username.length < 4 || username.length > 20) {
      return Response.json({ 
        error: '用户名长度需在4-20位之间',
        error_en: 'Username length must be between 4-20 characters'
      }, { status: 400 })
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return Response.json({ 
        error: '用户名只能包含字母、数字或下划线',
        error_en: 'Username can only contain letters, numbers or underscores'
      }, { status: 400 })
    }

    if (password.length < 8) {
      return Response.json({ 
        error: '密码长度至少8位',
        error_en: 'Password length must be at least 8 characters'
      }, { status: 400 })
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password)) {
      return Response.json({ 
        error: '密码必须包含字母和数字',
        error_en: 'Password must contain letters and numbers'
      }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { username }
    })

    if (existingUser) {
      return Response.json({ 
        error: '用户名已存在',
        error_en: 'Username already exists'
      }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
        role: 'user'
      }
    })

    const { password: _, ...userWithoutPassword } = user
    return Response.json({ 
      user: userWithoutPassword,
      message: '注册成功',
      message_en: 'Registration successful'
    })
  } catch (error) {
    console.error('Registration error:', error)
    return Response.json({ 
      error: '注册失败，请稍后重试',
      error_en: 'Registration failed, please try again later'
    }, { status: 500 })
  }
}
