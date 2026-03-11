import { clsx } from 'clsx'

import styles from './TextareaCounter.module.scss'

type TextareaCounterProps = {
  value: string
  maxLength: number
  error?: string
}

export const TextareaCounter = ({ maxLength, error, value }: TextareaCounterProps) => {
  const isError = Boolean(error) || value.length > maxLength

  return (
    <div className={clsx(styles.counter, isError && styles.counterError)}>
      {value.length}/{maxLength} {error && <div className={styles.textError}>{error}</div>}
    </div>
  )
}
