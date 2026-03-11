import { selectDeleteMessage } from '@/features/generators/ui/GeneratorForm/model/store/selectors.ts'
import { useStore } from '@/features/generators/ui/GeneratorForm/model/store/useStore.ts'
import Delete from '@/shared/assets/icons/delete.svg?react'
import styles from './DeleteMessageButton.module.scss'

type DeleteMessageButtonProps = {
  id: string
}

export const DeleteMessageButton = ({ id }: DeleteMessageButtonProps) => {
  const deleteMessage = useStore(selectDeleteMessage)

  const handleDelete = () => {
    deleteMessage(id)
  }

  return (
    <button aria-label="Delete" className={styles.btn} onClick={handleDelete}>
      <Delete aria-hidden="true" /> <span className={styles.textBtn}>Delete</span>
    </button>
  )
}
