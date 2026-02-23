import Link from "next/link"

import { ModeToggle } from "@/components/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { portfolioContent } from "@/content/portfolio"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { brand, navItems } = portfolioContent.header

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-sm font-bold">
              {brand.avatarChar}
            </span>
            <span className="hidden sm:inline">{brand.name}</span>
            <span className="hidden text-sm font-normal text-muted-foreground sm:inline">
              {brand.subtitle}
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href.startsWith('#') ? `/${item.href}` : item.href}
                    className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
