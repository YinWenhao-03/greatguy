"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isDark = mounted ? theme === "dark" : false

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
      title={isDark ? "切换到浅色" : "切换到深色"}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
