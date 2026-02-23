export type User = {
  id: string
  username: string
  password: string
  role: 'admin' | 'user'
  createdAt: string
}

export const users: User[] = [
  {
    id: "1",
    username: "yinwenhao",
    password: "20030822yin",
    role: "admin",
    createdAt: "2026-02-23"
  }
]

export const addUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    id: String(users.length + 1),
    ...user,
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  return newUser
}

export const findUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username)
}
