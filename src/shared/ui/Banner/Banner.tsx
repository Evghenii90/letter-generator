import { useNavigate } from 'react-router-dom'

import Plus from '../../assets/icons/plus.svg?react'
import { Button } from '../Button/Button'
import { CountMessages } from '../CountMessage/CountMessages'
import s from './Banner.module.css'

export const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className={s.banner}>
      <div className={s.block}>
        <h2 className={s.title}>Hit your goal</h2>
        <p className={s.subtitle}>
          Generate and send out couple more job applications today to get hired faster{' '}
        </p>
        <Button
          className={s.buttonBanner}
          type={'button'}
          variant={'create-primary'}
          onClick={() => navigate('/generations')}
        >
          <Plus /> <span className={s.buttonText}>Create New</span>
        </Button>
        <div className={s.letterCount}>
          <CountMessages type={'banner'} />
        </div>
      </div>
    </div>
  )
}
