import { CopyButton } from '@/entities/CopyButton/CopyButton.tsx'
import {
  selectGeneratedText,
  selectLoading,
} from '@/features/generators/ui/GeneratorForm/model/store/selectors.ts'
import { useStore } from '@/features/generators/ui/GeneratorForm/model/store/useStore.ts'
import LoadCircle from '@/shared/assets/icons/loadCircle.svg?react'
import { useCopyToClipboard } from '@/shared/hooks/useCopyMessage.ts'

import styles from './GeneratedPreview.module.scss'

export const GeneratedPreview = () => {
  const generatedText = useStore(selectGeneratedText)
  const loading = useStore(selectLoading)
  const { isCopied, copy } = useCopyToClipboard()

  const handleCopy = () => {
    copy(generatedText)
  }

  return (
    <div className={styles.chatAi}>
      {!loading && !generatedText && (
        <p className={styles.text}>Your personalized job application will appear here...</p>
      )}
      {loading ? (
        <div className={styles.loader}>
          <LoadCircle />
        </div>
      ) : (
        <>
          <p className={styles.text}>{generatedText}</p>
          <CopyButton isCopied={isCopied} onClick={handleCopy} />
        </>
      )}
    </div>
  )
}
