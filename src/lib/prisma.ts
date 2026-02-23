// 临时模拟 Prisma 客户端，支持中英文错误信息
const mockUsers = [
  {
    id: "1",
    username: "yinwenhao",
    password: "20030822yin",
    role: "admin"
  }
]

const mockPrisma = {
  user: {
    findUnique: async ({ where }: { where: { username: string } }) => {
      return mockUsers.find(user => user.username === where.username) || null
    },
    create: async (data: any) => {
      const newUser = {
        id: String(mockUsers.length + 1),
        ...data,
        role: "user"
      }
      mockUsers.push(newUser)
      return newUser
    }
  }
}

export default mockPrisma
