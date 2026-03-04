import { CopyButton } from '../../../shared/ui/CopyButton/CopyButton'
import LoadCircle from './../../../shared/assets/icons/loadCircle.svg?react'
import s from './GeneratedPreview.module.css'

type GeneratedPreviewProps = {
  text: string
  isCopied: boolean
  onCopy: () => void
  loading: boolean
}

export const GeneratedPreview = ({ loading, isCopied, onCopy, text }: GeneratedPreviewProps) => {
  return (
    <div className={s.chatAi}>
      {!loading && !text && (
        <p className={s.text}>Your personalized job application will appear here...</p>
      )}
      {loading ? (
        <div className={s.loader}>
          <LoadCircle />
        </div>
      ) : (
        <>
          <p className={s.text}>{text}</p>
          <CopyButton isCopied={isCopied} onClick={onCopy} />
        </>
      )}
    </div>
  )
}
