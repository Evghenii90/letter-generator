import { useNavigate } from 'react-router-dom'
import { CountMessages } from '@/entities/CountMessage'
import AltShift from '@/shared/assets/icons/altshift.svg?react'
import Home from '@/shared/assets/icons/home.svg?react'
import Logo from '@/shared/assets/icons/logo.svg?react'
import { ROUTES_PATHS } from '@/shared/routes'
import { Container } from '@/shared/ui/Container'
import styles from './Header.module.scss'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerWrapper}>
          <div className={styles.left}>
            <Logo className={styles.logo} />
            <AltShift className={styles.title} />
          </div>
          <div className={styles.right}>
            <CountMessages type="header" />
            <button
              aria-label="Home"
              className={styles.iconButton}
              onClick={() => navigate(ROUTES_PATHS.MAIN)}
            >
              <Home aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
