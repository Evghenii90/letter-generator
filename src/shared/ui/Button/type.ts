import type { ComponentProps, ReactNode } from 'react'

export type ButtonVariant =
  | 'create-primary'
  | 'create-secondary'
  | 'generate'
  | 'generate-disabled'
  | 'generate-try-again'

export type Props = ComponentProps<'button'> & {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
  className?: string
}
