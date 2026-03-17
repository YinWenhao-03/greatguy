import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { portfolioContent } from "@/content/portfolio"

import "./globals.css"

export const metadata: Metadata = {
  title: portfolioContent.meta.title,
  description: portfolioContent.meta.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SiteHeader />
          <main className="pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
