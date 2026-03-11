import { type ComponentPropsWithRef, type KeyboardEvent, useId } from 'react'

import { clsx } from 'clsx'

import { MAX_LENGTH_TEXT_AREA } from '@/shared/constants'

import styles from './Textarea.module.scss'

export type TextareaProps = {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  label?: string
} & ComponentPropsWithRef<'textarea'>

export const Textarea = ({
  value,
  onChange,
  onBlur,
  error,
  label,
  ...otherProperties
}: TextareaProps) => {
  const textareaId = useId()

  const isError = Boolean(error) || value.length > MAX_LENGTH_TEXT_AREA

  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={textareaId}>
        {label}
      </label>
      <textarea
        id={textareaId}
        className={clsx(styles.textarea, isError && styles.error)}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onBlur={onBlur}
        onKeyDown={handleEnter}
        {...otherProperties}
      />
    </div>
  )
}

Textarea.displayName = 'Textarea'
