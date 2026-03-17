'use client'

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [generatedCaptcha] = useState(Math.random().toString(36).substring(2, 8).toUpperCase())
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致")
      return
    }

    if (captcha.toUpperCase() !== generatedCaptcha) {
      setError("验证码错误")
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '注册失败')
      }

      setSuccess("注册成功！正在跳转到登录页...")
      setTimeout(() => {
        window.location.href = "/blog/login"
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">注册账号</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-2 bg-red-50 text-red-600 text-sm rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="p-2 bg-green-50 text-green-600 text-sm rounded-md">
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">用户名</label>
                <input 
                  id="username" 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名（4-20位字母、数字或下划线）" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  pattern="^[a-zA-Z0-9_]{4,20}$"
                  required
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">用户名长度4-20位，只能包含字母、数字或下划线</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">密码</label>
                <input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码（至少8位，包含字母和数字）" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  required
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">密码长度至少8位，必须包含字母和数字</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">确认密码</label>
                <input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入密码" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="captcha" className="text-sm font-medium">验证码</label>
                <div className="flex gap-2">
                  <input 
                    id="captcha" 
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    placeholder="请输入验证码" 
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    disabled={loading}
                  />
                  <div className="w-32 h-10 bg-gray-200 rounded-md flex items-center justify-center text-sm font-medium cursor-pointer" onClick={() => window.location.reload()}>
                    {generatedCaptcha}
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '注册中...' : '注册'}
              </Button>
            </form>
            <div className="text-center text-sm">
              已有账号？ <Link href="/blog/login" className="text-primary hover:underline">立即登录</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
