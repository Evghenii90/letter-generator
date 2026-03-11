import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'outline'

type ButtonProps = {
  children: ReactNode
  as?: ElementType
  variant?: ButtonVariant
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<any>

export const Button = ({
  as: Component = 'button',
  children,
  variant = 'primary',
  fullWidth,
  className,
  ...properties
}: ButtonProps) => {
  const buttonClassName = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)

  return (
    <Component className={buttonClassName} {...properties}>
      {children}
    </Component>
  )
}
