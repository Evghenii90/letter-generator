import { type ComponentPropsWithRef, useId } from 'react'
import { clsx } from 'clsx'
import styles from './Input.module.scss'

type InputProps = {
  label?: string
  error?: string
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithRef<'input'>

export const Input = ({ label, error, fullWidth, className, ...rest }: InputProps) => {
  const textareaId = useId()

  return (
    <div className={clsx(styles.wrapper, fullWidth && styles.fullWidth)}>
      {label && (
        <label className={styles.label} htmlFor={textareaId}>
          {label}
        </label>
      )}
      <input
        id={textareaId}
        className={clsx(styles.input, error && styles.inputError, className)}
        {...rest}
      />
    </div>
  )
}

Input.displayName = 'Input'
