// 临时模拟 Prisma 客户端，支持中英文错误信息
const mockUsers = [
  {
    id: "1",
    username: "yinwenhao",
    password: "20030822yin",
    role: "admin",
    createdAt: new Date()
  }
]

const mockPosts: any[] = []
const mockWorks: any[] = []
const mockExperiences: any[] = [
  {
    id: "1",
    title: "字节跳动 — 质量运营",
    org: "懂车帝",
    period: "2025.10 – 2026.02",
    badges: ["质量", "SOP", "合作伙伴运营"],
    sectionEyebrow: "经历",
    sectionTitle: "字节跳动（懂车帝）· 质量运营",
    sectionDescription: "把一线反馈、过程数据与业务目标连接起来，用可复用的流程让规模化交付更稳定。",
    achievementsTitle: "关键成果",
    achievements: [
      { title: "销售话术迭代", description: "从 1.0 脚本迭代到可落地 SOP：沉淀可复用的话术结构、质检要点与问题归因口径，提升团队一致性与交付稳定性。" },
      { title: "合作伙伴数据运营", description: "覆盖 96 家合作伙伴、累计 4000+ 用户：建立监控指标与异常回溯路径，推动数据闭环与运营动作对齐。" }
    ],
    methodsTitle: "工作方法",
    methods: [
      { title: "定义", description: "统一口径：目标、约束、可衡量指标。" },
      { title: "诊断", description: "用 SQL/数据拆解漏斗，定位关键影响因子。" },
      { title: "交付", description: "输出 SOP/看板/复盘模板，确保可复用与可传承。" }
    ],
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
const mockStackGroups: any[] = [
  {
    id: "1",
    title: "数据分析",
    description: "用于分析、诊断、监控与复盘的基础能力栈。",
    items: ["SQL", "Python", "PowerBI"],
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "产品设计",
    description: "把策略与流程具体化到原型与交互表达。",
    items: ["Axure", "Figma"],
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "证书",
    description: "方法与标准化意识的背书。",
    items: ["MySQL OCP", "CET-6"],
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
const mockEducations: any[] = [
  {
    id: "1",
    school: "安徽大学（AHU）",
    badge: "硕士",
    detail: "应用统计 · 研究生",
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    school: "安徽师范大学（ANU）",
    badge: "本科",
    detail: "本科教育经历",
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
const mockAwards: any[] = [
  {
    id: "1",
    title: "全国大学生数学竞赛",
    detail: "第十三届 · 获奖",
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "全国大学生市场调查与分析大赛",
    detail: "第十六届 · 获奖",
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
const mockHeroStats: any[] = [
  {
    id: "1",
    title: "关注",
    description: "用统计与业务语境，把数据洞察转化为可执行 SOP。",
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "优势",
    description: "SQL/Python 数据分析 + 产品原型表达 + 跨团队推进。",
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "风格",
    description: "极简、结构化、可复用：让复杂问题可被快速扫描与理解。",
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
const mockSiteConfig: any[] = []

const mockPrisma = {
  user: {
    findUnique: async ({ where }: { where: { username: string } }) => {
      return mockUsers.find(user => user.username === where.username) || null
    },
    create: async (data: any) => {
      const newUser = {
        id: String(mockUsers.length + 1),
        ...data,
        role: "user",
        createdAt: new Date()
      }
      mockUsers.push(newUser)
      return newUser
    }
  },
  post: {
    findMany: async ({ include, orderBy }: any = {}) => {
      let posts = [...mockPosts]
      if (orderBy?.createdAt === 'desc') {
        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }
      return posts.map(post => ({
        ...post,
        author: include?.author ? { username: mockUsers.find(u => u.id === post.authorId)?.username || '未知' } : undefined
      }))
    },
    findUnique: async ({ where, include }: any = {}) => {
      const post = mockPosts.find(p => p.slug === where.slug || p.id === where.id)
      if (!post) return null
      return {
        ...post,
        author: include?.author ? { username: mockUsers.find(u => u.id === post.authorId)?.username || '未知' } : undefined
      }
    },
    create: async ({ data, include }: any = {}) => {
      const newPost = {
        id: String(mockPosts.length + 1),
        ...data,
        date: new Date(),
        likes: 0,
        createdAt: new Date()
      }
      mockPosts.push(newPost)
      return {
        ...newPost,
        author: include?.author ? { username: mockUsers.find(u => u.id === data.authorId)?.username || '未知' } : undefined
      }
    }
  },
  work: {
    findMany: async ({ include, orderBy }: any = {}) => {
      let works = [...mockWorks]
      if (orderBy?.createdAt === 'desc') {
        works.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else if (orderBy?.sortOrder === 'asc') {
        works.sort((a, b) => a.sortOrder - b.sortOrder)
      }
      return works.map(work => ({
        ...work,
        author: include?.author ? { username: mockUsers.find(u => u.id === work.authorId)?.username || '未知' } : undefined
      }))
    },
    findUnique: async ({ where, include }: any = {}) => {
      const work = mockWorks.find(w => w.id === where.id || w.slug === where.slug)
      if (!work) return null
      return {
        ...work,
        author: include?.author ? { username: mockUsers.find(u => u.id === work.authorId)?.username || '未知' } : undefined
      }
    },
    create: async ({ data, include }: any = {}) => {
      const newWork = {
        id: String(mockWorks.length + 1),
        ...data,
        sortOrder: mockWorks.length,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockWorks.push(newWork)
      return {
        ...newWork,
        author: include?.author ? { username: mockUsers.find(u => u.id === data.authorId)?.username || '未知' } : undefined
      }
    },
    update: async ({ where, data, include }: any = {}) => {
      const index = mockWorks.findIndex(w => w.id === where.id)
      if (index === -1) throw new Error('作品不存在')
      
      mockWorks[index] = {
        ...mockWorks[index],
        ...data,
        updatedAt: new Date()
      }
      
      return {
        ...mockWorks[index],
        author: include?.author ? { username: mockUsers.find(u => u.id === mockWorks[index].authorId)?.username || '未知' } : undefined
      }
    },
    delete: async ({ where }: any = {}) => {
      const index = mockWorks.findIndex(w => w.id === where.id)
      if (index === -1) throw new Error('作品不存在')
      mockWorks.splice(index, 1)
    }
  },
  experience: {
    findMany: async ({ orderBy }: any = {}) => {
      let experiences = [...mockExperiences]
      if (orderBy?.sortOrder === 'asc') {
        experiences.sort((a, b) => a.sortOrder - b.sortOrder)
      }
      return experiences
    },
    findFirst: async () => {
      return mockExperiences[0] || null
    },
    findUnique: async ({ where }: any = {}) => {
      return mockExperiences.find(e => e.id === where.id) || null
    },
    create: async ({ data }: any = {}) => {
      const newExperience = {
        id: String(mockExperiences.length + 1),
        ...data,
        sortOrder: mockExperiences.length,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockExperiences.push(newExperience)
      return newExperience
    },
    update: async ({ where, data }: any = {}) => {
      const index = mockExperiences.findIndex(e => e.id === where.id)
      if (index === -1) throw new Error('经历不存在')
      
      mockExperiences[index] = {
        ...mockExperiences[index],
        ...data,
        updatedAt: new Date()
      }
      
      return mockExperiences[index]
    },
    delete: async ({ where }: any = {}) => {
      const index = mockExperiences.findIndex(e => e.id === where.id)
      if (index === -1) throw new Error('经历不存在')
      mockExperiences.splice(index, 1)
    }
  },
  stackGroup: {
    findMany: async ({ orderBy }: any = {}) => {
      let groups = [...mockStackGroups]
      if (orderBy?.sortOrder === 'asc') {
        groups.sort((a, b) => a.sortOrder - b.sortOrder)
      }
      return groups
    },
    findUnique: async ({ where }: any = {}) => {
      return mockStackGroups.find(g => g.id === where.id) || null
    },
    create: async ({ data }: any = {}) => {
      const newGroup = {
        id: String(mockStackGroups.length + 1),
        ...data,
        sortOrder: mockStackGroups.length,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockStackGroups.push(newGroup)
      return newGroup
    },
    update: async ({ where, data }: any = {}) => {
      const index = mockStackGroups.findIndex(g => g.id === where.id)
      if (index === -1) throw new Error('技能组不存在')
      
      mockStackGroups[index] = {
        ...mockStackGroups[index],
        ...data,
        updatedAt: new Date()
      }
      
      return mockStackGroups[index]
    },
    delete: async ({ where }: any = {}) => {
      const index = mockStackGroups.findIndex(g => g.id === where.id)
      if (index === -1) throw new Error('技能组不存在')
      mockStackGroups.splice(index, 1)
    }
  },
  education: {
    findMany: async ({ orderBy }: any = {}) => {
      let educations = [...mockEducations]
      if (orderBy?.sortOrder === 'asc') {
        educations.sort((a, b) => a.sortOrder - b.sortOrder)
      }
      return educations
    },
    findUnique: async ({ where }: any = {}) => {
      return mockEducations.find(e => e.id === where.id) || null
    },
    create: async ({ data }: any = {}) => {
      const newEducation = {
        id: String(mockEducations.length + 1),
        ...data,
        sortOrder: mockEducations.length,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockEducations.push(newEducation)
      return newEducation
    },
    update: async ({ where, data }: any = {}) => {
      const index = mockEducations.findIndex(e => e.id === where.id)
      if (index === -1) throw new Error('教育经历不存在')
      
      mockEducations[index] = {
        ...mockEducations[index],
        ...data,
        updatedAt: new Date()
      }
      
      return mockEducations[index]
    },
    delete: async ({ where }: any = {}) => {
      const index = mockEducations.findIndex(e => e.id === where.id)
      if (index === -1) throw new Error('教育经历不存在')
      mockEducations.splice(index, 1)
    }
  },
  award: {
    findMany: async ({ orderBy }: any = {}) => {
      let awards = [...mockAwards]
      if (orderBy?.sortOrder === 'asc') {
        awards.sort((a, b) => a.sortOrder - b.sortOrder)
      }
      return awards
    },
    findUnique: async ({ where }: any = {}) => {
      return mockAwards.find(a => a.id === where.id) || null
    },
    create: async ({ data }: any = {}) => {
      const newAward = {
        id: String(mockAwards.length + 1),
        ...data,
        sortOrder: mockAwards.length,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockAwards.push(newAward)
      return newAward
    },
    update: async ({ where, data }: any = {}) => {
      const index = mockAwards.findIndex(a => a.id === where.id)
      if (index === -1) throw new Error('奖项不存在')
      
      mockAwards[index] = {
        ...mockAwards[index],
        ...data,
        updatedAt: new Date()
      }
      
      return mockAwards[index]
    },
    delete: async ({ where }: any = {}) => {
      const index = mockAwards.findIndex(a => a.id === where.id)
      if (index === -1) throw new Error('奖项不存在')
      mockAwards.splice(index, 1)
    }
  },
  heroStat: {
    findMany: async ({ orderBy }: any = {}) => {
      let stats = [...mockHeroStats]
      if (orderBy?.sortOrder === 'asc') {
        stats.sort((a, b) => a.sortOrder - b.sortOrder)
      }
      return stats
    },
    findUnique: async ({ where }: any = {}) => {
      return mockHeroStats.find(s => s.id === where.id) || null
    },
    create: async ({ data }: any = {}) => {
      const newStat = {
        id: String(mockHeroStats.length + 1),
        ...data,
        sortOrder: mockHeroStats.length,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockHeroStats.push(newStat)
      return newStat
    },
    update: async ({ where, data }: any = {}) => {
      const index = mockHeroStats.findIndex(s => s.id === where.id)
      if (index === -1) throw new Error('统计项不存在')
      
      mockHeroStats[index] = {
        ...mockHeroStats[index],
        ...data,
        updatedAt: new Date()
      }
      
      return mockHeroStats[index]
    },
    delete: async ({ where }: any = {}) => {
      const index = mockHeroStats.findIndex(s => s.id === where.id)
      if (index === -1) throw new Error('统计项不存在')
      mockHeroStats.splice(index, 1)
    }
  },
  siteConfig: {
    findMany: async () => {
      return mockSiteConfig
    },
    findUnique: async ({ where }: any = {}) => {
      return mockSiteConfig.find(c => c.key === where.key) || null
    },
    upsert: async ({ where, create, update }: any = {}) => {
      const index = mockSiteConfig.findIndex(c => c.key === where.key)
      if (index !== -1) {
        mockSiteConfig[index] = {
          ...mockSiteConfig[index],
          ...update,
          updatedAt: new Date()
        }
        return mockSiteConfig[index]
      } else {
        const newConfig = {
          id: String(mockSiteConfig.length + 1),
          ...create,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        mockSiteConfig.push(newConfig)
        return newConfig
      }
    },
    create: async ({ data }: any = {}) => {
      const newConfig = {
        id: String(mockSiteConfig.length + 1),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockSiteConfig.push(newConfig)
      return newConfig
    },
    update: async ({ where, data }: any = {}) => {
      const index = mockSiteConfig.findIndex(c => c.key === where.key)
      if (index === -1) throw new Error('配置不存在')
      
      mockSiteConfig[index] = {
        ...mockSiteConfig[index],
        ...data,
        updatedAt: new Date()
      }
      
      return mockSiteConfig[index]
    },
    delete: async ({ where }: any = {}) => {
      const index = mockSiteConfig.findIndex(c => c.key === where.key)
      if (index === -1) throw new Error('配置不存在')
      mockSiteConfig.splice(index, 1)
    }
  }
}

export default mockPrisma
