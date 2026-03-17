declare module "lucide-react" {
  import * as React from "react"

  export type LucideProps = React.SVGProps<SVGSVGElement> & {
    color?: string
    size?: string | number
    absoluteStrokeWidth?: boolean
  }

  export const ArrowRight: React.FC<LucideProps>
  export const ArrowUpRight: React.FC<LucideProps>
  export const Building2: React.FC<LucideProps>
  export const CalendarDays: React.FC<LucideProps>
  export const CheckCircle2: React.FC<LucideProps>
  export const ChevronDown: React.FC<LucideProps>
  export const GraduationCap: React.FC<LucideProps>
  export const Moon: React.FC<LucideProps>
  export const Sparkles: React.FC<LucideProps>
  export const Sun: React.FC<LucideProps>
  export const Trophy: React.FC<LucideProps>
}
