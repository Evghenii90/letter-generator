import { useCopyToClipboard } from '../../lib/hooks/useCopyMessage'
import { CopyButton } from '../CopyButton/CopyButton'
import { DeleteMessageButton } from './DeleteMessageButton/DeleteMessageButton'
import s from './ItemsMessage.module.css'
import { type ItemsProps } from './type'

export const ItemsMessage = ({ item }: ItemsProps) => {
  const { isCopied, copy } = useCopyToClipboard()

  return (
    <li key={item.id} className={s.letter}>
      <div className={s.textWrapper}>
        <p className={s.text}>{item.text}</p>
        <div className={s.overlay}></div>
      </div>
      <div className={s.wrapperButton}>
        <DeleteMessageButton id={item.id} />
        <CopyButton isCopied={isCopied} onClick={() => copy(item.text)} />
      </div>
    </li>
  )
}
