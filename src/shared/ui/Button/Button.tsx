import { clsx } from 'clsx'

import s from './Button.module.css'
import type { Props } from './type'

export const Button = ({
  children,
  variant = 'create-primary',
  fullWidth,
  className,
  ...props
}: Props) => {
  const buttonClassName = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)

  return (
    <button {...props} className={buttonClassName}>
      {children}
    </button>
  )
}
