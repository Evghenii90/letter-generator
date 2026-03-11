import { useNavigate } from 'react-router-dom'
import { CountMessages } from '@/entities/CountMessage'
import Plus from '@/shared/assets/icons/plus.svg?react'
import { ROUTES_PATHS } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import styles from './Banner.module.scss'

type BannerProps = {
  onCreateNew?: () => void
}

export const Banner = ({ onCreateNew }: BannerProps) => {
  const navigate = useNavigate()

  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew()
      return
    }
    navigate(ROUTES_PATHS.GENERATION, { state: { createNew: true } })
  }

  return (
    <div className={styles.banner}>
      <div className={styles.block}>
        <h2 className={styles.title}>Hit your goal</h2>
        <p className={styles.subtitle}>
          Generate and send out couple more job applications today to get hired faster
        </p>
        <Button
          className={styles.buttonBanner}
          type="button"
          variant="primary"
          onClick={handleCreateNew}
        >
          <Plus /> <span className={styles.buttonText}>Create New</span>
        </Button>
        <div className={styles.letterCount}>
          <CountMessages type="banner" />
        </div>
      </div>
    </div>
  )
}
