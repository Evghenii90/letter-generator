import Copy from '@/shared/assets/icons/copy.svg?react'
import styles from './CopyButton.module.scss'

type Props = {
  isCopied: boolean
  onClick: () => void
}

export const CopyButton = ({ isCopied, onClick }: Props) => {
  return (
    <button aria-label="Copy to clipboard" className={styles.copyBtn} onClick={onClick}>
      {isCopied ? 'Copied!' : 'Copy to clipboard'}
      <Copy aria-hidden="true" />
    </button>
  )
}
