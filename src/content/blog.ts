export type BlogPost = {
  id: string
  title: string
  content: string
  author: string
  date: string
  likes: number
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "我的第一个博客",
    content: "这是我的第一篇博客文章，记录一下我的学习和工作心得。",
    author: "殷文皓",
    date: "2026-02-23",
    likes: 10,
    slug: "my-first-blog"
  },
  {
    id: "2",
    title: "关于数据驱动的思考",
    content: "在工作中，我越来越意识到数据驱动的重要性。通过数据分析，我们可以更好地理解用户需求，优化产品设计。",
    author: "殷文皓",
    date: "2026-02-22",
    likes: 15,
    slug: "data-driven-thinking"
  }
]
