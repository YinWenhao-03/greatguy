import prisma from '@/lib/prisma'

async function initDatabase() {
  try {
    console.log('正在初始化数据库...')

    const existingAdmin = await prisma.user.findUnique({
      where: { username: 'yinwenhao' }
    })

    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          username: 'yinwenhao',
          password: '20030822yin',
          role: 'admin'
        }
      })
      console.log('管理员账号已创建：yinwenhao')
    } else {
      console.log('管理员账号已存在，跳过创建')
    }

    console.log('数据库初始化完成！')
  } catch (error) {
    console.error('数据库初始化失败：', error)
  } finally {
    await prisma.$disconnect()
  }
}

initDatabase()
