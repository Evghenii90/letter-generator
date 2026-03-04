import type { ChangeEvent } from 'react'

import { clsx } from 'clsx'

import s from './Textarea.module.css'
import type { TextareaProps } from './type'

export const Textarea = ({
  value,
  onChange,
  maxLength = 1200,
  label = 'Additional details',
  placeholder = 'Describe why you are a great fit or paste your bio',
}: TextareaProps) => {
  const isError = value.length > maxLength

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.currentTarget.value)
  }

  return (
    <div className={s.wrapper}>
      <label className={s.label}>{label}</label>
      <textarea
        className={clsx(s.textarea, isError && s.error)}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div className={clsx(s.counter, isError && s.counterError)}>
        {value.length}/{maxLength}
      </div>
    </div>
  )
}
Textarea.displayName = 'Textarea'
