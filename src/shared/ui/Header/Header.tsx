import { useNavigate } from 'react-router-dom'

import { Container } from '../Container/Container'
import { CountMessages } from '../CountMessage/CountMessages'
import AltShift from './../../assets/icons/altshift.svg?react'
import Home from './../../assets/icons/home.svg?react'
import Logo from './../../assets/icons/logo.svg?react'
import s from './Header.module.css'

export const Header = () => {
  const navigate = useNavigate()
  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerWrapper}>
          <div className={s.left}>
            <Logo className={s.logo} />
            <AltShift className={s.title} />
            <button className={s.iconButtonAlt} onClick={() => navigate('/')}>
              <Home />
            </button>
          </div>
          <div className={s.right}>
            <CountMessages type={'header'} />
            <button className={s.iconButton} onClick={() => navigate('/')}>
              <Home />
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
