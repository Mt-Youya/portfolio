import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface SectionTitleProps {
  tag?: string
  title: string
  subtitle?: string
  center?: boolean
}

export function SectionTitle({ tag, title, subtitle, center = false }: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-12 ${center ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {tag && (
        <Badge
          variant="outline"
          className="font-mono tracking-widest uppercase text-accent border-accent/30 mb-3"
        >
          {tag}
        </Badge>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent ${center ? 'mx-auto' : ''}`} />
    </motion.div>
  )
}
