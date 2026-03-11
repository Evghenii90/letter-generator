import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemsMessage } from '@/entities/Items'
import { selectMessages, useStore } from '@/features/generators/ui/GeneratorForm/model/store'
import Plus from '@/shared/assets/icons/plus.svg?react'
import { MAX_COUNT_MESSAGES } from '@/shared/constants'
import { ROUTES_PATHS } from '@/shared/routes'
import { Button } from '@/shared/ui/Button/Button.tsx'
import { Container } from '@/shared/ui/Container/Container.tsx'
import { Banner } from '@/widgets/Banner'
import styles from './Applications.module.scss'

export const Applications = () => {
  const messages = useStore(selectMessages)
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <h1 className={styles.applications}>Applications</h1>
          <Button
            className={styles.sectionButton}
            aria-label="Create New"
            type="button"
            variant="secondary"
            onClick={() => navigate(ROUTES_PATHS.GENERATION, { state: { createNew: true } })}
          >
            <Plus aria-hidden="true" /> <span className={styles.buttonText}>Create New</span>
          </Button>
        </div>
        {messages.length > 0 && (
          <ul className={styles.letterWrapper}>
            {messages.map((item) => (
              <ItemsMessage
                key={item.id}
                item={item}
                isExpanded={expandedId === item.id}
                onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
              />
            ))}
          </ul>
        )}
        {messages.length < MAX_COUNT_MESSAGES && <Banner />}
      </div>
    </Container>
  )
}
