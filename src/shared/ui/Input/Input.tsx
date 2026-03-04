import { forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './Input.module.css'
import type { InputProps } from './type'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      id,
      label,
      error,
      isDisabled,
      value,
      onChange,
      onBlur,
      name,
      className,
      type = 'text',
      size = 'small',
      fullWidth = false,
    },
    ref,
  ) => {
    const sizeClassMap = {
      small: s.sizeSmall,
      medium: s.sizeMedium,
      large: s.sizeLarge,
    } as const

    const sizeClass = sizeClassMap[size]

    const inputClassName = clsx(s.input, sizeClass, error && s.inputError, className)
    const labelClassName = clsx(s.label, isDisabled && s.labelDisabled)

    return (
      <div className={clsx(s.inputWrapper, fullWidth && s.fullWidth)}>
        {label && (
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={inputClassName}
          disabled={isDisabled}
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />
      </div>
    )
  },
)

Input.displayName = 'Input'
