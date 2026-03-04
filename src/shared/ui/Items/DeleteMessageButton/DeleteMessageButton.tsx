import { useStore } from '../../../../store/useStore'
import Delete from './../../../assets/icons/delete.svg?react'
import s from './DeleteMessageButton.module.css'

type Props = {
  id: string
}

export const DeleteMessageButton = ({ id }: Props) => {
  const { dispatch } = useStore()

  const handleDelete = () => {
    dispatch({ type: 'DELETE_MESSAGE', payload: id })
  }

  return (
    <button className={s.btn} onClick={handleDelete}>
      <Delete /> Delete
    </button>
  )
}
