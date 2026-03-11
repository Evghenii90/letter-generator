import {
  selectMessages,
  selectMessagesCount,
} from '@/features/generators/ui/GeneratorForm/model/store/selectors.ts'
import { useStore } from '@/features/generators/ui/GeneratorForm/model/store/useStore.ts'
import Success from '@/shared/assets/icons/succes.svg?react'
import { MAX_COUNT_MESSAGES } from '@/shared/constants'
import styles from './CountMessages.module.scss'

export type CountMessagesProps = { type: 'header' | 'banner' }

export const CountMessages = ({ type }: CountMessagesProps) => {
  const messages = useStore(selectMessages)
  const messagesCount = useStore(selectMessagesCount)

  const value = MAX_COUNT_MESSAGES - messagesCount

  return (
    <>
      {messages && messagesCount >= MAX_COUNT_MESSAGES && (
        <>
          <span className={styles.status}>
            {messagesCount}/5 <span className={styles.textStatus}>applications generated</span>
          </span>
          <div className={styles.backgroundSuccess}>
            <Success className={styles.successIcon} />
          </div>
        </>
      )}

      {messages && messagesCount >= 0 && messagesCount < MAX_COUNT_MESSAGES && (
        <>
          {type === 'header' && (
            <span className={styles.status}>
              {messagesCount}/5 <span className={styles.textStatus}>applications generated</span>
            </span>
          )}
          <div className={type === 'header' ? styles.dotsHeader : styles.dotsBanner}>
            {messagesCount > 0 &&
              messages.map((item) => (
                <span
                  key={item.id}
                  className={type === 'header' ? styles.dotHeaderFill : styles.dotBannerFill}
                ></span>
              ))}

            {value > 0 &&
              Array.from({ length: value }).map((_, index) => (
                <span
                  key={index}
                  className={type === 'header' ? styles.dotHeader : styles.dotBanner}
                ></span>
              ))}
          </div>
          {type === 'banner' && <span className={styles.status}>{messagesCount} out of 5</span>}
        </>
      )}
    </>
  )
}
