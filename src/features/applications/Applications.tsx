import { useNavigate } from 'react-router-dom'

import Plus from '../../shared/assets/icons/plus.svg?react'
import { Banner } from '../../shared/ui/Banner/Banner'
import { Button } from '../../shared/ui/Button/Button'
import { Container } from '../../shared/ui/Container/Container'
import { ItemsMessage } from '../../shared/ui/Items/ItemsMessage'
import { useStore } from '../../store/useStore'
import s from './Applications.module.css'

const countMessages = 5

export const Applications = () => {
  const { state } = useStore()
  const navigate = useNavigate()
  return (
    <Container>
      <div className={s.wrapper}>
        <section className={s.section}>
          <h1 className={s.applications}>Applications</h1>
          <Button
            className={s.sectionButton}
            type={'button'}
            variant={'create-secondary'}
            onClick={() => navigate('/generations')}
          >
            <Plus /> <span className={s.buttonText}>Create New</span>
          </Button>
        </section>
        {state.length > 0 && (
          <ul className={s.letterWrapper}>
            {state.map((item) => (
              <ItemsMessage key={item.id} item={item} />
            ))}
          </ul>
        )}
        {state.length < countMessages && <Banner />}
      </div>
    </Container>
  )
}
