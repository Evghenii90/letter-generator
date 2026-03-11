import { clsx } from 'clsx'
import { CopyButton } from '@/entities/CopyButton'
import { DeleteMessageButton } from '@/entities/DeleteMessageButton'
import type { MessageItem } from '@/features/generators/ui/GeneratorForm/model/store/types.ts'
import { useCopyToClipboard } from '@/shared/hooks/useCopyMessage.ts'
import styles from './ItemsMessage.module.scss'

export type ItemsProps = {
  item: MessageItem
  isExpanded: boolean
  onToggle: () => void
}

export const ItemsMessage = ({ item, isExpanded, onToggle }: ItemsProps) => {
  const { isCopied, copy } = useCopyToClipboard()

  return (
    <li
      key={item.id}
      className={clsx(styles.letter, isExpanded && styles.letterExpanded)}
      onClick={onToggle}
    >
      <div className={clsx(styles.textWrapper, isExpanded && styles.textWrapperExpanded)}>
        <p className={clsx(styles.text, isExpanded && styles.textExpanded)}>{item.text}</p>
      </div>
      <div className={styles.wrapperButton} onClick={(event) => event.stopPropagation()}>
        <DeleteMessageButton id={item.id} />
        <CopyButton isCopied={isCopied} onClick={() => copy(item.text)} />
      </div>
    </li>
  )
}
