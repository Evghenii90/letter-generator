import Copy from './../../assets/icons/copy.svg?react'
import s from './CopyButton.module.css'

type Props = {
  isCopied: boolean
  onClick: () => void
}
export const CopyButton = ({ isCopied, onClick }: Props) => {
  return (
    <button className={s.copy} onClick={onClick}>
      {isCopied ? 'Copied!' : 'Copy to clipboard'}
      <Copy />
    </button>
  )
}
