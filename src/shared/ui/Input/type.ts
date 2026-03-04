import * as React from 'react'

export type InputSize = 'small' | 'medium' | 'large'
export type InputProps = {
  placeholder?: string
  id: string
  label?: string
  error?: string
  isDisabled?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  name?: string
  className?: string
  size?: InputSize
  fullWidth?: boolean
  type?: 'text' | 'email' | 'password' | 'search'
}
