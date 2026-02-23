export type NavItem = {
  href: string
  label: string
}

export type HeroStat = {
  title: string
  description: string
}

export type ExperienceAchievement = {
  title: string
  description: string
}

export type ExperienceMethod = {
  title: string
  description: string
}

export type StackGroup = {
  title: string
  description: string
  items: string[]
}

export type WorkFile = {
  name: string
  url: string
  type: string
}

export type WorkItem = {
  title: string
  subtitle: string
  slug: string
  imageUrl: string
  tags: string[]
  status: "ready" | "coming"
  summary: string
  files?: WorkFile[]
  galleryImages?: string[]
}

export type EducationItem = {
  school: string
  badge: string
  detail: string
}

export type AwardItem = {
  title: string
  detail: string
}

export const portfolioContent = {
  meta: {
    title: "殷文皓｜连接数据与产品",
    description: "安徽大学应用统计研究生｜前字节跳动（懂车帝）质量运营实习生。",
  },
  header: {
    brand: {
      avatarChar: "殷",
      name: "殷文皓",
      subtitle: "产品/策略运营 · 统计背景",
    },
    navItems: [
      { href: "#experience", label: "经历" },
      { href: "#stack", label: "技能栈" },
      { href: "#work", label: "作品" },
      { href: "#education", label: "教育与奖项" },
      { href: "/blog", label: "博客" },
    ] satisfies NavItem[],
  },
  hero: {
    badges: ["数据驱动的产品感知", "应用统计", "运营"],
    title: {
      name: "殷文皓",
      highlight: "连接数据与产品",
    },
    subtitle:
      "安徽大学应用统计研究生｜前字节跳动（懂车帝）质量运营实习生。",
    ctas: {
      primary: { href: "#work", label: "查看作品" },
      secondary: { href: "#experience", label: "查看经历" },
    },
    stats: [
      {
        title: "关注",
        description: "用统计与业务语境，把数据洞察转化为可执行 SOP。",
      },
      {
        title: "优势",
        description: "SQL/Python 数据分析 + 产品原型表达 + 跨团队推进。",
      },
      {
        title: "风格",
        description: "极简、结构化、可复用：让复杂问题可被快速扫描与理解。",
      },
    ] satisfies HeroStat[],
  },
  experience: {
    section: {
      eyebrow: "经历",
      title: "字节跳动（懂车帝）· 质量运营",
      description:
        "把一线反馈、过程数据与业务目标连接起来，用可复用的流程让规模化交付更稳定。",
    },
    card: {
      title: "字节跳动 — 质量运营",
      org: "懂车帝",
      period: "2025.10 – 2026.02",
      badges: ["质量", "SOP", "合作伙伴运营"],
    },
    accordion: {
      achievementsTitle: "关键成果",
      achievements: [
        {
          title: "销售话术迭代",
          description:
            "从 1.0 脚本迭代到可落地 SOP：沉淀可复用的话术结构、质检要点与问题归因口径，提升团队一致性与交付稳定性。",
        },
        {
          title: "合作伙伴数据运营",
          description:
            "覆盖 96 家合作伙伴、累计 4000+ 用户：建立监控指标与异常回溯路径，推动数据闭环与运营动作对齐。",
        },
      ] satisfies ExperienceAchievement[],
      methodsTitle: "工作方法",
      methods: [
        {
          title: "定义",
          description: "统一口径：目标、约束、可衡量指标。",
        },
        {
          title: "诊断",
          description: "用 SQL/数据拆解漏斗，定位关键影响因子。",
        },
        {
          title: "交付",
          description: "输出 SOP/看板/复盘模板，确保可复用与可传承。",
        },
      ] satisfies ExperienceMethod[],
    },
  },
  stack: {
    section: {
      eyebrow: "技能栈",
      title: "工具是手段，结构化思维是底座",
      description:
        "我更关注：问题定义是否清晰、指标是否可追踪、动作是否可复用。工具只是把这些落到现实的媒介。",
    },
    groups: [
      {
        title: "数据分析",
        description: "用于分析、诊断、监控与复盘的基础能力栈。",
        items: ["SQL", "Python", "PowerBI"],
      },
      {
        title: "产品设计",
        description: "把策略与流程具体化到原型与交互表达。",
        items: ["Axure", "Figma"],
      },
      {
        title: "证书",
        description: "方法与标准化意识的背书。",
        items: ["MySQL OCP", "CET-6"],
      },
    ] satisfies StackGroup[],
  },
  work: {
    section: {
      eyebrow: "作品",
      title: "作品精选",
      description:
        "以 3 列卡片墙的形式组织作品；后续你只需要在内容文件里追加数据即可扩展。每个条目都支持独立详情页。",
    },
    card: {
      tagline: "结构化呈现：背景 → 方法 → 结论 → 可复用的动作建议。",
      ctaLabel: "查看详情",
    },
    items: [
      {
        title: "AI 驱动的劳动力市场研究",
        subtitle: "安徽省统计建模大赛 · 一等奖",
        slug: "ai-driven-labor-market-research",
        imageUrl:
          "https://placehold.co/1200x800/111827/ffffff?text=AI%20Labor%20Market%20Research",
        tags: ["研究", "建模", "洞察"],
        status: "ready",
        summary:
          "该作品聚焦劳动力市场的结构性信号，使用数据建模与可解释叙事来输出策略建议，并获得安徽省统计建模大赛一等奖。",
      },
      {
        title: "产品原型 01",
        subtitle: "产品思考 · 交互结构 · 关键流程",
        slug: "product-prototype-01",
        imageUrl:
          "https://placehold.co/1200x800/0f172a/ffffff?text=Product%20Prototype%2001",
        tags: ["原型", "Axure", "Figma"],
        status: "coming",
        summary:
          "将以产品原型的形式呈现：问题定义、用户路径、关键交互与度量指标（待补充材料后上线）。",
      },
      {
        title: "市场分析报告 02",
        subtitle: "规模测算 · 竞品扫描 · 策略建议",
        slug: "market-analysis-report-02",
        imageUrl:
          "https://placehold.co/1200x800/020617/ffffff?text=Market%20Analysis%20Report%2002",
        tags: ["分析", "SQL", "PowerBI"],
        status: "coming",
        summary:
          "将以市场分析报告形式呈现：市场规模、竞品格局、机会点与策略建议（待补充材料后上线）。",
      },
    ] satisfies WorkItem[],
  },
  educationAwards: {
    section: {
      eyebrow: "教育与奖项",
      title: "统计背景 + 竞赛训练：把方法论用到真实问题",
      description:
        "学习与竞赛经历让我更习惯用严谨假设、可验证指标和清晰叙事来表达结论。",
    },
    educationTitle: "教育经历",
    awardsTitle: "奖项",
    education: [
      {
        school: "安徽大学（AHU）",
        badge: "硕士",
        detail: "应用统计 · 研究生",
      },
      {
        school: "安徽师范大学（ANU）",
        badge: "本科",
        detail: "本科教育经历",
      },
    ] satisfies EducationItem[],
    awards: [
      {
        title: "全国大学生数学竞赛",
        detail: "第十三届 · 获奖",
      },
      {
        title: "全国大学生市场调查与分析大赛",
        detail: "第十六届 · 获奖",
      },
    ] satisfies AwardItem[],
  },
  workDetail: {
    notFoundTitle: "未找到作品",
    notFoundDescription: "该作品条目暂未收录。",
    backHomeLabel: "返回首页",
    backLabel: "返回",
    comingBadge: "即将上线",
    overviewTitle: "概览",
    nextTitle: "下一步",
    nextDescription:
      "你可以在这里补充：研究框架、数据来源、特征工程/模型选择、可解释性图表，以及最终的策略落地建议。",
  },
  footer: {
    left: "数据驱动的产品感知",
    right: "基于 Next.js · Tailwind · Shadcn UI 构建",
  },
} as const
