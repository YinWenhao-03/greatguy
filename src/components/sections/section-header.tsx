import { cn } from "@/lib/utils"

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
